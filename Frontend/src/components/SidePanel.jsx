
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SidePanel = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  const menuItems = [
    { path: '/superAdmin/dashboard', name: 'Dashboard', icon: 'bx bxs-dashboard' },
    { path: '/superAdmin/users', name: 'Users', icon: 'bx bxs-receipt' },
    { path: '/superAdmin/inventory', name: 'All Inventory', icon: 'bx bxs-store' },
    { path: '/superAdmin/geolocation', name: 'Geolocation', icon: 'bx bxs-map'},
    // Add more menu items as needed
    {path: '/payment', name: 'Payment', icon: 'bx bx-credit-card'},
    { path: '/login', name: 'Logout', icon: 'bx bxs-log-out-circle' }
  ];

  const onLogut = () => {
    axios.get('http://localhost:8000/superadmin/adminlogout', {withCredentials: true})
    .then((response) => {
      console.log(response);
      navigate("/login");
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="fixed top-0 left-0 w-72 h-full bg-gray-100 z-50 transition-all overflow-hidden scrollbar-hide">
      <NavLink to="/" className="brand flex pl-12 items-center h-14  text-2xl font-bold text-blue-500 bg-white sticky top-0">
        <span className="p-1 align-middle"><img src='https://res.cloudinary.com/dgvslio7u/image/upload/v1717155610/znded9snmozjlqh2ezha.svg' className="justify-center" style={{height: "100px", width: "100px"}}></img></span>
      </NavLink>
      <button onClick={toggle} className="md:hidden text-2xl text-gray-800 bg-white p-4 absolute top-0 right-0 mt-3 mr-3">
        <i class='bx bx-menu'></i>
      </button>
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
              onClick={item.name === 'Logout' ? onLogut : null}
            >
              <i className={`${item.icon} flex-shrink-0 text-2xl`} aria-label={`${item.name} Icon`}></i>
              <span className="ml-4">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidePanel;
