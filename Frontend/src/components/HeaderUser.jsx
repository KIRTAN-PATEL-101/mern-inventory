import React from 'react';
import 'boxicons/css/boxicons.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Header = () => {

  const [userName, setUserName] = useState('');
  const [profile, setProfile] = useState("");
  const [userData, setUserData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/users/details`
        , { withCredentials: true }
      )
      .then((response) => {
        const name = response.data.data.userName;
        setUserName(name.toUpperCase());
        const data = response.data.data;
        setProfile(data.Imageurl);
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <nav className="h-14 bg-gray-300 px-6 flex items-center gap-6 sticky top-0 z-10 justify-between" >
      {/* <i className='bx bx-menu cursor-pointer text-2xl'></i> */}
      <a href="#" className="nav-link text-lg text-gray-800"><i class='bx bx-menu'></i></a>
      <div className='text-xl text-bold text-center'>{`Welcome   ${userName}`} </div>
      {/*<form action="#" className="max-w-md w-full mr-auto">
         <div className="form-input flex items-center h-9">
          { <input type="search" placeholder="Search..." className="flex-grow px-4 h-full bg-gray-200 rounded-l-full text-gray-800 outline-none" />
          <button type="submit" className="w-9 h-full bg-blue-500 text-white rounded-r-full flex items-center justify-center">
            <i className='bx bx-search'></i>
          </button> }
        </div> }
      </form> */}
      <a href="#" className="profile" onClick={togglePopup}>
        <img src={profile} alt="profile" className="w-9 h-9 rounded-full object-cover" />
      </a>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={togglePopup}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
            <img
              src={profile}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />
            <div className="text-center">
              <p className="text-lg font-semibold">{userData.userName.toUpperCase()}</p>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-gray-600">{userData.mobileNo}</p>
              <p className="text-gray-600">{userData.role.toUpperCase()}</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;