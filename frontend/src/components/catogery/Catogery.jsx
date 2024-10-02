import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function CatogeryBody() {
  const [categories, setCategories] = useState([]);
  const [addCategory , setAddCategory] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()=>{
    const fetchData = async()=>{
        try {
            const result = await api.getCatogory()
            if(!result.error){
              setCategories(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchData
  },[])



  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-[#23346c] p-10 text-gray-100 relative'>
      <div className='flex justify-end gap-4 items-center mb-8'>
        <button
          onClick={()=>setAddCategory(true)}
          className='bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-700'
        >
          Add Category
        </button>

        <input
          type='text'
          placeholder='Search Category...'
          className='px-4 py-2 rounded-md text-gray-700'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
