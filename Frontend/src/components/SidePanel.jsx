import React from 'react';
import 'boxicons/css/boxicons.min.css';
import { Link } from 'react-router-dom';


const SidePanel = () => {
  return (
    <div>
      <section id="sidebar" className="fixed top-0 left-0 w-72 h-full bg-gray-100 z-50 transition-all overflow-hidden scrollbar-hide">
      <a href="#" className="brand flex items-center h-14 px-6 text-2xl font-bold text-blue-500 bg-white sticky top-0">
        <span className="text">Store Sync</span>
      </a>
      <ul className="side-menu mt-12">
        <li className="active relative">
            
          <Link to="/" className="flex items-center h-12 px-4 text-lg text-gray-800 bg-gray-200 rounded-r-full transition-all">
            <i className='bx bxs-dashboard flex-shrink-0 text-2xl'></i>
            <span className="ml-4">Dashboard</span>
          </Link>

        </li>
        <li>
          <Link to="/items" className="flex items-center h-12 px-4 text-lg text-gray-800 hover:bg-gray-100 rounded-r-full transition-all">
            <i className='bx bxs-receipt flex-shrink-0 text-2xl'></i>
            <span className="ml-4">Items</span>

          </Link>


        </li>
        <li>
          <Link to="/mystore" className="flex items-center h-12 px-4 text-lg text-gray-800 hover:bg-gray-100 rounded-r-full transition-all">
            <i className='bx bxs-shopping-bag-alt flex-shrink-0 text-2xl'></i>
            <span className="ml-4">My Store</span>
          </Link>

        </li>
        {/* <li>
          <Link to="/settings" className="flex items-center h-12 px-4 text-lg text-gray-800 hover:bg-gray-100 rounded-r-full transition-all">
            <i className='bx bxs-cog flex-shrink-0 text-2xl'></i>
            <span className="ml-4">Settings</span>
          </Link>

        </li> */}
        <li>
          <Link to="/login" className="flex items-center h-12 px-4 text-lg text-red-500 hover:bg-gray-100 rounded-r-full transition-all">
            <i className='bx bxs-log-out-circle flex-shrink-0 text-2xl'></i>
            <span className="ml-4">Logout</span>
          </Link>

        </li>
      </ul>
    </section>
    </div>

  );
};
export default SidePanel;
