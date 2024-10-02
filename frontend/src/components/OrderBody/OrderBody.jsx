import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import api from "../../services/api";
import ViewIncomeModal from "../View Income/ViewIncomeModal";
import IncomeChart from "../Income Chart/IncomeChart";
import PDFDownloadModal from "../PDFDownloadModal/PDFDownloadModal";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";

const OrderBody = ({ addIncomeModal }) => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [viewIncomeModal, setViewIncomeModal] = useState(false);
  const [singleEntry, setSingleEntry] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const entriesPerPage = 5;

  // Filtering based on search query
  const filteredEntries = () => {
    const today = new Date();
    let filteredData = incomeHistoryData;

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter(
        (entry) =>
          entry.customerName.toLowerCase().includes(lowerCaseQuery) ||
          entry.contactNumber.toString().includes(lowerCaseQuery)
      );
    }

    return filteredData;
  };

  const currentEntries = filteredEntries();
  const totalEntries = currentEntries.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const paginatedEntries = currentEntries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleViewClick = (entry) => {
    setSingleEntry(entry);
    setViewIncomeModal(true);
  };

  // PDF Generation logic
  const generatePDF = (
    startDate,
    endDate,
    selectedOption,
    selectedMonth,
    selectedYear
  ) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Adjust endDate to include the entire day
    endDate.setHours(23, 59, 59, 999);

    // Dynamic title based on selected options
    let title;
    if (selectedOption === "monthly") {
      title = `Income History for ${new Date(
        selectedYear,
        selectedMonth - 1
      ).toLocaleString("default", { month: "long" })} ${selectedYear}`;
    } else if (selectedOption === "yearly") {
      title = `Income History for ${selectedYear}`;
    } else {
      title = `Income History from ${startDate.toLocaleDateString("en-IN")} to ${endDate.toLocaleDateString("en-IN")}`;
    }

    const headers = [
      "Date",
      "Name",
      "Vehicle Number",
      "Phone Number",
      "UPI",
      "Cash",
    ];

    const filteredData = incomeHistoryData.filter((entry) => {
      const entryDate = new Date(entry.workDate);
      return entryDate >= startDate && entryDate <= endDate;
    });

    const columnWidths = [30, 35, 40, 40, 30, 30];

    // Add title
    if (typeof title === "string") {
      doc.text(title, 75, 10);
    }

    headers.forEach((header, index) => {
      const xPosition = 10 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
      if (typeof header === "string") {
        doc.text(header, xPosition, 25);
      }
    });

    // Add a separator line
    doc.line(10, 30, 200, 30);

    let totalUPI = 0;
    let totalCash = 0;

    filteredData.forEach((entry, index) => {
      const entryDate = new Date(entry.workDate).toLocaleDateString("en-GB");
      const upiAmount = (entry.paymentMethod === "UPI" || entry.paymentMethod === 'Repaid-UPI') ? entry.totalServiceCost.toFixed(2) : "";
      const cashAmount = (entry.paymentMethod === "Cash" || entry.paymentMethod === 'Repaid-Cash') ? entry.totalServiceCost.toFixed(2) : "";

      const row = [
        entryDate,
        entry.customerName,
        entry.vehicleNumber,
        entry.contactNumber ? entry.contactNumber.toString() : "",
        upiAmount,
        cashAmount,
      ];

      if (entry.paymentMethod === "UPI") {
        totalUPI += entry.totalServiceCost || 0;
      } else if (entry.paymentMethod === "Cash") {
        totalCash += entry.totalServiceCost || 0;
      }

      row.forEach((cell, cellIndex) => {
        const xPosition = 10 + columnWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0);
        if (typeof cell === "string") {
          doc.text(cell, xPosition, 35 + index * 10);
        }
      });
    });

    const totalRowYPosition = 35 + filteredData.length * 10;
    doc.line(10, totalRowYPosition, 200, totalRowYPosition);
    const totalIncome = totalUPI + totalCash;

    doc.text(`Total Income (UPI): ${totalUPI.toFixed(2)}`, 130, totalRowYPosition + 10);
    doc.text(`Total Income (Cash): ${totalCash.toFixed(2)}`, 130, totalRowYPosition + 20);
    doc.text(`Total Income (Overall): ${totalIncome.toFixed(2)}`, 130, totalRowYPosition + 30);

    const fileName = (() => {
      if (selectedOption === "custom") {
        return `income_history_${startDate.toLocaleDateString("en-GB")}_to_${endDate.toLocaleDateString("en-GB")}.pdf`;
      } else if (selectedOption === "yearly") {
        return `income_history_${selectedYear}.pdf`;
      } else {
        return `income_history_${new Date(
          selectedYear,
          selectedMonth - 1
        ).toLocaleString("default", { month: "long" })}_${selectedYear}.pdf`;
      }
    })();

    doc.save(fileName);
  };

  return (
    <div className="min-h-screen bg-[#23346c] p-4 lg:p-10 text-gray-100 relative">
      <main className="mt-8 p-2">
        <IncomeChart
          incomeHistoryData={incomeHistoryData}
          isLoading={isLoading}
          setIsModalOpen={setIsModalOpen}
        />

        {/* Income History Table */}
        <div className="bg-[#00144c] p-6 lg:p-10 rounded-lg">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-[#ffeda5]">Order History</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or phone"
              className="mt-4 lg:mt-0 bg-gray-700 text-gray-100 px-4 py-2 rounded-lg w-full lg:w-auto"
            />
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 text-sm lg:text-base">
                <th className="pb-2">Date</th>
                <th className="pb-2">Order ID</th>
                <th className="pb-2">Total Amount</th>
                <th className="pb-2">Action</th>
                <th className="pb-2">Print</th>
              </tr>
            </thead>
            <tbody>
              {/* Add your dynamic entries here */}
              <tr>
                <td>20-05-2024</td>
                <td>#8987657</td>
                <td>$490</td>
                <td>View</td>
                <td>Print</td>
              </tr>
              <tr>
                <td>28-05-2024</td>
                <td>#8677657</td>
                <td>$700</td>
                <td>View</td>
                <td>Print</td>
              </tr>
              {/* Add more rows */}
            </tbody>
          </table>

          {/* Pagination */}
          {paginatedEntries.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg"
              >
                <FaChevronLeft />
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {viewIncomeModal && (
        <ViewIncomeModal
          isOpen={viewIncomeModal}
          onClose={() => setViewIncomeModal(false)}
          entry={singleEntry}
        />
      )}
      {isModalOpen && (
        <PDFDownloadModal
          generatePDF={generatePDF}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default OrderBody;
