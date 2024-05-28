import React from 'react';
import 'boxicons/css/boxicons.min.css';
import { NavLink } from 'react-router-dom';


const SidePanel = () => {
  return (
    <div>
      <section id="sidebar" className="fixed top-0 left-0 w-72 h-full bg-gray-100 z-50 transition-all overflow-hidden scrollbar-hide">
        <NavLink to="/" className="brand flex items-center h-14 px-6 text-2xl font-bold text-blue-500 bg-white sticky top-0">
          <span className="text">Store Sync</span>
        </NavLink>
        <ul className="side-menu mt-12">
          <li className="relative">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `flex items-center h-12 px-4 text-lg ${isActive ? 'text-gray-800 bg-gray-200' : 'text-gray-800'} rounded-r-full transition-all`}
            >
              <i className='bx bxs-dashboard flex-shrink-0 text-2xl' aria-label="Dashboard Icon"></i>
              <span className="ml-4">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/items"
              className={({ isActive }) => `flex items-center h-12 px-4 text-lg ${isActive ? 'text-gray-800 bg-gray-200' : 'text-gray-800 hover:bg-gray-100'} rounded-r-full transition-all`}
            >
              <i className='bx bxs-receipt flex-shrink-0 text-2xl' aria-label="Items Icon"></i>
              <span className="ml-4">Items</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mystore"
              className={({ isActive }) => `flex items-center h-12 px-4 text-lg ${isActive ? 'text-gray-800 bg-gray-200' : 'text-gray-800 hover:bg-gray-100'} rounded-r-full transition-all`}
            >
              <i className='bx bxs-receipt flex-shrink-0 text-2xl' aria-label="Items Icon"></i>
              <span className="ml-4">My Store</span>
            </NavLink>
          </li>
          {/* <li>
          <NavLink
              to="/settings"
              className={({ isActive }) => `flex items-center h-12 px-4 text-lg ${isActive ? 'text-gray-800 bg-gray-200' : 'text-gray-800 hover:bg-gray-100'} rounded-r-full transition-all`}
            >
              <i className='bx bxs-receipt flex-shrink-0 text-2xl' aria-label="Items Icon"></i>
              <span className="ml-4">Settings</span>
            </NavLink>

        </li> */}
          <li>
            <NavLink to="/login" className="flex items-center h-12 px-4 text-lg text-red-500 hover:bg-gray-100 rounded-r-full transition-all">
              <i className='bx bxs-log-out-circle flex-shrink-0 text-2xl'></i>
              <span className="ml-4">Logout</span>
            </NavLink>

          </li>
        </ul>
      </section>
    </div>

  );
};
export default SidePanel;
