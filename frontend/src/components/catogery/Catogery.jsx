import React, { useState } from 'react';

function CatogeryBody() {
  // State to hold categories and total items
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  // Function to add a new category (mock data for now)
  const handleAddCategory = () => {
    const newCategory = {
      name: `Category ${categories.length + 1}`, // Dynamically generate category name
      totalItems: Math.floor(Math.random() * 100), // Random total items (for example purposes)
    };
    setCategories([...categories, newCategory]);
  };

  // Handle search filtering
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-[#23346c] p-10 text-gray-100 relative'>
      {/* Add Category and Search Bar Section */}
      <div className='flex justify-end gap-4 items-center mb-8'>
        {/* Button to Add New Category */}
        <button
          onClick={handleAddCategory}
          className='bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-700'
        >
          Add Category
        </button>

        {/* Search Input */}
        <input
          type='text'
          placeholder='Search Category...'
          className='px-4 py-2 rounded-md text-gray-700'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Responsive Table */}
      <div className='overflow-x-auto'>
        <table className='table-auto w-full text-left'>
          <thead>
            <tr className='bg-gray-700'>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2'>Category Name</th>
              <th className='px-4 py-2'>Total Items</th>
              <th className='px-4 py-2'>View</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((cat, index) => (
              <tr key={index} className='border-b border-gray-600'>
                <td className='px-4 py-2'>{index + 1}</td>
                <td className='px-4 py-2'>{cat.name}</td>
                <td className='px-4 py-2'>{cat.totalItems}</td>
                <td className='px-4 py-2'>
                  <button className='bg-green-500 px-3 py-1 rounded-md text-white hover:bg-green-700'>
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan='4' className='text-center py-4'>
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CatogeryBody;
