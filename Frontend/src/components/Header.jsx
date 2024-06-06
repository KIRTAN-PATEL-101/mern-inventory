import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import axios from "axios";

const Header = () => {
  const [profile, setProfile] = useState("");
  const [userData, setUserData] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [checked, setChecked] = useState(false);
  //const navigate = useNavigate();

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
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    role: '',
    mobileNo: '',
    profilepic: null,
  });
  const validate = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.mobileNo) newErrors.mobileNo = 'Contact number is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!/^\d+$/.test(formData.mobileNo)) newErrors.mobileNo = 'Contact number is invalid';
    //  if (!formData.profilepic) newErrors.profilepic = 'profilepic is required';
    return newErrors;
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilepic') {
      setFormData({
        ...formData,
        profilepic: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  const handleAddClick = () => {
    setShowForm(!showForm);
    //setShowRemoveOptions(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append('userName', formData.userName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('mobileNo', formData.mobileNo);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('profilepic', formData.profilepic);
      console.log(formDataToSend);
      try {
        const response = await fetch('http://localhost:8000/users/register', {  // Ensure the correct endpoint is used
          method: 'POST',
          body: formDataToSend,
        });

        if (response.ok) {
          console.log(response);
          const result = await response.json();
          setMessage('Registration successful!');
          setShowForm(!showForm)
          //navigate("/login");
        } else {
          console.log(response);
          const errorResult = await response.json();
          setMessage(`Registration failed: ${errorResult.message}`);
        }
      } catch (error) {
        console.log(error);
        setMessage(`An error occurred: ${error.message}`);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <nav className="h-14 bg-gray-300 px-6 flex items-center gap-6 sticky top-0 z-10 justify-between">
      <a href="#" className="nav-link text-lg text-gray-800"></a>
      <div className="text-xl font-bold text-center right-0">SuperAdmin</div>

      <a  className="profile" onClick={togglePopup}>
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
              <p className="text-lg font-semibold">{userData.userName.toUpperCase()}</p>
              <p className="text-gray-600">{userData.email}</p>
              <p className="text-gray-600">{userData.mobileNo}</p>
              <p className="text-gray-600">{userData.role}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                onClick={handleAddClick}
              >
                Add User
              </button>
              {showForm && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                  <div className="relative bg-gray-100 p-5 rounded shadow-lg w-full max-w-lg max-h-screen overflow-auto">
                    <button onClick={() => setShowForm(false)} className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <form className="flex flex-col items-center rounded-r-2xl" onSubmit={handleSubmit}>
                      <h1 className="text-4xl mt-0 m-5">Create Account</h1>

                      <input
                        type="text"
                        placeholder="Name"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        className="outline-none border-0 p-4 rounded-xl m-1.5 text-sm"
                        style={{ width: "370px", backgroundColor: "#edf5f3" }}
                      />
                      {errors.userName && <p style={{ color: 'red' }}>{errors.userName}</p>}
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="outline-none border-0 p-4 rounded-xl m-1.5 text-sm"
                        style={{ width: "370px", backgroundColor: "#edf5f3" }}
                      />
                      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="outline-none border-0 p-4 rounded-xl m-1.5 text-sm"
                        style={{ width: "370px", backgroundColor: "#edf5f3" }}
                      />
                      {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                      <div className="mb-4">
                        <label className="block mb-2">Role</label>
                        <div className="flex justify-center items-center">
                          <label className="mr-4">
                            <input
                              type="radio"
                              name="role"
                              value="admin"
                              checked={formData.role === "admin"}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            Admin
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="role"
                              value="user"
                              checked={formData.role === "user"}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            User
                          </label>
                        </div>
                      </div>
                      {errors.role && <p style={{ color: 'red' }}>{errors.role}</p>}
                      <input
                        type="text"
                        placeholder="Contact No."
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        required
                        className="outline-none border-0 p-4 rounded-xl m-1.5 text-sm"
                        style={{ width: "370px", backgroundColor: "#edf5f3" }}
                      />
                      {errors.mobileNo && <p style={{ color: 'red' }}>{errors.mobileNo}</p>}
                      <label>Upload Your Profile Pic</label>
                      <input
                        type="file"
                        name="profilepic"
                        required
                        onChange={handleChange}
                        className="outline-none border-0 p-4 rounded-xl m-1.5 text-sm"
                        style={{ width: "370px", backgroundColor: "#edf5f3" }}
                      />
                      {/* {errors.profilepic && <p style={{ color: 'red' }}>{errors.profilepic}</p>} */}
                      <button type="submit" className="bg-[#3bb19b] rounded-3xl text-white font-bold text-sm cursor-pointer" style={{ border: "none", outline: "none", padding: "12px 0", width: "180px" }}>
                        Register
                      </button>
                      {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;