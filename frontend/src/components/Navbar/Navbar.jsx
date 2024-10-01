import React from 'react';
import Logo from "../../assets/logo - 1.jpg";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import logoutIcon from '../../assets/logoutIcon.png';
import incomeIcon from '../../assets/IncomeIcon.svg';
const Navbar = ({ setAddIncomeModal, setAddExpenseModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth()

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/')
  }

  // Extracting the last segment of the pathname
  const pathSegment = location.pathname.split("/").filter(Boolean).pop();

  return (
    <nav className="bg-[#23346c] p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center ml-20">
          <img
            src={Logo}
            alt="Logo"
            className="h-12 w-28"
          />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-gray-300">
          <li>
            <a
              onClick={() => navigate('/home')}
              className={`cursor-pointer ${pathSegment == 'home' ? 'text-[#ffeda5] font-semibold border-b-2 border-[#ffeda5]' : 'hover:text-white'}`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate('/expense')}
              className={`${pathSegment === 'expense' ? 'text-[#ffeda5] font-semibold border-b-2 border-[#ffeda5]' : 'hover:text-white'} cursor-pointer`}
            >
              Expenses
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate('/order')}
              className={`${pathSegment === 'order' ? 'text-[#ffeda5] font-semibold border-b-2 border-[#ffeda5]' : 'hover:text-white'} cursor-pointer`}
            >
              Order
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate('/items')}
              className={`${pathSegment === 'items' ? 'text-[#ffeda5] font-semibold border-b-2 border-[#ffeda5]' : 'hover:text-white'} cursor-pointer`}
            >
              Items
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate('/category')}
              className={`${pathSegment === 'category' ? 'text-[#ffeda5] font-semibold border-b-2 border-[#ffeda5]' : 'hover:text-white'} cursor-pointer`}
            >
              Category
            </a>
          </li>
        </ul>

        {/* Icons and Add Income Button Placeholder */}
        <div className="flex items-center space-x-4">
          {/* Add Income Button or Invisible Placeholder */}
          {/* Add Expense Button or Invisible Placeholder */}
          <div className="flex items-center">
            {pathSegment === 'income' && (
              <button onClick={() => setAddIncomeModal(true)} className="cursor-pointer border border-[#ffeda5] bg-[#23346c] text-[#ffeda5] font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-[#00144c] hover:bg-opacity-30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 flex gap-2">
                <img src={incomeIcon} alt="" />
                Add Income
              </button>
            )}
            {pathSegment === 'expense' && (
              <button onClick={() => setAddExpenseModal(true)} className="cursor-pointer border border-[#ffeda5] bg-[#23346c] text-[#ffeda5] font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-[#00144c] hover:bg-opacity-30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 flex gap-2">
                <img src={incomeIcon} alt="" />
                Add Expense
              </button>
            )}
            {pathSegment !== 'expense' && pathSegment !== 'income' && (
              <button onClick={() => setAddExpenseModal(true)} className="invisible bg-red-600 text-white px-4 py-2 rounded flex gap-2">
                <img src={incomeIcon} alt="" />
                Add Expense
              </button>
            )}
          </div>

          {/* Icons */}
          <button
            className="cursor-pointer border border-cyan-600 bg-[#00A1B7] bg-opacity-20 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-cyan-500 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-50 flex gap-2"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="" />
            Logout
          </button>

          <img
            src="https://via.placeholder.com/150" // Replace with profile image URL
            alt="Profile"
            className="h-8 w-8 cursor-pointer rounded-full"
          />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-gray-300 hover:text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <ul className="md:hidden mt-4 space-y-2 text-gray-300">
        <li>
          <a href="#" className="text-red-600 font-semibold">Home</a>
        </li>
        <li>
          <a href="#" className="hover:text-white">Expenses</a>
        </li>
        <li>
          <a href="#" className="hover:text-white">Income</a>
        </li>
        <li>
          <a href="#" className="hover:text-white">Credit Customers</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
