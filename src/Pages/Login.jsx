import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `https://self-test-backend-m1ok.vercel.app/api/user/save`,
                { name, email, }
            );


            console.log("Login Success:", res.data);


            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.user.name);


            setEmail("");
            setPassword("");

            navigate("/products");
            toast.success("Login Successful!");

        } catch (error) {
            console.error("Login Error:", error.response?.data);
            toast.error(error.response?.data?.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center pt-10'>
            <h3 className='text-3xl text-blue-400'>Login Page</h3>

            <div className='mt-8 border py-5 px-10 shadow-lg'>
                <h1 className='text-2xl p-7 text-center'>Welcome Back</h1>

                <form className='flex flex-col gap-3' onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label>
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

                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-400 text-white p-2 rounded-md mt-5 w-full ${loading ? "opacity-60 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className='text-center mt-2'>
                        Don’t have an account?{" "}
                        <Link to="/signup" className='text-blue-400'>
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
