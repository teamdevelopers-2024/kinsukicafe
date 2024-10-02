import React, { useEffect, useState } from "react";
import api from "../../services/api";
import searchIcon from "../../assets/searchIcon.svg";
// import addCustomerIcon from "../../assets/addCustomerIcon.svg";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";

const ItemsBody = () => {
  const [showAddItem, setshowAddItem] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [isLoading, setIsLoading] = useState(false); 

  const customersPerPage = 10; // Number of customers per page

  const handleMoreClick = (vehicleNumbers) => {
    console.log("clicked");
    setSelectedVehicleNumbers(vehicleNumbers);
    setMoreModal(true);
  };

  useEffect(() => {
    // Check if all the modal states are false before fetching customers
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
      fetchCustomers();
    }
  }, []); // Dependencies

  const calculateDueAmount = (creditAmount, paidAmount) => {
    return creditAmount - paidAmount;
  };

  const handleCreditClick = (customer) => {
    setSelectedCustomer(customer);
    setShowCreditForm(true);
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
      <div className="bg-[#23346c] min-h-screen p-10">
        <div className="container p-6 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-teal-400">Items</h1>

            <div className="flex items-center space-x-4">
              <div className="bg-[#00BDD6] bg-opacity-10 px-2 border border-[#00BDD6] rounded-lg">
                <div className="flex flex-row">
                  <img src={searchIcon} alt="" />
                  <input
                    type="text"
                    placeholder="Search item..."
                    className="w-64 h-10 px-3 rounded bg-transparent text-white outline-none"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="flex flex-row bg-[#00A1B7] text-white font-semibold gap-1 px-4 py-2 rounded-md"
                onClick={() => setshowAddItem(true)}
              >
                {/* <img src={addCustomerIcon} alt="" /> */}
                Add Item
              </button>
            </div>
          </div>

          <div className="overflow-x-auto p-2">
            <table className="table-auto w-full text-left text-gray-300">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Price</th>
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
                    <tr className="border-t border-gray-600">
                      <td className="px-4 py-2">juice</td>
                      <td className="px-4 py-2">shake</td>
                      <td className="px-4 py-2">$600</td>
                     
                    </tr>
                
                )}
                {filteredCustomers.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan="9" className="text-center pt-6 font-medium">
                      No Items...
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
        {showAddItem && (
          <AddCustomer onClose={() => setshowAddItem(false)} />
        )}

      </div>
    </>
  );
};

export default ItemsBody;