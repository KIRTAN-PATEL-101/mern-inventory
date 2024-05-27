import React, { useState } from 'react';
import { Link} from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        mobileNo: '',
        profilepic: null,
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!formData.userName) newErrors.userName = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.mobileNo) newErrors.mobileNo = 'Contact number is required';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            const formDataToSend = new FormData();
            formDataToSend.append('userName', formData.userName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('mobileNo', formData.mobileNo);
            formDataToSend.append('profilepic', formData.profilepic);

            try {
                const response = await fetch('http://localhost:8000/users/register', {  // Ensure the correct endpoint is used
                    method: 'POST',
                    body: formDataToSend,
                });

                if (response.ok) {
                    const result = await response.json();
                    setMessage('Registration successful!');
                } else {
                    const errorResult = await response.json();
                    setMessage(`Registration failed: ${errorResult.message}`);
                }
            } catch (error) {
                setMessage(`An error occurred: ${error.message}`);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex w-full min-h-screen items-center justify-center" style={{ backgroundColor: "#f5f5f5", backgroundImage: `url(https://res.cloudinary.com/dnmxwrqvb/image/upload/v1716367992/lfrebmwhtyour2uctsuv.jpg)`, backgroundSize: "cover", backgroundPosition: 'center' }}>
            <div className="flex rounded-xl bg-black opacity-75" style={{ width: "900px", height: "500px", boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%),0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)" }}>
                <div className="flex flex-col items-center justify-center bg-[#3bb19b] rounded-tl-xl rounded-bl-xl" style={{ flex: "1" }}>
                    <h1 className="mt-0 text-4xl self-center m-5" style={{ color: 'white' }}>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className="bg-white rounded-3xl font-bold text-sm cursor-pointer" style={{ border: "none", outline: "none", padding: "12px 0", width: "180px" }}>
                            Sign In
                        </button>
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center rounded-tr-xl rounded-br-xl" style={{ backgroundColor: "white", flex: "2" }}>
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
                        <label >Upload Your Profile Pic</label>
                        <input
                            type="file"
                            placeholder="Contact No."
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
        </div>
    );
}

export default Register;