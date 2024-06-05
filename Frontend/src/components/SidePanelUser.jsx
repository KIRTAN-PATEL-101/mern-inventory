import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SidePanel = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: 'bx bxs-dashboard' },
    { path: '/items', name: 'All Items', icon: 'bx bxs-box' },
    { path: '/inventory', name: 'My Inventories', icon: 'bx bxs-store' },
    { path: '/login', name: 'Logout', icon: 'bx bxs-log-out-circle' }
  ];

  const onLogout = () => {
    axios.get('http://localhost:8000/users/logout', { withCredentials: true })
      .then((response) => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className={`fixed top-0 left-0 h-full bg-gray-100 z-50 transition-all overflow-hidden ${isOpen ? 'w-72' : 'w-0'} md:w-72`}>
      <div className="relative h-full">
        <NavLink to="/" className="brand flex items-center h-14 px-6 text-2xl font-bold text-blue-500 bg-white sticky top-0">
          <span className="text">Store Sync</span>
          <button onClick={toggle} className="md:hidden text-2xl text-gray-800 bg-white p-4 absolute top-0 right-0 mt-3 mr-3">
            <i className='bx bx-menu'></i>
          </button>
        </NavLink>
        <ul className={`side-menu mt-12 ${isOpen ? 'block' : 'hidden'} md:block`}>
          {menuItems.map((item, index) => (
            <li key={index} className="relative">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center h-12 px-4 text-lg ${
                    isActive ? 'text-gray-800 bg-gray-200' : 'text-gray-800 hover:bg-gray-100'
                  } rounded-r-full transition-all`
                }
                onClick={item.name === 'Logout' ? onLogout : null}
              >
                <i className={`${item.icon} flex-shrink-0 text-2xl`} aria-label={`${item.name} Icon`}></i>
                <span className="ml-4">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={`fixed inset-0 bg-black opacity-50 ${isOpen ? 'block' : 'hidden'} md:hidden`} onClick={toggle}></div>
    </div>
  );
};

export default SidePanel;
