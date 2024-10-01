import React, { useEffect, useState } from "react";
import AddCustomer from "../Add Customer/AddCustomer"; // Adjust the path according to your file structure
import History from "../History/History";
import PaymentModal from "../Pay Modal/PaymentModal"; // Import the Payment Modal
import CreditForm from "../Credit Form/CreditForm";
import api from "../../services/api";
import searchIcon from "../../assets/searchIcon.svg";
import addCustomerIcon from "../../assets/addCustomerIcon.svg";
import MoreModal from "../moreModal/moreModal";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";

const CustomerData = () => {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreditForm, setShowCreditForm] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [moreModal, setMoreModal] = useState(false);
  const [selectedVehicleNumbers, setSelectedVehicleNumbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for table data

  const customersPerPage = 10; // Number of customers per page

  const handleMoreClick = (vehicleNumbers) => {
    console.log("clicked");
    setSelectedVehicleNumbers(vehicleNumbers);
    setMoreModal(true);
  };

  useEffect(() => {
    // Check if all the modal states are false before fetching customers
    if (!showAddCustomerModal && !showPaymentModal && !showCreditForm) {
      const fetchCustomers = async () => {
        try {
          setIsLoading(true); // Set loading to true before fetching data
          const response = await api.showCustomers();
          setCustomers(response.data);
          console.log("Customer history", response.data);
        } catch (error) {
          console.error("Error fetching income history data", error);
        } finally {
          setIsLoading(false); // Set loading to false after fetching data
        }
      };
      fetchCustomers();
    }
  }, [showAddCustomerModal, showPaymentModal, showCreditForm]); // Dependencies

  const calculateDueAmount = (creditAmount, paidAmount) => {
    return creditAmount - paidAmount;
  };

  const handleViewClick = (customer) => {
    setSelectedCustomer(customer);
    setShowHistory(true);
  };

  const closeHistoryModal = () => {
    setShowHistory(false);
    setSelectedCustomer(null);
  };

  const handlePayClick = (customer) => {
    setSelectedCustomer(customer);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedCustomer(null);
  };

  const handleCreditClick = (customer) => {
    setSelectedCustomer(customer);
    setShowCreditForm(true);
  };

  const closeCreditForm = () => {
    setShowCreditForm(false);
    setSelectedCustomer(null);
  };

  const handleCloseModal = () => {
    setMoreModal(false);
  };

  const totalPages = Math.ceil(customers.length / customersPerPage);

  const filteredCustomers = customers.filter((customer) => {
    const customerName = customer.customerName.toLowerCase();
    const phoneNumber = customer.phoneNumber
      ? String(customer.phoneNumber)
      : "";

    return (
      customerName.includes(searchTerm.toLowerCase()) ||
      phoneNumber.includes(searchTerm)
    );
  });

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  return (
    <>
      <div className="bg-gray-900 min-h-screen p-10">
        <div className="container p-6 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-teal-400">Customer Data</h1>

            <div className="flex items-center space-x-4">
              <div className="bg-[#00BDD6] bg-opacity-10 px-2 border border-[#00BDD6] rounded-lg">
                <div className="flex flex-row">
                  <img src={searchIcon} alt="" />
                  <input
                    type="text"
                    placeholder="Search customer..."
                    className="w-64 h-10 px-3 rounded bg-transparent text-white outline-none"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="flex flex-row bg-[#00A1B7] text-white font-semibold gap-1 px-4 py-2 rounded-md"
                onClick={() => setShowAddCustomerModal(true)}
              >
                <img src={addCustomerIcon} alt="" />
                New Customer
              </button>
            </div>
          </div>

          <div className="overflow-x-auto p-2">
            <table className="table-auto w-full text-left text-gray-300">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Vehicle number</th>
                  <th className="px-4 py-2">Phone number</th>
                  <th className="px-4 py-2">Credit amount</th>
                  <th className="px-4 py-2">Paid amount</th>
                  <th className="px-4 py-2">Due amount</th>
                  <th className="px-4 py-2">Credit / Repayment</th>
                  <th className="px-4 py-2">History</th>
                </tr>
              </thead>
              <tbody className="bg-gray-700">
                {isLoading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-6">
                      <SpinnerOnly /> {/* Spinner inside the table */}
                    </td>
                  </tr>
                ) : (
                  paginatedCustomers.map((customer, index) => (
                    <tr key={index} className="border-t border-gray-600">
                      <td className="px-4 py-2">
                        {new Date(customer.dateOfService).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td className="px-4 py-2">{customer.customerName}</td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <p>{customer.vehicleNumber[0]}</p>
                          <p>
                            {customer.vehicleNumber.length > 1 && (
                              <p
                                className="text-blue-600 cursor-pointer"
                                onClick={() =>
                                  handleMoreClick(customer.vehicleNumber)
                                }
                              >
                                more
                              </p>
                            )}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-2">{customer.phoneNumber}</td>
                      <td className="px-4 py-2">₹{customer.creditAmount}</td>
                      <td className="px-4 py-2">₹{customer.paidAmount}</td>
                      <td className="px-4 py-2">
                        ₹
                        {calculateDueAmount(
                          customer.creditAmount,
                          customer.paidAmount
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-md"
                          onClick={() => handleCreditClick(customer)}
                        >
                          Credit
                        </button>
                        <button
                          className="bg-teal-400 text-gray-900 px-4 py-1 rounded-md ml-2"
                          onClick={() => handlePayClick(customer)}
                        >
                          Pay
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-gray-600 text-gray-300 px-4 py-1 rounded-md"
                          onClick={() => handleViewClick(customer)}
                        >
                          See history
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                {filteredCustomers.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan="9" className="text-center pt-6 font-medium">
                      No Credit Customers...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center my-4">
            {filteredCustomers.length > 0 && !isLoading && (
              <>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="bg-[#00A1B7] text-white font-semibold px-4 py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="bg-[#00A1B7] text-white font-semibold px-4 py-2 rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>

        {/* Modals */}
        {showAddCustomerModal && (
          <AddCustomer onClose={() => setShowAddCustomerModal(false)} />
        )}
        {showHistory && (
          <History customer={selectedCustomer} onClose={closeHistoryModal} />
        )}
        {showPaymentModal && (
          <PaymentModal
            customer={selectedCustomer}
            onClose={closePaymentModal}
          />
        )}
        {showCreditForm && (
          <CreditForm customer={selectedCustomer} onClose={closeCreditForm} />
        )}
        {moreModal && (
          <MoreModal
            onClose={handleCloseModal}
            vehicleNumbers={selectedVehicleNumbers}
          />
        )}
      </div>
    </>
  );
};

export default CustomerData;
