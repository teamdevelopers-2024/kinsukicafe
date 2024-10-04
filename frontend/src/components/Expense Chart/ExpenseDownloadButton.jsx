import React, { useState } from "react";
import downloadIcon from "../../assets/downloadIcon.png"; // Update this path

const ExpenseDownloadButton = ({ setPdfModalOpen }) => {
  const [iconVisible, setIconVisible] = useState(false);
  return !iconVisible ? (
    <button
      className="cursor-pointer border border-cyan-600 bg-opacity-20 bg-cyan-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-cyan-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2"
      onMouseEnter={() => setIconVisible(true)}
    >
      Download
    </button>
  ) : (
    <button
      className="cursor-pointer border border-cyan-600 bg-opacity-20 bg-cyan-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-cyan-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 flex"
      onMouseLeave={() => setIconVisible(false)}
      onClick={() => setPdfModalOpen(true)}
    >
      Download
      <div
        className={`ml-2 w-6 h-6 transition-opacity duration-300 ${
          iconVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img src={downloadIcon} alt="Download Icon" />
      </div>
    </button>
  );
};

export default ExpenseDownloadButton;
