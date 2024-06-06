import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

                if (response.ok) {
                    const result = await response.json();
                    setMessage('Login successful!');
                    toast.success('Login successful!', {
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
                    console.log(result.data.user);
                    if(result.data.user.role === 'admin'){
                        navigate("/superAdmin/dashboard");
                    } else {
                        navigate("/dashboard");
                    }
                } else {
                    const errorResult = await response.json();
                    setMessage(`An error occurred: ${errorResult.message}`);
                    toast.error(`${errorResult.message}`, {
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
            } catch (error) {
                setMessage(`An error occurred: ${error.message}`);
                toast.error(`An error occurred: ${error.message}`, {
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
            toast.error(JSON.stringify(newErrors), {
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
        setTimeout(() => {
            axios.get('http://localhost:8000/users/details', { withCredentials: true })
            .then((response) => {
                const data = response.data;
                console.log(data);
                if(data.success){
                    console.log(data.data.role);
                    if(data.data.role === 'admin'){
                        navigate("/superAdmin/dashboard");
                    } else {
                        navigate("/dashboard");
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }, 1500);
    }, [navigate]);

    return (
        <div className="flex w-full min-h-screen items-center justify-center bg-cover bg-center" style={{ backgroundColor: "#f5f5f5", backgroundImage: `url(https://res.cloudinary.com/dnmxwrqvb/image/upload/v1716367992/lfrebmwhtyour2uctsuv.jpg)` }}>
            <div className="flex flex-col md:flex-row bg-black rounded-xl shadow-lg w-full md:w-3/4 lg:w-2/3 opacity-70">
                <div className="flex flex-col items-center justify-center bg-white p-8 md:w-2/3 w-full">
                    <form className="flex flex-col items-center " onSubmit={handleSubmit}>
                        <div className=''>
                            <img 
                                height='177px'
                                width={'177px'}
                                src='https://res.cloudinary.com/dgvslio7u/image/upload/v1717157804/b15f2kqi7qi2hxx54e6i.png'
                                style={{opacity:'70'}}
                            />
                        </div>
                        <h1 className="text-2xl md:text-4xl mt-4 md:mt-0 mb-5">Login to Your Account</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="outline-none border-0 p-4 rounded-xl m-1.5 text-sm w-full md:w-96 bg-gray-100"
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="outline-none border-0 p-4 rounded-xl m-1.5 text-sm w-full md:w-96 bg-gray-100"
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                        <button type="submit" className="mt-4 rounded-3xl font-bold text-sm text-white cursor-pointe py-3 px-6 w-48" style={{background:'#3bb19b'}}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className="flex flex-col items-center justify-center p-8 md:w-1/3 w-full" style={{background:'#3bb19b'}}>
                    <h1 className="text-2xl md:text-4xl text-white mb-5">New Here ?</h1>
                    <Link to="/register">
                        <button type="button" className="bg-white rounded-3xl font-bold text-sm cursor-pointer py-3 px-6 w-48">
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
