import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isAuth = localStorage.getItem("username");
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
