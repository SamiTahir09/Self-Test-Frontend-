import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login", { replace: true });
    };

    const linkClass = ({ isActive }) =>
        `hover:text-blue-400 ${isActive ? "text-red-500 font-semibold" : "text-black"
        }`;

    return (
        <div className="flex justify-between items-center px-6 py-4 shadow bg-white">
            <h1
                className="text-2xl font-bold text-blue-400 cursor-pointer"
                onClick={() => navigate("/products")}
            >
                Products
            </h1>

            <div className="flex gap-5 text-2xl cursor-pointer">
                <NavLink to="/products" className={linkClass}>
                    Products
                </NavLink>

                <NavLink to="/recipes" className={linkClass}>
                    Recipe
                </NavLink>

                <NavLink to="/carts" className={linkClass}>
                    Carts
                </NavLink>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">
                    👤 {username || "Guest"}
                </span>

                {username && (
                    <button
                        onClick={handleLogout}
                        className="bg-red-400 text-white px-4 py-1 rounded"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
