import React, { useState, useEffect } from "react";
import api from "../../services/api";
import swal from "sweetalert";
import LoadingSpinner from "../spinner/Spinner";

const AddCustomer = ({ show, onClose }) => {
  const [customerName, setCustomerName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [creditAmount, setCreditAmount] = useState(0);
  const [workDetails, setWorkDetails] = useState([
    { description: "", amount: "", reference: "" },
  ]);
  const [isLoading , setIsLoading] = useState(false)

  // Get today's date in YYYY-MM-DD format for India timezone
  const today = new Date();
  const options = { timeZone: "Asia/Kolkata" }; // Specify Indian timezone
  const todayString = today.toLocaleDateString("en-CA", options); // Format to YYYY-MM-DD

  // Set dateOfService to today's date initially
  const [dateOfService, setDateOfService] = useState(todayString);

  // State for error messages
  const [errors, setErrors] = useState({});

  // Update creditAmount when workDetails change
  useEffect(() => {
    console.log("here coming inside of addcustomer")
    const totalAmount = workDetails.reduce(
      (sum, detail) => sum + parseFloat(detail.amount || 0),
      0
    );
    setCreditAmount(totalAmount);
  }, [workDetails]);

  const handleAddField = () => {
    setWorkDetails([
      ...workDetails,
      { description: "", amount: "", reference: "" },
    ]);
  };

  const handleWorkDetailChange = (index, field, value) => {
    const updatedDetails = [...workDetails];
    updatedDetails[index][field] = value;
    setWorkDetails(updatedDetails);
  };

  const handleDeleteField = (index) => {
    const updatedDetails = workDetails.filter((_, i) => i !== index);
    setWorkDetails(updatedDetails);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!dateOfService) newErrors.dateOfService = "Date of Service is required.";
    if (!customerName) newErrors.customerName = "Customer Name is required.";
    if (!vehicleNumber) newErrors.vehicleNumber = "Vehicle Number is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required.";

    workDetails.forEach((work, index) => {
      if (!work.description) {
        newErrors[`description_${index}`] = "Work Description is required.";
      }
      if (!work.amount) {
        newErrors[`amount_${index}`] = "Amount is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Validate form before submission
    setIsLoading(true)
    // Data to be sent to the backend
    const formData = {
      dateOfService,
      customerName,
      vehicleNumber,
      phoneNumber,
      creditAmount,
      workDetails,
    };

    try {
      const response = await api.addCustomer(formData);
      if (response.error) {
        console.log('getting here')
        // Handle error case
        if (!response.errors) swal("!Error", "internel Server Error", "error")
        const errors = response.errors
        const newErrors = {}
        for (let i = 0; i < errors.length; i++) {
          console.log(errors[i].field)
          newErrors[errors[i].field] = errors[i].message
        }
        setErrors(newErrors)
      } else {
        console.log("Response:", response);
        swal("!success", "Credit Customer Added Successfully", "success")
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false)
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Allow only numbers; prevent letters and any other characters
    if (/^\d*$/.test(value)) { // Check if the value consists only of digits
        setPhoneNumber(value);
    }
}



  return (
    <>
    {isLoading && <LoadingSpinner/>}
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[700px] shadow-lg rounded-md bg-gray-800">
        <h3 className="text-lg text-teal-400 font-bold mb-4">Add Customer</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Date of Service</label>
              <input
                type="date"
                className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                value={dateOfService}
                max={todayString} // Set the maximum date to today
                onChange={(e) => setDateOfService(e.target.value)}
                placeholder="Car care date"
              />
              {errors.dateOfService && (
                <p className="text-red-500 text-sm">{errors.dateOfService}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Customer Name</label>
              <input
                type="text"
                placeholder="Customer name"
                className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              {errors.customerName && (
                <p className="text-red-500 text-sm">{errors.customerName}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Vehicle Number</label>
              <input
                type="text"
                placeholder="Vehicle number"
                className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                value={vehicleNumber.toUpperCase()}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
              {errors.vehicleNumber && (
                <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel" // Use 'tel' to allow only numeric input
                placeholder="Phone number"
                className="w-full h-10 px-3 rounded bg-gray-700 text-white"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                pattern="[0-9]*" // Optional: This pattern is used for additional validation
                inputMode="numeric" // Optional: This specifies the type of virtual keyboard to show on mobile devices
              />

              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Work description fields with table headings */}
          <table className="w-full mb-4 text-white">
            <thead>
              <tr>
                <th>#</th>
                <th>Work Description</th>
                <th>Amount</th>
                <th>Reference(opt)</th>
                {workDetails.length > 1 && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {workDetails.map((work, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={work.description}
                      onChange={(e) =>
                        handleWorkDetailChange(index, "description", e.target.value)
                      }
                      className="p-2 bg-gray-700 rounded w-full"
                      placeholder="Name of the work"
                    />
                    {errors[`description_${index}`] && (
                      <p className="text-red-500 text-sm">{errors[`description_${index}`]}</p>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      value={work.amount}
                      onChange={(e) =>
                        handleWorkDetailChange(index, "amount", e.target.value)
                      }
                      className="p-2 bg-gray-700 rounded w-full"
                      placeholder="Amount of work"
                    />
                    {errors[`amount_${index}`] && (
                      <p className="text-red-500 text-sm">{errors[`amount_${index}`]}</p>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="reference"
                      value={work.reference}
                      onChange={(e) =>
                        handleWorkDetailChange(index, "reference", e.target.value)
                      }
                      className="p-2 bg-gray-700 rounded w-full"
                      placeholder="Additional information"
                    />
                  </td>
                  <td>
                    {index > 0 && (
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => handleDeleteField(index)}
                      >
                        🗑
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total amount and submit button */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-teal-400 text-sm"
              onClick={handleAddField}
            >
              + Add Field
            </button>
            <p className="text-white">Total Amount: ₹{creditAmount}</p>
            <div className="flex space-x-4">
              <button
                type="button"
                className="bg-teal-400 text-white rounded px-4 py-2 hover:bg-red-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-400 text-white rounded px-4 py-2 hover:bg-teal-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddCustomer;
