import React, { useEffect, useState } from "react";
import api from "../../services/api";
import ExpenseModal from "../View Expense/ExpenseModal";
import ExpenseChart from "../Expense Chart/ExpenseChart";
import PDFDownloadModal from "../PDFDownloadModal/PDFDownloadModal";
import jsPDF from "jspdf";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";

const Expense = ({ addExpenseModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expenseHistoryData, setExpenseHistoryData] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const entriesPerPage = 5;

  useEffect(() => {
    const fetchExpenseHistory = async () => {
      try {
        setLoading(true); // Start loading
        const response = await api.showExpense();
        setExpenseHistoryData([]);
      } catch (error) {
        console.error("Error fetching expense history data", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (addExpenseModal == false) {
      fetchExpenseHistory();
    }
  }, [addExpenseModal]);

  const generatePDF = (startDate, endDate) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    endDate.setHours(23, 59, 59, 999);
    const headers = [
      "Date",
      "Payee Name",
      "Expense Type",
      "Phone Number",
      "Amount",
    ];

    const filteredData = expenseHistoryData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });

    doc.text("Expense History", 100, 10);
    headers.forEach((header, index) => doc.text(header, 14 + index * 40, 25));

    // Add a separator line
    doc.line(10, 28, 200, 28);

    let totalExpense = 0;

    filteredData.forEach((entry, index) => {
      const row = [
        new Date(entry.date).toLocaleDateString("en-GB"),
        entry.payeeName,
        entry.expenseType,
        entry.contactNumber ? entry.contactNumber.toString() : "",
        `${entry.totalExpense}`,
      ];

      totalExpense += entry.totalExpense;
      row.forEach((cell, cellIndex) => {
        doc.text(cell.toString(), 14 + cellIndex * 40, 35 + index * 10);
      });
    });
    // Add total calculation at the end
    const totalRowYPosition = 35 + filteredData.length * 10; // Updated position calculation
    // Add a separator line
    doc.line(10, totalRowYPosition, 200, totalRowYPosition); // Adjusted position for the line

    // Position for total income
    doc.text(`Total Expense:  ${totalExpense}`, 150, totalRowYPosition + 10);

    doc.save("expense_history.pdf");
  };

  const handleViewExpense = (entry) => {
    setSelectedExpense(entry);
    setIsModalOpen(true);
  };

  // Filter entries based on search query
  const filteredEntries = expenseHistoryData
    .filter(
      (entry) =>
        entry.payeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (entry.contactNumber &&
          entry.contactNumber.toString().includes(searchQuery))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort latest first

  // Calculate entries to display
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const pageCount = Math.ceil(filteredEntries.length / entriesPerPage);

  return (
    <div className="min-h-screen bg-[#23346c] p-10 text-gray-100 relative">
      <main className="mt-8 p-2">
        {/* Total Expense Section */}

        <ExpenseChart
          expenseHistoryData={expenseHistoryData}
          isLoading={loading}
          setPdfModalOpen={setPdfModalOpen}
        />

        <div className="bg-[#00144c] p-10 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#ffeda5]">
              Expense History
            </h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or phone"
              className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg"
            />
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="pb-2">Date</th>
                <th className="pb-2">Payee Name</th>
                <th className="pb-2">Expense Type</th>
                <th className="pb-2">Payment Type</th>
                <th className="pb-2">Phone Number</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {loading ? ( // Show loading indicator while fetching data
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
                    <td className="py-4">{entry.payeeName}</td>
                    <td className="py-4">{entry.expenseType}</td>
                    <td className="py-4">{entry.paymentMethod}</td>
                    <td className="py-4">{entry.contactNumber}</td>
                    <td className="py-4">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(entry.totalExpense)}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleViewExpense(entry)}
                        className="bg-cyan-400 text-gray-900 px-3 py-1 rounded"
                      >
                        View
                      </button>
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

        {/* Modal for Viewing Expense */}
        <ExpenseModal
          isOpen={isModalOpen}
          expense={selectedExpense}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
      {pdfModalOpen && 
      <PDFDownloadModal
      setIsModalOpen={setPdfModalOpen}
      customStartDate={customStartDate}
      customEndDate={customEndDate}
      generatePDF={generatePDF}
      />
    }
    </div>
  );
};

export default Expense;
