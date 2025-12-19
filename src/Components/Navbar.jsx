import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center px-6 py-4 shadow bg-white">
            <h1 className="text-2xl font-bold text-blue-400 cursor-pointer"
                onClick={() => navigate("/")}>
                Products
            </h1>

            <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">
                    👤 {username || "Guest"}
                </span>
                <button
                    onClick={handleLogout}
                    className="bg-red-400 text-white px-4 py-1 rounded"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;
