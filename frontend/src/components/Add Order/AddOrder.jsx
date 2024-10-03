import React, { useState } from "react";
import api from "../../services/api";
import swal from 'sweetalert';
import LoadingSpinner from "../spinner/Spinner";

const AddOrder = ({ setAddOrderModal }) => {
  // State to handle the dynamic fields for orderDetails
  const [orderDetails, setOrderDetails] = useState([{ item: "", quantity: "", total: "" }]);

  // State for other fields
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Format to YYYY-MM-DD
  const [loading, setLoading] = useState(false);

  // Error state for validation messages
  const [errors, setErrors] = useState({ orderDetailsErrors: [] });

  // Function to handle input change for dynamic fields
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...orderDetails];
    updatedFields[index][name] = value;
    setOrderDetails(updatedFields);
  };

  // Function to add a new orderDetails field
  const addField = () => {
    setOrderDetails([...orderDetails, { item: "", quantity: "", total: "" }]);
    setErrors({ ...errors, orderDetailsErrors: [...errors.orderDetailsErrors, {}] });
  };

  // Function to remove a field
  const removeField = (index) => {
    const updatedFields = orderDetails.filter((_, i) => i !== index);
    const updatedErrors = errors.orderDetailsErrors.filter((_, i) => i !== index);
    setOrderDetails(updatedFields);
    setErrors({ ...errors, orderDetailsErrors: updatedErrors });
  };

  // Function to calculate the total amount
  const calculateTotal = () => {
    return orderDetails.reduce((total, detail) => {
      const itemTotal = parseFloat(detail.total) || 0;
      return total + itemTotal;
    }, 0);
  };

  // Function to handle form validation
  const validate = () => {
    let tempErrors = {
      date: "",
      orderDetailsErrors: [...orderDetails.map(() => ({ item: "", quantity: "", total: "" }))]
    };

    let isValid = true;

    if (!date) {
      tempErrors.date = "Date is required.";
      isValid = false;
    }

    orderDetails.forEach((detail, index) => {
      if (!detail.item) {
        tempErrors.orderDetailsErrors[index].item = "Item is required.";
        isValid = false;
      }
      if (!detail.quantity) {
        tempErrors.orderDetailsErrors[index].quantity = "Quantity is required.";
        isValid = false;
      }
      if (!detail.total) {
        tempErrors.orderDetailsErrors[index].total = "Total is required.";
        isValid = false;
      }
    });

    setErrors(tempErrors);
    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const formData = {
      date,
      totalAmount: calculateTotal(),
      orderDetails,
    };
    try {
      const result = await api.addOrder(formData);
      if (result.error) {
        swal("Error!", result.errors[0], "error");
        return;
      }
      swal("Success!", "Order added successfully!", "success");
      setAddOrderModal(false); // Close the modal after saving
    } catch (err) {
      console.error(err);
      swal("Error!", "Failed to add order.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>

      {/* Popup Form */}
      <div className="fixed inset-0 flex items-center justify-center z-30">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
          <h2 className="text-xl mb-4">Order Entry</h2>

          {/* Date Input */}
          <label className="block mb-4">
            <span className="text-white">Order Date</span>
            <input
              type="date"
              className="p-2 bg-gray-700 rounded w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <p className="text-red-500">{errors.date}</p>}
          </label>

          {/* Order Details Table */}
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Total</th>
                {orderDetails.length > 1 && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      name="item"
                      value={detail.item}
                      onChange={(event) => handleInputChange(index, event)}
                      className="p-2 bg-gray-700 rounded w-full"
                      placeholder="Item description"
                    />
                    {errors.orderDetailsErrors[index]?.item && (
                      <p className="text-red-500">{errors.orderDetailsErrors[index].item}</p>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={detail.quantity}
                      onChange={(event) => handleInputChange(index, event)}
                      className="p-2 bg-gray-700 rounded w-full"
                      placeholder="Quantity"
                    />
                    {errors.orderDetailsErrors[index]?.quantity && (
                      <p className="text-red-500">{errors.orderDetailsErrors[index].quantity}</p>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      name="total"
                      value={detail.total}
                      onChange={(event) => handleInputChange(index, event)}
                      className="p-2 bg-gray-700 rounded w-full"
                      placeholder="Total amount"
                    />
                    {errors.orderDetailsErrors[index]?.total && (
                      <p className="text-red-500">{errors.orderDetailsErrors[index].total}</p>
                    )}
                  </td>
                  {orderDetails.length > 1 && (
                    <td>
                      <button
                        onClick={() => removeField(index)}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total calculation */}
          <p className="mb-4">Total Amount: ₹{calculateTotal()}</p>

          {/* Action buttons */}
          <div className="flex justify-between">
            <button onClick={addField} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
              Add Item
            </button>
            <div>
              <button
                onClick={() => setAddOrderModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOrder;
