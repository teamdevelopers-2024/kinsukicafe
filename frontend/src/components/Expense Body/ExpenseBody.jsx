import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ExpenseModal from "../View Expense/ExpenseModal";
import ExpenseChart from "../Expense Chart/ExpenseChart";
import PDFDownloadModal from "../PDFDownloadModal/PDFDownloadModal";
import jsPDF from "jspdf";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";
import AddExpense from "../Add Expense/AddExpense";

const Expense = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expenseHistoryData, setExpenseHistoryData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const entriesPerPage = 5;

  useEffect(() => {
    const fetchExpenseHistory = async () => {
      try {
        setLoading(true); // Start loading
        const response = await api.showExpense();
        if (!response.error) {
          setExpenseHistoryData(response.data);
        }
      } catch (error) {
        console.error("Error fetching expense history data", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (addExpenseModal === false) {
      fetchExpenseHistory();
    }
  }, [addExpenseModal]);

  const generateDownPDF = (
    startDate,
    endDate,
    selectedOption, // "monthly", "yearly", or custom
    selectedMonth,
    selectedYear
  ) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let currentY = 35;

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    let filteredData = [];

    if (selectedOption === "monthly") {
      filteredData = expenseHistoryData.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() + 1 === selectedMonth &&
          expenseDate.getFullYear() === selectedYear
        );
      });
    } else if (selectedOption === "yearly") {
      filteredData = expenseHistoryData.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === selectedYear;
      });
    } else if (startDate && endDate) {
      filteredData = expenseHistoryData.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= start && expenseDate <= end;
      });
    } else {
      filteredData = expenseHistoryData;
    }

    let title;
    if (selectedOption === "monthly") {
      title = `Expense History for ${new Date(
        selectedYear,
        selectedMonth - 1
      ).toLocaleString("default", { month: "long" })} ${selectedYear}`;
    } else if (selectedOption === "yearly") {
      title = `Expense History for ${selectedYear}`;
    } else if (startDate && endDate) {
      title = `Expense History from ${start.toLocaleDateString(
        "en-IN"
      )} to ${end.toLocaleDateString("en-IN")}`;
    } else {
      title = `Full Expense History`;
    }

    if (typeof title === "string") {
      doc.text(title, 75, 10);
    }

    const headers = ["Date", "Expense Detail", "Amount"];
    const columnCount = headers.length;
    const columnWidth = (doc.internal.pageSize.width - 20) / columnCount; // 10 margin on each side

    // Add headers to PDF with centered alignment
    headers.forEach((header, index) => {
      const xPosition = 10 + index * columnWidth;
      const textWidth = doc.getTextWidth(header);
      doc.text(header, xPosition + (columnWidth - textWidth) / 2, 25);
    });

    doc.line(10, 30, doc.internal.pageSize.width - 10, 30);

    let totalExpense = 0;

    filteredData.forEach((expense) => {
      const expenseDate = new Date(expense.date).toLocaleDateString("en-IN");
      const expenseDetail = expense.expenseDetail || "N/A"; // Default to 'N/A' if undefined
      const totalAmount = parseFloat(expense.totalExpense) || 0; // Ensure it's a number

      totalExpense += totalAmount;

      // Add each row with centered alignment
      const rowData = [expenseDate, expenseDetail, totalAmount.toFixed(2)];
      rowData.forEach((data, index) => {
        const xPosition = 10 + index * columnWidth;
        const textWidth = doc.getTextWidth(data);
        doc.text(
          data.toString(),
          xPosition + (columnWidth - textWidth) / 2,
          currentY
        );
      });

      currentY += 10;

      // Check if content exceeds the page height
      if (currentY > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
      }
    });

    if (currentY > pageHeight - margin) {
      doc.addPage();
      currentY = margin;
    }

    // Draw a line above the total expense
    const lineYPosition = currentY + 10; // Adjust this as needed
    doc.line(
      10,
      lineYPosition,
      doc.internal.pageSize.width - 10,
      lineYPosition
    );

    // Centering total expense at the bottom
    const totalText = `Total Expense: ${totalExpense.toFixed(2)}`;
    const totalTextWidth = doc.getTextWidth(totalText);
    doc.text(
      totalText,
      140,
      currentY + 20
    );

    // Save or download the PDF
    doc.save("Expense_History.pdf");
  };

  // Filter entries based on search query
  const filteredEntries = expenseHistoryData
    .filter((entry) => {
      // Convert search query to lowercase
      const lowerCaseQuery = searchQuery.toLowerCase();

      return (
        new Date(entry.date)
          .toLocaleDateString("en-GB")
          .includes(lowerCaseQuery) ||
        entry.expenseType.toLowerCase().includes(lowerCaseQuery) ||
        entry.totalExpense.toString().includes(lowerCaseQuery)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (latest first)

  // Calculate entries to display
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const pageCount = Math.ceil(filteredEntries.length / entriesPerPage);

  return (
    <div className="min-h-screen bg-[#23346c] p-4 lg:p-10 text-gray-100 relative">
      <main className="mt-8 p-2">
        {/* Total Expense Section */}
        <ExpenseChart
          expenseHistoryData={expenseHistoryData}
          isLoading={loading}
          setAddExpenseModal={setAddExpenseModal}
          setPdfModalOpen={setPdfModalOpen}
        />

        <div className="bg-[#00144c] p-4 lg:p-10 rounded-xl">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
            <h3 className="text-2xl font-bold text-[#ffeda5]">
              Expense History
            </h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="pb-2">Date</th>
                <th className="pb-2">ExpenseDetail</th>
                <th className="pb-2">Total Expense</th>
              </tr>
            </thead>
            <tbody>
              {/* Modify loading and data display */}
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    <SpinnerOnly />
                  </td>
                </tr>
              ) : filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              ) : (
                currentEntries.map((entry, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="py-4">
                      {new Date(entry.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-4">{entry.expenseDetail}</td>
                    <td className="py-4">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(entry.totalExpense)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {filteredEntries.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1} // Disable if on the first page
                className={`bg-cyan-400 px-4 py-2 rounded-lg ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                &#8592;
              </button>
              <span className="text-gray-500">
                Page {currentPage} of {pageCount}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, pageCount))
                }
                disabled={currentPage === pageCount} // Disable if on the last page
                className={`bg-cyan-400 px-4 py-2 rounded-lg ${
                  currentPage === pageCount
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                &#8594;
              </button>
            </div>
          )}
        </div>

        {addExpenseModal && (
          <AddExpense setAddExpenseModal={setAddExpenseModal} />
        )}

        {/* Modal for Viewing Expense */}
        <ExpenseModal
          isOpen={isModalOpen}
          expense={selectedExpense}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
      {pdfModalOpen && (
        <PDFDownloadModal
          setIsModalOpen={setPdfModalOpen}
          customStartDate={customStartDate}
          customEndDate={customEndDate}
          generatePDF={generateDownPDF}
        />
      )}
    </div>
  );
};

export default Expense;
