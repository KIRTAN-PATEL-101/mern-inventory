import React from 'react';
import 'boxicons/css/boxicons.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Header = () => {

   const [userName, setUserName] = useState('');

   useEffect(() => {
         axios
               .get(
                  `http://localhost:8000/users/details`
                  ,{ withCredentials: true}
               )
               .then((response) => {
                  const name = response.data.data.userName;
                  setUserName(name.toUpperCase());
               })
               .catch((error) => {
                  console.log(error);
               });
   }, [])

  return (
    <nav className="h-14 bg-gray-300 px-6 flex items-center gap-6 sticky top-0 z-10 justify-between" >
      {/* <i className='bx bx-menu cursor-pointer text-2xl'></i> */}
      <a href="#" className="nav-link text-lg text-gray-800"></a>
      <div className='text-xl text-bold text-center'>{`Welcome   ${userName}`} </div>
      {/*<form action="#" className="max-w-md w-full mr-auto">
         <div className="form-input flex items-center h-9">
          { <input type="search" placeholder="Search..." className="flex-grow px-4 h-full bg-gray-200 rounded-l-full text-gray-800 outline-none" />
          <button type="submit" className="w-9 h-full bg-blue-500 text-white rounded-r-full flex items-center justify-center">
            <i className='bx bx-search'></i>
          </button> }
        </div> }
      </form> */}
      <a href="#" className="profile">
        <img src="https://res.cloudinary.com/deyfwd4ge/image/upload/v1716897237/download_11_hldmcp.png" alt="profile" className="w-9 h-9 rounded-full object-cover" />
      </a>
    </nav>
  );
};

export default Header;