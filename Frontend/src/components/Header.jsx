import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import axios from "axios";

const Header = () => {
  const [profile, setProfile] = useState("");
  const [userData, setUserData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/details", { withCredentials: true })
      .then((response) => {
        const data = response.data.data;
        setProfile(data.Imageurl);
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <nav className="h-14 bg-gray-300 px-6 flex items-center gap-6 sticky top-0 z-10 justify-between">
      <a href="#" className="nav-link text-lg text-gray-800"></a>
      <div className="text-xl font-bold text-center">SuperAdmin</div>
      <a href="#" className="profile" onClick={togglePopup}>
        <img
          src={profile}
          alt="profile"
          className="w-9 h-9 rounded-full object-cover"
        />
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
              <p className="text-lg font-semibold">{userData.userName}</p>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-gray-600">{userData.mobileNo}</p>
              <p className="text-gray-600">{userData.role}</p>
          </div>
            </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
