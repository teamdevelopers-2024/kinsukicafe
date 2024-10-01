import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import api from "../../services/api";
import swal from "sweetalert";
import LoadingSpinner from "../spinner/Spinner";

const CreditForm = ({ customer, onClose }) => {
  // Initialize states
  const [workRows, setWorkRows] = useState([
    { description: "", amount: "", reference: "" },
  ]);
  const [creditAmount, setCreditAmount] = useState(0);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const today = new Date();
  const options = { timeZone: "Asia/Kolkata" }; // Specify Indian timezone
  const todayString = today.toLocaleDateString("en-CA", options); // Format to YYYY-MM-DD
  const [isLoading , setIsLoading ] = useState(false)
  
  // Set dateOfService to today's date initially
  const [date, setDate] = useState(todayString);


  // Validation errors state
  const [errors, setErrors] = useState({});

  // Handle date change
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Handle input changes for work rows
  const handleInputChange = (index, field, value) => {
    const newWorkRows = [...workRows];
    newWorkRows[index][field] = value;
    setWorkRows(newWorkRows);
    updateTotalAmount(newWorkRows);
  };

  // Update total amount based on work rows
  const updateTotalAmount = (rows) => {
    const total = rows.reduce(
      (acc, row) => acc + (parseFloat(row.amount) || 0),
      0
    );
    setCreditAmount(total); // Update creditAmount state
  };

  // Add new work row
  const addWorkRow = () => {
    setWorkRows([...workRows, { description: "", amount: "", reference: "" }]);
  };

  // Remove work row
  const removeWorkRow = (index) => {
    const newWorkRows = workRows.filter((_, i) => i !== index);
    setWorkRows(newWorkRows);
    updateTotalAmount(newWorkRows);
  };

  // Validate form fields
  const validateForm = () => {
    let formErrors = {};
    // Validate vehicle number
    if (!vehicleNumber.trim()) {
      formErrors.vehicleNumber = "Vehicle number is required.";
    }

    // Validate each work row
    workRows.forEach((row, index) => {
      if (!row.description.trim()) {
        formErrors[`description-${index}`] = "Description is required.";
      }
      if (!row.amount || isNaN(row.amount) || parseFloat(row.amount) <= 0) {
        formErrors[`amount-${index}`] = "Amount must be a positive number.";
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

// Handle form submission
const handleSubmit = async () => {
  if (validateForm()) {
    setIsLoading(true); // Show loading spinner
    try {
      const formData = {
        date,
        vehicleNumber: vehicleNumber.toUpperCase(),
        workRows,
        creditAmount,
        phoneNumber: customer.phoneNumber,
        _id: customer._id,
      };

      const result = await api.addCredit(formData);
      if (!result.error) {
        swal("Success!", "Credit added successfully!", "success");
        onClose(); // Close the modal or form
      } else {
        swal("Error!", result.message, "error");
      }

      console.log("Form submitted:", {
        date,
        vehicleNumber,
        workRows,
        creditAmount,
      });
    } catch (error) {
      // Handle error gracefully
      swal("Error!", "Something went wrong. Please try again later.", "error");
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false); // Hide loading spinner regardless of success or failure
    }
  }
};


  return (
    <>
    {isLoading && <LoadingSpinner/>}
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-11/12 max-w-3xl">
        <h2 className="text-xl mb-2">Add Credit for {customer.customerName}</h2>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {/* Date Input */}
          <div>
            <label className="block text-sm mb-1">Date of service</label>
            <input
              type="date"
              className="w-full px-2 py-1 rounded bg-gray-700 text-white"
              value={date}
              max={todayString}
              onChange={handleDateChange}
            />
          </div>
          {/* Customer Name */}
          <div>
            <label className="block text-sm mb-1">Customer Name</label>
            <input
              type="text"
              value={customer.customerName}
              disabled
              className="w-full px-2 py-1 rounded bg-gray-700 text-white"
            />
          </div>
          {/* Phone Number */}
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="text"
              value={customer.phoneNumber}
              disabled
              className="w-full px-2 py-1 rounded bg-gray-700 text-white"
            />
          </div>
          {/* Vehicle Number */}
          <div>
            <label className="block text-sm mb-1">Vehicle Number</label>
            <input
              type="text"
              value={vehicleNumber.toUpperCase()}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full px-2 py-1 rounded bg-gray-700 text-white"
              placeholder="Enter Vehicle Number"
            />
            {errors.vehicleNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.vehicleNumber}</p>
            )}
          </div>
        </div>

        {/* Work Details */}
        <div className="mb-3">
          <h3 className="text-lg mb-2">Work Details</h3>

          {/* Work Rows Heading */}
          <div className="grid grid-cols-[3fr_3fr_3fr_1fr] gap-2 mb-1 font-semibold">
            <div>Description</div>
            <div>Amount</div>
            <div>Reference</div>
            {workRows.length > 1 && <div>Action</div>}
          </div>

          {/* Work Rows */}
          {workRows.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-[3fr_3fr_3fr_1fr] gap-2 mb-1"
            >
              <div>
                <input
                  type="text"
                  placeholder="Work description"
                  className="px-2 py-1 rounded bg-gray-700 text-white"
                  value={row.description}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                />
                {errors[`description-${index}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`description-${index}`]}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Amount"
                  className="px-2 py-1 rounded bg-gray-700 text-white"
                  value={row.amount}
                  onChange={(e) =>
                    handleInputChange(index, "amount", e.target.value)
                  }
                />
                {errors[`amount-${index}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`amount-${index}`]}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Reference"
                  className="px-2 py-1 rounded bg-gray-700 text-white"
                  value={row.reference}
                  onChange={(e) =>
                    handleInputChange(index, "reference", e.target.value)
                  }
                />
                {errors[`reference-${index}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`reference-${index}`]}
                  </p>
                )}
              </div>
              {index >= 1 && (
                <FaTrash
                  className="text-red-500 cursor-pointer self-center"
                  onClick={() => removeWorkRow(index)}
                />
              )}
            </div>
          ))}

          {/* Add Field Button */}
          <button
            className="bg-teal-400 text-gray-900 px-3 py-1 rounded-md mt-2"
            onClick={addWorkRow}
          >
            Add Field
          </button>
        </div>

        {/* Total Amount Display */}
        <div className="mb-3">
          <label className="block text-lg mb-1">
            Total Credit Amount: ₹{creditAmount}
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-teal-400 text-gray-900 px-3 py-1 rounded-md"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CreditForm;
