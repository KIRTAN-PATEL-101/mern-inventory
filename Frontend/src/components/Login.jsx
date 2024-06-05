import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import axios from 'axios';
import {toast, ToastContainer, Bounce} from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:8000/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(formData),
                });

                // const response = await toast.promise(
                //     fetch('http://localhost:8000/users/login', {
                //         method: 'POST',
                //         headers: {
                //             'Content-Type': 'application/json',
                //         },
                //         credentials: 'include',
                //         body: JSON.stringify(formData),
                //     }),
                //     {
                //       pending: 'logging in... 🕒',
                //       success: 'Promise resolved 👌',
                //       error: 'Promise rejected 🤯'
                //     }
                // );
                // console.log(response)

                if (response.ok) {
                    const result = await response.json();
                    setMessage('Login successful!');
                    console.log(result.data.user);
                    if(result.data.user.role === 'admin'){
                        navigate("/superAdmin/dashboard");
                    }
                    else{
                        navigate("/dashboard");
                    }

                } else {
                    const errorResult = await response.json();
                    setMessage(`An error occurred: ${errorResult.message}`)
                }
            } catch (error) {
                setMessage(`An error occurred: ${error.message}`);
                toast(error.message , {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }
        } else {
            setErrors(newErrors);
            toast(JSON.stringify(newErrors) , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8000/users/details', { withCredentials: true })
        .then((response) => {
            const data = response.data;
            console.log(data);
            if(data.success){
                console.log(data.data.role);
                if(data.data.role === 'admin'){
                    navigate("/superAdmin/dashboard");
                }
                else{
                    navigate("/dashboard");
                }
            }
        
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <div className="flex w-full min-h-screen items-center justify-center" style={{ backgroundColor: "#f5f5f5", backgroundImage: `url(https://res.cloudinary.com/dnmxwrqvb/image/upload/v1716367992/lfrebmwhtyour2uctsuv.jpg)`, backgroundSize: "cover", backgroundPosition: 'center' }}>
            <div className="flex rounded-xl bg-black opacity-70" style={{ width: "900px", height: "500px", boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%),0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)" }}>
                <div className="flex flex-col items-center justify-center bg-white rounded-tl-xl rounded-bl-xl" style={{ flex: "2" }}>
                    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                        <div className=''>
                            <img 
                                height='177px'
                                width={'177px'}
                                src='https://res.cloudinary.com/dgvslio7u/image/upload/v1717157804/b15f2kqi7qi2hxx54e6i.png'
                                style={{opacity:'70'}}
                                />
                        </div>
                        <h1 className="text-4xl mt-0 m-5">Login to Your Account</h1>
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
                        <button type="submit" className="rounded-3xl font-bold text-sm text-white cursor-pointer" style={{ border: "none", outline: "none", padding: "12px 0", width: "180px", backgroundColor: "#3bb19b" }}>
                            Sign In
                        </button>
                        {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
                    </form>
                </div>
                <div className="flex flex-col items-center justify-center rounded-tr-lg rounded-br-lg" style={{ flex: 1, backgroundColor: "#3bb19b" }}>
                    <h1 className="mt-0 text-4xl self-center m-5" style={{ color: 'white' }}>New Here ?</h1>
                    <Link to="/register">
                        <button type="button" className="bg-white rounded-3xl font-bold text-sm cursor-pointer" style={{ border: "none", outline: "none", padding: "12px 0", width: "180px" }}>
                            Register
                        </button>
                    </Link>
                </div>
            </div>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
        </div>
    );
}

export default Login;
