import React, { useEffect, useState } from "react";
import api from "../../services/api";
import swal from 'sweetalert';
import LoadingSpinner from "../spinner/Spinner";

const AddExpense = ({ setAddExpenseModal }) => {
  // State for form fields
  const [payeeName, setPayeeName] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading , setLoading ] = useState(false)
  const today = new Date();
  const options = { timeZone: "Asia/Kolkata" }; // Specify Indian timezone
  const todayString = today.toLocaleDateString("en-CA", options); // Format to YYYY-MM-DD
  
  // Set dateOfService to today's date initially
  const [date, setDate] = useState(todayString);

  // State to handle the dynamic fields
  const [expenseDetails, setexpenseDetails] = useState([
    { description: "", amount: "", reference: "" },
  ]);


  useEffect(() => {
    const total = expenseDetails.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
    setTotalExpense(total);
  }, [expenseDetails]);

  // State for validation errors
  const [errors, setErrors] = useState({
    date: "",
    payeeName: "",
    expenseType: "",
    contactNumber: "",
    paymentMethod: "",
    totalExpense: "",
    expenseDetails: [],
  });

  // Function to handle dynamic field input change
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...expenseDetails];
    updatedFields[index][name] = value;
    setexpenseDetails(updatedFields);
    // Update validation errors if they exist
    const updatedErrors = [...errors.expenseDetails];
    if (value === "") {
      updatedErrors[index] = { ...updatedErrors[index], [name]: "This field is required." };
    } else {
      updatedErrors[index] = { ...updatedErrors[index], [name]: "" };
    }
    setErrors({ ...errors, expenseDetails: updatedErrors });
  };

  // Function to handle static input changes
  const handleFieldChange = (setter, fieldName) => (event) => {
    setter(event.target.value);

    // Clear the error if the field is valid
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: event.target.value === "" ? "This field is required." : "",
    }));
  };

  // Validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      date: "",
      payeeName: "",
      expenseType: "",
      contactNumber: "",
      paymentMethod: "",
      totalExpense: "",
      expenseDetails: [],
    };

    if (!date) {
      newErrors.date = "Date is required.";
      isValid = false;
    }
    if (!payeeName) {
      newErrors.payeeName = "Payee name is required.";
      isValid = false;
    }
    if (!expenseType) {
      newErrors.expenseType = "Expense type is required.";
      isValid = false;
    }
    if (!contactNumber) {
      newErrors.contactNumber = "Contact number is required.";
      isValid = false;
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = "Payment method is required.";
      isValid = false;
    }
    if (!totalExpense) {
      newErrors.totalExpense = "Total expense is required.";
      isValid = false;
    }

    expenseDetails.forEach((work, index) => {
      const workErrors = {};
      if (!work.description) {
        workErrors.description = "Description is required.";
        isValid = false;
      }
      if (!work.amount) {
        workErrors.amount = "Amount is required.";
        isValid = false;
      }
      newErrors.expenseDetails[index] = workErrors;
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle Save button click
  const handleSave = async () => {
    const formData = {
      date,
      payeeName,
      expenseType,
      contactNumber,
      paymentMethod,
      totalExpense,
      expenseDetails
    }
    console.log(formData)
    if (validateForm()) {
    try {
      setLoading(true)
      const data=await api.addExpense(formData);
      if(data.error){
        swal("Error!", data.errors[0], "error");
        return
      }
      // Show success message
      swal("Success!", "Expense added successfully!", "success");
      setAddExpenseModal(false); // Close the modal after saving
    } catch (err) {
      // Handle error (optional: show error message)
      console.error(err);
      swal("Error!", "Failed to add expense.", "error");
    } finally {
      setLoading(false)
    }
  } else {
    console.log("Form has errors.");
  }
  };

  // Function to add a new work description field
  const addField = () => {
    setexpenseDetails([
      ...expenseDetails,
      { description: "", amount: "", reference: "" },
    ]);
    setErrors({
      ...errors,
      expenseDetails: [...errors.expenseDetails, {}],
    });
  };

  // Function to remove a field
  const removeField = (index) => {
    const updatedFields = expenseDetails.filter((_, i) => i !== index);
    const updatedErrors = errors.expenseDetails.filter((_, i) => i !== index);
    setexpenseDetails(updatedFields);
    setErrors({ ...errors, expenseDetails: updatedErrors });
  };

  return (
    <>
    {loading && <LoadingSpinner/>}
      {/* Popup Modal */}
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>

        <div className="fixed inset-0 flex items-center justify-center z-30">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
            <h2 className="text-xl mb-4">Expense Entry</h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <label className="block">
                <span className="text-white">Date</span>
                <input
                  type="date"
                  value={date}
                  max={todayString}
                  onChange={handleFieldChange(setDate, "date")}
                  className="p-2 bg-gray-700 rounded w-full"
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
              </label>

              <label className="block">
                <span className="text-white">Payee Name</span>
                <input
                  type="text"
                  value={payeeName}
                  placeholder="Enter Payee Name"
                  onChange={handleFieldChange(setPayeeName, "payeeName")}
                  className="p-2 bg-gray-700 rounded w-full"
                />
                {errors.payeeName && <p className="text-red-500 text-sm">{errors.payeeName}</p>}
              </label>

              <label className="block">
                <span className="text-white">Expense Type</span>
                <input
                  type="text"
                  value={expenseType}
                  placeholder="Enter Expense type"
                  onChange={handleFieldChange(setExpenseType, "expenseType")}
                  className="p-2 bg-gray-700 rounded w-full"
                />
                {errors.expenseType && <p className="text-red-500 text-sm">{errors.expenseType}</p>}
              </label>

              <label className="block">
                <span className="text-white">Contact Number</span>
                <input
                  type="tel"
                  value={contactNumber}
                  placeholder="Enter ContactNumber"
                  onChange={handleFieldChange(setContactNumber, "contactNumber")}
                  className="p-2 bg-gray-700 rounded w-full"
                />
                {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
              </label>

              <label className="block">
                <span className="text-white">Payment Method</span>
                <select
                  value={paymentMethod}
                  onChange={handleFieldChange(setPaymentMethod, "paymentMethod")}
                  className="p-2 bg-gray-700 rounded w-full"
                >
                  <option value="">How did you pay?</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                </select>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
                )}
              </label>
            </div>

            {/* Work Description Table */}
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Expense Detail</th>
                  <th>Amount</th>
                  <th>Reference</th>
                  {expenseDetails.length > 1 && (
                    <th>Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {expenseDetails.map((work, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <label className="block">
                        <input
                          type="text"
                          name="description"
                          value={work.description}
                          onChange={(event) => handleInputChange(index, event)}
                          className="p-2 bg-gray-700 rounded w-full"
                          placeholder="Description"
                        />
                        {errors.expenseDetails[index]?.description && (
                          <p className="text-red-500 text-sm">
                            {errors.expenseDetails[index].description}
                          </p>
                        )}
                      </label>
                    </td>
                    <td>
                      <label className="block">
                        <input
                          type="number"
                          name="amount"
                          value={work.amount}
                          onChange={(event) => handleInputChange(index, event)}
                          className="p-2 bg-gray-700 rounded w-full"
                          placeholder="Amount"
                        />
                        {errors.expenseDetails[index]?.amount && (
                          <p className="text-red-500 text-sm">
                            {errors.expenseDetails[index].amount}
                          </p>
                        )}
                      </label>
                    </td>
                    <td>
                      <label className="block">
                        <input
                          type="text"
                          name="reference"
                          value={work.reference}
                          onChange={(event) => handleInputChange(index, event)}
                          className="p-2 bg-gray-700 rounded w-full"
                          placeholder="Reference"
                        />
                        {errors.expenseDetails[index]?.reference && (
                          <p className="text-red-500 text-sm">
                            {errors.expenseDetails[index].reference}
                          </p>
                        )}
                      </label>
                    </td>
                    <td>
                      {index != 0 && (
                        <button
                          className="text-red-500"
                          onClick={() => removeField(index)}
                        >
                          🗑
                        </button>
                      )}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={addField}
              className="bg-teal-500 text-white px-4 py-2 rounded mb-4"
            >
              + Add Field
            </button>

            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold">
                Total Amount: ₹ {totalExpense}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setAddExpenseModal(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button onClick={handleSave} className="bg-teal-500 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AddExpense;
