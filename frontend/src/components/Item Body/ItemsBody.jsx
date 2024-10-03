import React, { useEffect, useState } from "react";
import api from "../../services/api";
import searchIcon from "../../assets/searchIcon.svg";
// import addCustomerIcon from "../../assets/addCustomerIcon.svg";
import SpinnerOnly from "../spinnerOnly/SpinnerOnly";
import AddItem from "../Add items/AddItem";

const ItemsBody = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        const response = await api.getItems();
        setItems(response.data);
        console.log("Fetched items", response.data);
      } catch (error) {
        console.error("Error fetching items", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    fetchItems();
  }, [showAddItem]); // Dependencies

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const filteredItems = items.filter((item) => {
    const itemName = item.name.toLowerCase();
    const category = item.category ? item.category.toLowerCase() : "";

    return (
      itemName.includes(searchTerm.toLowerCase()) ||
      category.includes(searchTerm.toLowerCase())
    );
  });

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
                onClick={() => setShowAddItem(true)}
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
                ) : paginatedItems.length > 0 ? (
                  paginatedItems.map((item, index) => (
                    <tr key={index} className="border-t border-gray-600">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.category}</td>
                      <td className="px-4 py-2">${item.price}</td>
                    </tr>
                  ))
                ) : (
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
            {filteredItems.length > 0 && !isLoading && (
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
        {showAddItem && <AddItem setAddItemModal={setShowAddItem} />}
      </div>
    </>
  );
};

export default ItemsBody;
