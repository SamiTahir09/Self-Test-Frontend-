import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleButton = async (e) => {
        e.preventDefault();

        // Validation
        if (!name || !email || !password || !confirmpassword) {
            toast.error("All fields are required");
            return;
        }

        if (password !== confirmpassword) {
            toast.error("Password and Confirm Password do not match");
            return;
        }

        try {
            const userData = await axios.post(
                'https://localhost:4000/api/user/save',
                { name, email, password }
            );

            // Store token and username
            localStorage.setItem("token", userData.data.token);
            localStorage.setItem("username", userData.data.user.name);

            // Reset form
            setName("");
            setEmail("");
            setPassword("");
            setConfirmpassword("");

            // Navigate and success toast
            navigate("/products");
            toast.success("Signup Successful!");

        } catch (error) {
            console.error("Signup Error:", error.response?.data);
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className='flex flex-col justify-center items-center pt-10'>
            <h3 className='text-3xl text-blue-400'>SignUp Page</h3>
            <div className='mt-8'>
                <div className='border py-5 px-10 shadow-lg'>
                    <h1 className='text-2xl p-7 text-center'>Welcome to SignUp Page</h1>
                    <form className='flex flex-col gap-3' onSubmit={handleButton}>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            className='border p-1 rounded-sm'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label htmlFor="email">Enter Your Email</label>
                        <input
                            id="email"
                            type="email"
                            className='border p-1 rounded-sm'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="password">Password</label>
                        <div className='border p-1 rounded-sm flex items-center'>
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className='w-full outline-none'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="px-2"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className='border p-1 rounded-sm flex items-center'>
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                className='w-full outline-none'
                                value={confirmpassword}
                                onChange={(e) => setConfirmpassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="px-2"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            className='bg-blue-400 text-white p-2 rounded-md mt-5 w-full cursor-pointer'
                        >
                            SignUp
                        </button>

                        <p className='text-center mt-2'>
                            If you already have an account, <Link to="/login" className='text-blue-400'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
