// MoreModal.js
import React from 'react';

const MoreModal = ({ onClose, vehicleNumbers }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96 max-w-full">
        <h2 className="text-lg font-semibold mb-4">Vehicle Numbers</h2>
        <ul className="list-disc pl-5">
          {vehicleNumbers.map((number, index) => (
            <li key={index} className="text-gray-800">{number}</li>
          ))}
        </ul>
        <button
          className="mt-4 bg-blue-300 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MoreModal;
