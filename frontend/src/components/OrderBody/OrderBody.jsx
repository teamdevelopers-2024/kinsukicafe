import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import api from "../../services/api";
import ViewIncomeModal from "../View Income/ViewIncomeModal";
import IncomeChart from "../Income Chart/IncomeChart";
import PDFDownloadModal from "../PDFDownloadModal/PDFDownloadModal";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";
import AddOrder from "../Add Order/AddOrder";

const OrderBody = ({ addIncomeModal }) => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  const [viewIncomeModal, setViewIncomeModal] = useState(false);
  const [singleEntry, setSingleEntry] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [addOrderModal , setAddOrderModal] = useState(false)
  const entriesPerPage = 5;


  useEffect(() => {
    const fetchIncomeHistory = async () => {
      setIsLoading(true); // Set loading to true
      try {
        const response = await api.showIncome();
        const sortedData = response.data.sort(
          (a, b) => new Date(b.workDate) - new Date(a.workDate)
        );
        setIncomeHistoryData([]);
        console.log(sortedData); // Log sorted data
      } catch (error) {
        console.error("Error fetching income history data", error);
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };
    if (!addOrderModal) {
      fetchIncomeHistory();
    }
  }, [addOrderModal]);
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

  // const handleViewClick = (entry) => {
  //   setSingleEntry(entry);
  //   setViewIncomeModal(true);
  // };

  // PDF Generation logic
  // const generatePDF = (
  //   startDate,
  //   endDate,
  //   selectedOption,
  //   selectedMonth,
  //   selectedYear
  // ) => {
  //   const doc = new jsPDF();
  //   doc.setFontSize(12);

  //   // Adjust endDate to include the entire day
  //   endDate.setHours(23, 59, 59, 999);

  //   // Dynamic title based on selected options
  //   let title;
  //   if (selectedOption === "monthly") {
  //     title = `Income History for ${new Date(
  //       selectedYear,
  //       selectedMonth - 1
  //     ).toLocaleString("default", { month: "long" })} ${selectedYear}`;
  //   } else if (selectedOption === "yearly") {
  //     title = `Income History for ${selectedYear}`;
  //   } else {
  //     title = `Income History from ${startDate.toLocaleDateString(
  //       "en-IN"
  //     )} to ${endDate.toLocaleDateString("en-IN")}`;
  //   }

  //   const headers = [
  //     "Date",
  //     "Name",
  //     "Vehicle Number",
  //     "Phone Number",
  //     "UPI",
  //     "Cash",
  //   ];

  //   const filteredData = incomeHistoryData.filter((entry) => {
  //     const entryDate = new Date(entry.workDate);
  //     return entryDate >= startDate && entryDate <= endDate;
  //   });

  //   const columnWidths = [30, 35, 40, 40, 30, 30];

  //   // Add title
  //   if (typeof title === "string") {
  //     doc.text(title, 75, 10);
  //   }

  //   headers.forEach((header, index) => {
  //     const xPosition =
  //       10 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
  //     if (typeof header === "string") {
  //       doc.text(header, xPosition, 25);
  //     }
  //   });

  //   // Add a separator line
  //   doc.line(10, 30, 200, 30);

  //   let totalUPI = 0;
  //   let totalCash = 0;

  //   filteredData.forEach((entry, index) => {
  //     const entryDate = new Date(entry.workDate).toLocaleDateString("en-GB");
  //     const upiAmount =
  //       entry.paymentMethod === "UPI" || entry.paymentMethod === "Repaid-UPI"
  //         ? entry.totalServiceCost.toFixed(2)
  //         : "";
  //     const cashAmount =
  //       entry.paymentMethod === "Cash" || entry.paymentMethod === "Repaid-Cash"
  //         ? entry.totalServiceCost.toFixed(2)
  //         : "";

  //     const row = [
  //       entryDate,
  //       entry.customerName,
  //       entry.vehicleNumber,
  //       entry.contactNumber ? entry.contactNumber.toString() : "",
  //       upiAmount,
  //       cashAmount,
  //     ];

      // Accumulate totals based on payment method
      // if (entry.paymentMethod === "UPI") {
      //   totalUPI += entry.totalServiceCost || 0; // Accumulate total UPI
      // } else if (entry.paymentMethod === "Cash") {
      //   totalCash += entry.totalServiceCost || 0; // Accumulate total Cash
      // }

  //     row.forEach((cell, cellIndex) => {
  //       const xPosition =
  //         10 + columnWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0);
  //       if (typeof cell === "string") {
  //         doc.text(cell, xPosition, 35 + index * 10);
  //       }
  //     });
  //   });

  //   const totalRowYPosition = 35 + filteredData.length * 10;
  //   doc.line(10, totalRowYPosition, 200, totalRowYPosition);
  //   const totalIncome = totalUPI + totalCash;

  //   doc.text(
  //     `Total Income (UPI): ${totalUPI.toFixed(2)}`,
  //     130,
  //     totalRowYPosition + 10
  //   );
  //   doc.text(
  //     `Total Income (Cash): ${totalCash.toFixed(2)}`,
  //     130,
  //     totalRowYPosition + 20
  //   );
  //   doc.text(
  //     `Total Income (Overall): ${totalIncome.toFixed(2)}`,
  //     130,
  //     totalRowYPosition + 30
  //   );

  //   const fileName = (() => {
  //     if (selectedOption === "custom") {
  //       return `income_history_${startDate.toLocaleDateString(
  //         "en-GB"
  //       )}_to_${endDate.toLocaleDateString("en-GB")}.pdf`;
  //     } else if (selectedOption === "yearly") {
  //       return `income_history_${selectedYear}.pdf`;
  //     } else {

  //       return `income_history_${new Date(
  //         selectedYear,
  //         selectedMonth - 1
  //       ).toLocaleString("default", { month: "long" })}_${selectedYear}.pdf`;
  //     }
  //   })();

  //   doc.save(fileName);
  // };


  return (
    <div className="min-h-screen bg-[#23346c] p-4 lg:p-10 text-gray-100 relative">

      <main className="mt-8 p-2">
        <IncomeChart
          incomeHistoryData={incomeHistoryData}
          isLoading={isLoading}
          setIsModalOpen={setIsModalOpen}
          setAddOrderModal={setAddOrderModal}
        />

        {/* Income History Table */}
        <div className="bg-[#00144c] p-6 lg:p-10 rounded-lg">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-[#ffeda5]">
              Order History
            </h3>
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
              {/* Example Dynamic Entries */}
              {[
                {
                  date: "20-05-2024",
                  orderID: "#8987657",
                  totalAmount: 490,
                  orderDetails: [
                    { item: "Coffee", quantity: 1, total: 100 },
                    { item: "Sandwich", quantity: 2, total: 200 },
                    { item: "Pastry", quantity: 3, total: 190 },
                  ],
                },
                {
                  date: "28-05-2024",
                  orderID: "#8677657",
                  totalAmount: 700,
                  orderDetails: [
                    { item: "Tea", quantity: 2, total: 80 },
                    { item: "Cake", quantity: 1, total: 300 },
                    { item: "Cookie", quantity: 5, total: 320 },
                    { item: "Tea", quantity: 2, total: 80 },
                    { item: "Cake", quantity: 1, total: 300 },
                    { item: "Cookie", quantity: 5, total: 320 },
                    { item: "Tea", quantity: 2, total: 80 },
                    { item: "Cake", quantity: 1, total: 300 },
                    { item: "Cookie", quantity: 5, total: 320 },
                    { item: "Tea", quantity: 2, total: 80 },
                    { item: "Cake", quantity: 1, total: 300 },
                    { item: "Cookie", quantity: 5, total: 320 },
                    { item: "Tea", quantity: 2, total: 80 },
                    { item: "Cake", quantity: 1, total: 300 },
                    { item: "Cookie", quantity: 5, total: 320 },
                    { item: "Tea", quantity: 2, total: 80 },
                    { item: "Cake", quantity: 1, total: 300 },
                    { item: "Cookie", quantity: 5, total: 320 },
                  ],
                },
              ].map((order) => (
                <tr key={order.orderID}>
                  <td>{order.date}</td>
                  <td>{order.orderID}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>View</td>
                  <td>
                    <button
                      onClick={() => generatePDF(order)}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))}
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
      {/* {viewIncomeModal && (
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
      {addOrderModal && (
        <AddOrder setAddOrderModal={setAddOrderModal}/>
      )} */}
    </div>
  );
};

export default OrderBody;
