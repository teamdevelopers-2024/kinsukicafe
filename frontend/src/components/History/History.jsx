import React from "react";
import jsPDF from 'jspdf';
import "jspdf-autotable";
import imgData from "../../assets/logocropped.jpg";

const History = ({ onClose, customer }) => {

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 35, "F");

    doc.addImage(imgData, "PNG", 10, 10, 50, 20);

    doc.setTextColor(255, 255, 255);

    // Add Shop Name and Address
    doc.setFontSize(12);
    doc.text("Sea Land Car Care", 160, 20); // Center-aligned shop name
    doc.text("Oorakam Karimbily, Vengara", 150, 25);
    doc.text("Phone: +91 92071 50011", 155, 30);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Transaction History - ${customer.customerName}`, 75, 45);
    
    // Prepare the data for the table
    const tableData = customer.transactionHistory.map(transaction => [
      new Date(transaction.date).toLocaleDateString("en-GB"),
      transaction.vehicleNumber,
      customer.customerName,
      transaction.phoneNumber,
      ["UPI", "Cash", "Card"].includes(transaction.paymentType)
        ? `Paid - ${transaction.paymentType}`
        : "New Credit",
      transaction.Amount
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [['Date', 'Vehicle Number', 'Name', 'Phone Number', 'Payment Method', 'Amount']],
      body: tableData,
      startY: 55, // Adjust start position of the table
    });

    // Save the PDF
    doc.save(`Transaction_History_${customer.customerName}.pdf`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-gray-800 text-gray-300 rounded-lg w-full max-w-3xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Transaction History - {customer.customerName}
        </h2>

        {/* Table structure for history */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left text-gray-300">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone number</th>
                <th className="px-4 py-2">Paid/Credit</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-gray-700">
              {customer.transactionHistory.map((transaction, index) => (
                <tr className="border-t border-gray-600">
                  <td className="px-4 py-2">
                    {new Date(transaction.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2">{customer.customerName}</td>
                  <td className="px-4 py-2">{transaction.phoneNumber}</td>
                  
                  <td className="px-4 py-2">{["UPI", "Cash", "Card"].includes(transaction.paymentType)
          ? `Paid - ${transaction.paymentType}`
          : "New Credit"}</td>
                  <td className="px-4 py-2">{transaction.Amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-right">
          <button
          onClick={generatePDF}
            className="bg-teal-400 text-gray-900 px-4 mr-3 py-2 rounded-md"
          >
            Download
          </button>
          <button
            onClick={onClose}
            className="bg-teal-400 text-gray-900 px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
