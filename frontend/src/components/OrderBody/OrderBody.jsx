import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import api from "../../services/api";
import ViewIncomeModal from "../View Income/ViewIncomeModal";
import IncomeChart from "../Income Chart/IncomeChart";
import PDFDownloadModal from "../PDFDownloadModal/PDFDownloadModal";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";
import AddOrder from "../Add Order/AddOrder";
import logo from '../../assets/logoPDF.png'

const OrderBody = () => {
  const [incomeHistoryData, setIncomeHistoryData] = useState([]);
  // const [viewIncomeModal, setViewIncomeModal] = useState(false);
  // const [singleEntry, setSingleEntry] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [addOrderModal, setAddOrderModal] = useState(false);
  const entriesPerPage = 5;

  useEffect(() => {
    const fetchIncomeHistory = async () => {
      setIsLoading(true); // Set loading to true
      try {
        const response = await api.getOrders();
        if(!response.error){
          setIncomeHistoryData(response.data);
        }else{
          swal("!error" , "error fetching data", "error")
        }
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
  const generateTotalPDF = (
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
      title = `Income History from ${startDate.toLocaleDateString(
        "en-IN"
      )} to ${endDate.toLocaleDateString("en-IN")}`;
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
      const xPosition =
        10 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
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
      const upiAmount =
        entry.paymentMethod === "UPI" || entry.paymentMethod === "Repaid-UPI"
          ? entry.totalServiceCost.toFixed(2)
          : "";
      const cashAmount =
        entry.paymentMethod === "Cash" || entry.paymentMethod === "Repaid-Cash"
          ? entry.totalServiceCost.toFixed(2)
          : "";

      const row = [
        entryDate,
        entry.customerName,
        entry.vehicleNumber,
        entry.contactNumber ? entry.contactNumber.toString() : "",
        upiAmount,
        cashAmount,
      ];

      // Accumulate totals based on payment method
      if (entry.paymentMethod === "UPI") {
        totalUPI += entry.totalServiceCost || 0; // Accumulate total UPI
      } else if (entry.paymentMethod === "Cash") {
        totalCash += entry.totalServiceCost || 0; // Accumulate total Cash
      }

      row.forEach((cell, cellIndex) => {
        const xPosition =
          10 + columnWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0);
        if (typeof cell === "string") {
          doc.text(cell, xPosition, 35 + index * 10);
        }
      });
    });

    const totalRowYPosition = 35 + filteredData.length * 10;
    doc.line(10, totalRowYPosition, 200, totalRowYPosition);
    const totalIncome = totalUPI + totalCash;

    doc.text(
      `Total Income (UPI): ${totalUPI.toFixed(2)}`,
      130,
      totalRowYPosition + 10
    );
    doc.text(
      `Total Income (Cash): ${totalCash.toFixed(2)}`,
      130,
      totalRowYPosition + 20
    );
    doc.text(
      `Total Income (Overall): ${totalIncome.toFixed(2)}`,
      130,
      totalRowYPosition + 30
    );

    const fileName = (() => {
      if (selectedOption === "custom") {
        return `income_history_${startDate.toLocaleDateString(
          "en-GB"
        )}_to_${endDate.toLocaleDateString("en-GB")}.pdf`;
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

  // const generatePDF = (order) => {
  //   const width = 75;
  //   const itemHeight = 8; // Height for each item
  //   const footerHeight = 25; // Space needed for footer
  //   const maxVisibleItems = Math.floor((150 - footerHeight) / itemHeight); // Calculate max visible items based on 150mm height

  //   const itemCount = order.orderDetails.length;
  //   const totalHeight =
  //     40 + Math.min(itemCount, maxVisibleItems) * itemHeight + footerHeight; // Dynamic height based on items

  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: [width, totalHeight],
  //     hotfixes: [],
  //   });

  //   doc.setTextColor(0, 0, 0);

  //   // Shop Information
  //   doc.setFontSize(8);
  //   doc.text("Receipt", 35, 4);
  //   doc.line(34.9, 5, 44.9, 5);
  //   doc.text("Kinsuki Cafe, Near Vayaloram, Kottakkal", 15, 8);
  //   doc.text("Phone: +91 98765 43210", 25, 12);
  //   doc.setLineDash([1, 1], 0); // Dotted line pattern
  //   doc.line(5, 14, 70, 14);
  //   doc.setLineDash([]); // Reset to solid lines
  //   doc.setFontSize(7);
  //   doc.text(`${order.date}`, 25, 18);
  //   doc.text(`11:13:06 AM`, 40, 18);

  //   doc.setLineDash([1, 1], 0); // Dotted line pattern
  //   doc.line(5, 21, 70, 21);
  //   doc.setLineDash([]);

  //   let startY = 24; // Adjust starting Y position

  //   // Table headers
  //   doc.setFontSize(7);
  //   doc.text("No", 5, startY); // Index Number Header
  //   doc.text("Item", 15, startY);
  //   doc.text("Qty", 50, startY);
  //   doc.text("Total", 62, startY);
  //   doc.line(5, startY + 3, 70, startY + 3); // Header line

  //   // Add items to the receipt
  //   order.orderDetails.forEach((detail, index) => {
  //     const yOffset = startY + 10 + index * itemHeight; // Adjust for smaller height
  //     doc.text((index + 1).toString(), 5, yOffset); // Index number
  //     doc.text(detail.item, 15, yOffset);
  //     doc.text(detail.quantity.toString(), 50, yOffset);
  //     doc.text(`${detail.total.toFixed(2)}`, 62, yOffset);
  //   });

  //   // Add a separator line after the items
  //   const itemsEndY =
  //     startY + 10 + Math.min(itemCount, maxVisibleItems) * itemHeight;
  //   doc.line(5, itemsEndY + 5, 70, itemsEndY + 5);

  //   // Calculate total position
  //   const totalY = itemsEndY + 10;
  //   doc.setFont("bold");
  //   doc.text("Total:", 50, totalY);
  //   doc.text(`${order.totalAmount.toFixed(2)}`, 60, totalY);

  //   // Add Footer
  //   const footerY = totalY + 10;
  //   doc.setFont("normal");
  //   doc.text("Thank you for your business!", 28, footerY);
  //   doc.text("Visit us again!", 33, footerY + 5);

  //   // Save the PDF with a unique name
  //   doc.save(`receipt_${order.orderID}.pdf`);
  // };

  //   const generatePDF = (order) => {
  //     const width = 75;
  //     const itemHeight = 8; // Height for each item
  //     const footerHeight = 25; // Space needed for footer
  //     const maxVisibleItems = Math.floor((150 - footerHeight) / itemHeight); // Calculate max visible items based on 150mm height

  //     const itemCount = order.orderDetails.length;
  //     const totalHeight =
  //       40 + Math.min(itemCount, maxVisibleItems) * itemHeight + footerHeight; // Dynamic height based on items

  //     const doc = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       format: [width, totalHeight],
  //       hotfixes: [],
  //     });

  //     doc.setTextColor(0, 0, 0);

  //     // Shop Information
  //     doc.setFontSize(8);
  //     doc.text("Receipt", 35, 4);
  //     doc.line(34.9, 5, 44.9, 5);
  //     doc.text("Kinsuki Cafe, Near Vayaloram, Kottakkal", 15, 8);
  //     doc.text("Phone: +91 98765 43210", 25, 12);
  //     doc.setLineDash([1, 1], 0); // Dotted line pattern
  //     doc.line(5, 14, 70, 14);
  //     doc.setLineDash([]); // Reset to solid lines
  //     doc.setFontSize(7);
  //     doc.text(`${order.date}`, 25, 18);
  //     doc.text(`11:13:06 AM`, 40, 18);

  //     doc.setLineDash([1, 1], 0); // Dotted line pattern
  //     doc.line(5, 21, 70, 21);
  //     doc.setLineDash([]);

  //     let startY = 24; // Adjust starting Y position

  //     // Table headers
  //     doc.setFontSize(7);
  //     doc.text("No", 5, startY); // Index Number Header
  //     doc.text("Item", 15, startY);
  //     doc.text("Qty", 35, startY);
  //     doc.text("Price",50,startY);
  //     doc.text("Total", 62, startY);
  //     doc.line(5, startY + 3, 70, startY + 3); // Header line

  //     // Add items to the receipt
  //     order.orderDetails.forEach((detail, index) => {
  //       const yOffset = startY + 10 + index * itemHeight; // Adjust for smaller height
  //       doc.text((index + 1).toString(), 5, yOffset); // Index number
  //       doc.text(detail.item, 15, yOffset);
  //       doc.text(detail.quantity.toString(), 35, yOffset);
  //       doc.text("80", 50, yOffset);
  //       doc.text(`${detail.total.toFixed(2)}`, 62, yOffset);
  //     });

  //     // Add a separator line after the items
  //     const itemsEndY =
  //       startY + 10 + Math.min(itemCount, maxVisibleItems) * itemHeight;
  //     doc.line(5, itemsEndY + 5, 70, itemsEndY + 5);

  //     // Calculate total position
  //     const totalY = itemsEndY + 10;
  //     doc.setFont("bold");
  //     doc.text("Total:", 50, totalY);
  //     doc.text(`${order.totalAmount.toFixed(2)}`, 60, totalY);

  //     // Add Footer
  //     const footerY = totalY + 10;
  //     doc.setFont("normal");
  //     doc.text("Thank you for your business!", 28, footerY);
  //     doc.text("Visit us again!", 33, footerY + 5);

  //     // Use output method to create Blob and open print dialog
  //     const pdfOutput = doc.output('blob');
  //     const pdfUrl = URL.createObjectURL(pdfOutput);

  //     // Open the PDF in a new window for printing
  //     const printWindow = window.open(pdfUrl);
  //     printWindow.onload = () => {
  //         printWindow.print();
  //         printWindow.onafterprint = () => {
  //             printWindow.close();
  //             URL.revokeObjectURL(pdfUrl); // Clean up the URL
  //         };
  //     };
  // };

  // const generatePDF = (order) => {
  //   const width = 75;
  //   const itemHeight = 8; // Height for each item
  //   const footerHeight = 25; // Space needed for footer
  //   const maxVisibleItems = Math.floor((150 - footerHeight) / itemHeight); // Calculate max visible items based on 150mm height

  //   const itemCount = order.orderDetails.length;
  //   const totalHeight =
  //     40 + Math.min(itemCount, maxVisibleItems) * itemHeight + footerHeight; // Dynamic height based on items

  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: [width, totalHeight],
  //     hotfixes: [],
  //   });

  //   doc.setTextColor(0, 0, 0);


  //   // Shop Information
  //   doc.setFontSize(8);
  //   doc.text("Receipt", 33, 5); // Adjusted Y position for receipt title
  //   doc.line(32.9, 6, 42.9, 6);
  //   doc.addImage(logo, "PNG", 3, 5, 22, 13); // Position and size of the logo
  //   doc.text("Kinsuki Cafe, Near Vayaloram", 28, 9);
  //   doc.text("Kottakkal", 40, 13);
  //   doc.text("Phone: +91 98765 43210", 29, 17);
  //   doc.setLineDash([1, 1], 0); // Dotted line pattern
  //   doc.line(5, 19, 70, 19);
  //   doc.setLineDash([]); // Reset to solid lines
  //   doc.setFontSize(9);
  //   doc.text(`${order.date}`, 20, 25);
  //   doc.text(`11:13:06 AM`, 40, 25);
  //   doc.setFontSize(7);
  //   doc.setLineDash([1, 1], 0); // Dotted line pattern
  //   doc.line(5, 28, 70, 28);
  //   doc.setLineDash([]);

  //   let startY = 32; // Adjust starting Y position

  //   // Table headers
  //   doc.setFontSize(7);
  //   doc.text("No", 5, startY); // Index Number Header
  //   doc.text("Item", 15, startY);
  //   doc.text("Qty", 35, startY);
  //   doc.text("Price", 50, startY);
  //   doc.text("Total", 62, startY);
  //   doc.line(5, startY + 3, 70, startY + 3); // Header line

  //   // Add items to the receipt
  //   order.orderDetails.forEach((detail, index) => {
  //     const yOffset = startY + 10 + index * itemHeight; // Adjust for smaller height
  //     doc.text((index + 1).toString(), 5, yOffset); // Index number
  //     doc.text(detail.item, 15, yOffset);
  //     doc.text(detail.quantity.toString(), 35, yOffset);
  //     doc.text("80", 50, yOffset);
  //     doc.text(`${detail.total.toFixed(2)}`, 62, yOffset);
  //   });

  //   // Add a separator line after the items
  //   const itemsEndY =
  //     startY + 10 + Math.min(itemCount, maxVisibleItems) * itemHeight;
  //   doc.line(5, itemsEndY , 70, itemsEndY);

  //   // Calculate total position
  //   const totalY = itemsEndY + 5;
  //   doc.setFont("bold");
  //   doc.text("Total:", 50, totalY);
  //   doc.text(`${order.totalAmount.toFixed(2)}`, 60, totalY);

  //   // Add Footer
  //   const footerY = totalY + 10;
  //   doc.setFont("normal");
  //   doc.text("Thank you for your business!", 23, footerY);
  //   doc.text("Visit us again!", 29, footerY + 5);

  //   // Use output method to create Blob and open print dialog
  //   const pdfOutput = doc.output("blob");
  //   const pdfUrl = URL.createObjectURL(pdfOutput);

  //   // Open the PDF in a new window for printing
  //   const printWindow = window.open(pdfUrl);
  //   printWindow.onload = () => {
  //     printWindow.print();
  //     printWindow.onafterprint = () => {
  //       printWindow.close();
  //       URL.revokeObjectURL(pdfUrl); // Clean up the URL
  //     };
  //   };
  // };


  const generatePDF = (order) => {
    const width = 75;
    const itemHeight = 8; // Height for each item
    const footerHeight = 25; // Space needed for footer
    const maxVisibleItems = Math.floor((150 - footerHeight) / itemHeight); // Calculate max visible items based on 150mm height

    const itemCount = order.orderDetails.length;
    const totalHeight =
      40 + Math.min(itemCount, maxVisibleItems) * itemHeight + footerHeight; // Dynamic height based on items

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [width, totalHeight],
      hotfixes: [],
    });

    doc.setTextColor(0, 0, 0);

    // Format the order date
    const orderDate = new Date(order.Date);

    const formattedOrderDate = `${String(orderDate.getDate()).padStart(2, '0')}/${String(orderDate.getMonth() + 1).padStart(2, '0')}/${orderDate.getFullYear()}`;

    // Format the print time
    const printDate = new Date();
    const formattedPrintTime = `${String(printDate.getHours()).padStart(2, '0')}:${String(printDate.getMinutes()).padStart(2, '0')}:${String(printDate.getSeconds()).padStart(2, '0')} ${printDate.getHours() >= 12 ? 'PM' : 'AM'}`;

    // Shop Information
    doc.setFontSize(8);
    doc.text("Receipt", 33, 5); // Adjusted Y position for receipt title
    doc.line(32.9, 6, 42.9, 6);
    doc.addImage(logo, "PNG", 3, 5, 22, 13); // Position and size of the logo
    doc.text("Kinsuki Cafe, Near Vayaloram", 28, 9);
    doc.text("Kottakkal", 40, 13);
    doc.text("Phone: +91 98765 43210", 29, 17);
    doc.setLineDash([1, 1], 0); // Dotted line pattern
    doc.line(5, 19, 70, 19);
    doc.setLineDash([]); // Reset to solid lines
    doc.setFontSize(9);
    doc.text(formattedOrderDate, 20, 25);
    doc.text(formattedPrintTime, 40, 25);
    doc.setFontSize(7);
    doc.setLineDash([1, 1], 0); // Dotted line pattern
    doc.line(5, 32, 70, 32);
    doc.setLineDash([]);

    let startY = 36; // Adjust starting Y position

    // Table headers
    doc.setFontSize(7);
    doc.text("No", 5, startY); // Index Number Header
    doc.text("Item", 15, startY);
    doc.text("Qty", 35, startY);
    doc.text("Price", 50, startY);
    doc.text("Total", 62, startY);
    doc.line(5, startY + 3, 70, startY + 3); // Header line

    // Add items to the receipt
    order.orderDetails.forEach((detail, index) => {
      const yOffset = startY + 10 + index * itemHeight; // Adjust for smaller height
      doc.text((index + 1).toString(), 5, yOffset); // Index number
      doc.text(detail.item, 15, yOffset);
      doc.text(detail.quantity.toString(), 35, yOffset);
      doc.text("80", 50, yOffset);
      doc.text(`${detail.total.toFixed(2)}`, 62, yOffset);
    });

    // Add a separator line after the items
    const itemsEndY =
      startY + 10 + Math.min(itemCount, maxVisibleItems) * itemHeight;
    doc.line(5, itemsEndY, 70, itemsEndY);

    // Calculate total position
    const totalY = itemsEndY + 5;
    doc.setFont("bold");
    doc.text("Total:", 50, totalY);
    doc.text(`${order.totalAmount.toFixed(2)}`, 60, totalY);

    // Add Footer
    const footerY = totalY + 10;
    doc.setFont("normal");
    doc.text("Thank you for your business!", 23, footerY);
    doc.text("Visit us again!", 29, footerY + 5);

    

    // Use output method to create Blob and open print dialog
    const pdfOutput = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfOutput);

    // Open the PDF in a new window for printing
    const printWindow = window.open(pdfUrl);
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
        URL.revokeObjectURL(pdfUrl); // Clean up the URL
      };
    };
};



  const generateDownPDF = (
    startDate,
    endDate,
    selectedOption, // "monthly", "yearly", or custom
    selectedMonth, 
    selectedYear
) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Page height (A4 size in jsPDF: 297mm height or roughly 290 usable)
    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    let currentY = 35; // Initial Y position for table rows

    // Convert startDate and endDate to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Ensure that endDate includes the entire day
    end.setHours(23, 59, 59, 999);

    // Filter data based on selected options or date range
    let filteredData = [];

    if (selectedOption === "monthly") {
        filteredData = incomeHistoryData.filter((order) => {
            const orderDate = new Date(order.Date);
            return (
                orderDate.getMonth() + 1 === selectedMonth &&
                orderDate.getFullYear() === selectedYear
            );
        });
    } else if (selectedOption === "yearly") {
        filteredData = incomeHistoryData.filter((order) => {
            const orderDate = new Date(order.Date);
            return orderDate.getFullYear() === selectedYear;
        });
    } else if (startDate && endDate) {
        filteredData = incomeHistoryData.filter((order) => {
            const orderDate = new Date(order.Date);
            return orderDate >= start && orderDate <= end;
        });
    } else {
        filteredData = incomeHistoryData;
    }

    // Dynamic title based on selected options
    let title;
    if (selectedOption === "monthly") {
        title = `Income History for ${new Date(
            selectedYear,
            selectedMonth - 1
        ).toLocaleString("default", { month: "long" })} ${selectedYear}`;
    } else if (selectedOption === "yearly") {
        title = `Income History for ${selectedYear}`;
    } else if (startDate && endDate) {
        title = `Income History from ${start.toLocaleDateString("en-IN")} to ${end.toLocaleDateString("en-IN")}`;
    } else {
        title = `Full Income History`;
    }

    // Add title
    if (typeof title === "string") {
        doc.text(title, 75, 10);
    }

    // Add table headers
    const headers = [
        "Date", 
        "Total Amount", 
        "Item", 
        "Quantity", 
        "Total Item Amount"
    ];

    const columnWidths = [30, 40, 50, 20, 35]; // Adjust column widths

    // Add headers to PDF
    headers.forEach((header, index) => {
        const xPosition = 10 + columnWidths.slice(0, index).reduce((a, b) => a + b, 0);
        doc.text(header, xPosition, 25);
    });

    // Add separator line below headers
    doc.line(10, 30, 200, 30);

    let totalIncome = 0;

    // Loop through the filtered data to populate the table
    filteredData.forEach((order) => {
        const orderDate = new Date(order.Date).toLocaleDateString("en-IN");
        const totalAmount = order.totalAmount.toFixed(2);

        totalIncome += order.totalAmount;

        // Add each row
        doc.text(orderDate, 10, currentY);
        doc.text(totalAmount, 40, currentY);

        // Add details of items in the order
        order.orderDetails.forEach((detail, index) => {
            const item = detail.item;
            const quantity = detail.quantity.toString();
            const totalItemAmount = (detail.total * detail.quantity).toFixed(2);

            doc.text(item, 80, currentY);
            doc.text(quantity, 130, currentY);
            doc.text(totalItemAmount, 150, currentY);

            currentY += 10;

            // Check if content exceeds the page height, create a new page if necessary
            if (currentY > pageHeight - margin) {
                doc.addPage();
                currentY = margin; // Reset Y position after new page
            }
        });

        currentY += 10; // Additional space between orders

        // Check if content exceeds the page height, create a new page if necessary
        if (currentY > pageHeight - margin) {
            doc.addPage();
            currentY = margin; // Reset Y position after new page
        }
    });

    // Add total income at the bottom (on the last page)
    if (currentY > pageHeight - margin) {
        doc.addPage();
        currentY = margin;
    }
    doc.text(`Total Income: ₹${totalIncome.toFixed(2)}`, 10, currentY + 10);

    // Save or download the PDF
    doc.save("Income_History.pdf");
};

  
  

  return (
    <div  className="min-h-screen bg-[#23346c] p-4 lg:p-10 text-gray-100 relative">
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
              <tr className="text-gray-500">
                <th className="pb-2" >Date</th>
                <th className="pb-2" >Refference</th>
                <th className="pb-2">Total Amount</th>
                <th className="pb-2">Action</th>
                <th className="pb-2">Print</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? ( // Show loading indicator
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    <SpinnerOnly />
                  </td>
                </tr>
              ) : paginatedEntries.length > 0 ? (
                paginatedEntries.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-700">
                    <td className="py-2">
                      {new Date(entry.Date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="py-2">{entry.referenceNumber}</td>
                    <td className="py-2">{entry.totalAmount}</td>
                    <td className="py-2">
                      <button
                        onClick={() => handleViewClick(entry)}
                        className="text-[#ffeda5]"
                      >
                        View
                      </button>
                    </td>
                    <td className="py-2">
                      <button
                      onClick={() => generatePDF(entry)}
                        className="text-[#ffeda5]"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
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

      )} */}
      {isModalOpen && (
        <PDFDownloadModal
          generatePDF={generateTotalPDF}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {addOrderModal && (
        <AddOrder setAddOrderModal={setAddOrderModal}/>
      )} 
    </div>
  );
};

export default OrderBody;
