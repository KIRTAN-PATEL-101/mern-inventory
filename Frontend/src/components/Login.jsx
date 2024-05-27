import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const result = await response.json();
                    setMessage('Login successful!');
                    navigate("/dashboard");
                } else {
                    const errorResult = await response.json();
                    setMessage(`Login failed: ${errorResult.message}`);
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
            <div className="flex rounded-xl bg-black opacity-70" style={{ width: "900px", height: "500px", boxShadow: "0px 3px 3px -2px rgb(0 0 0 / 20%),0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)" }}>
                <div className="flex flex-col items-center justify-center bg-white rounded-tl-xl rounded-bl-xl" style={{ flex: "2" }}>
                    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
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
                    <Link to="/">
                        <button type="button" className="bg-white rounded-3xl font-bold text-sm cursor-pointer" style={{ border: "none", outline: "none", padding: "12px 0", width: "180px" }}>
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
