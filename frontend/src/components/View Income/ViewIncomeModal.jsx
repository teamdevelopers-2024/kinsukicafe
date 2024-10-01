import React, { useState } from "react";
import jsPDF from "jspdf";
import imgData from "../../assets/logocropped.jpg";

const ViewIncomeModal = ({ entry, onClose }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

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

    // Reset text color for the rest of the document
    doc.setTextColor(0, 0, 0); // Black color for other text

    // Add a separator line
    doc.line(10, 35, 200, 35);

    // Add Invoice Date and Number
    doc.setFontSize(10);
    doc.text(
      `Service Date: ${new Date(entry.workDate).toLocaleDateString()}`,
      10,
      50
    );
    doc.text(`Reciept Date: ${formatDate(new Date())}`, 160, 50);

    // Add Customer Information
    doc.setFontSize(12);
    doc.text(`Customer: ${entry.customerName}`, 10, 60);
    doc.text(`Phone: ${entry.contactNumber}`, 10, 70);
    doc.text(`Vehicle Number: ${entry.vehicleNumber}`, 140, 70);

    // Add a separator line
    doc.line(10, 75, 200, 75);

    // Add table headers for items (compact)
    doc.setFontSize(12);
    doc.setFont("bold");
    doc.text("No.", 10, 82);
    doc.text("Description", 40, 82);
    doc.text("Reference", 100, 82);
    doc.text("Amount", 160, 82);

    // Add a separator line
    doc.line(10, 85, 200, 85);

    // Add table rows for items with index numbers
    doc.setFont("normal");
    entry.workDescriptions.forEach((item, index) => {
      const yOffset = 90 + index * 10; // Adjust row height for each item
      doc.text(`${index + 1}`, 10, yOffset); // Index number
      doc.text(`${item.description}`, 40, yOffset); // Description
      doc.text(`${item.reference}`, 100, yOffset); // reference
      doc.text(`${parseFloat(item.amount).toLocaleString()}`, 160, yOffset);
    });

    // Add a separator line after the items
    const itemsEndY = 90 + entry.workDescriptions.length * 10;
    doc.line(10, itemsEndY + 5, 200, itemsEndY + 5);

    // Add Total
    doc.setFont("bold");
    doc.text("Total:", 140, itemsEndY + 15);
    doc.text(
      `${parseFloat(entry.totalServiceCost).toLocaleString()}`,
      160,
      itemsEndY + 15
    );

    // Add a separator line
    doc.line(10, itemsEndY + 20, 200, itemsEndY + 20);

    // Add Footer (Thank You Note, etc.)
    doc.setFont("normal");
    doc.text("Thank you for your visit!", 70, itemsEndY + 30);
    doc.text("Visit us again!", 80, itemsEndY + 35);

    // Save the PDF with the customer's name
    doc.save(`${entry.customerName.replace(/[^a-zA-Z0-9]/g, "_")}_receipt.pdf`);
  };

  if (!entry) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>

      {/* Popup Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-30">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
          <h2 className="text-xl mb-4">Income Details</h2>

          {/* Income Information */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="text-white block">Work Date:</span>
              <p className="text-gray-300">
                {new Date(entry.workDate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <span className="text-white block">Customer Name:</span>
              <p className="text-gray-300">{entry.customerName}</p>
            </div>

            <div>
              <span className="text-white block">Vehicle Number:</span>
              <p className="text-gray-300">{entry.vehicleNumber}</p>
            </div>

            <div>
              <span className="text-white block">Contact Number:</span>
              <p className="text-gray-300">{entry.contactNumber}</p>
            </div>

            <div>
              <span className="text-white block">Payment Method:</span>
              <p className="text-gray-300">{entry.paymentMethod}</p>
            </div>

            <div>
              <span className="text-white block">Total Service Cost:</span>
              <p className="text-gray-300">
                ₹ {parseFloat(entry.totalServiceCost).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Work Descriptions */}
          <h3 className="text-lg mb-4">Work Descriptions</h3>
          <table className="w-full mb-4">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Work Description</th>
                <th className="text-center">Amount</th>
                <th className="text-center">Reference</th>
              </tr>
            </thead>
            <tbody>
              {entry.workDescriptions.map((work, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{work.description}</td>
                  <td className="text-center">
                    ₹ {parseFloat(work.amount).toLocaleString()}
                  </td>
                  <td className="text-center">{work.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => generatePDF()}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>
            <button
              onClick={() => onClose()}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewIncomeModal;
