import React from 'react';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import { ToastContainer } from 'react-toastify';
import Navbar from "./Components/Navbar.jsx";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './Components/Products.jsx';
import Movies from './Components/Recipe.jsx';
import Carts from './Components/Carts.jsx';
import Recipe from './Components/Recipe.jsx';

const App = () => {
  return (
    <Router>
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/products"
            element={
              <>
                <Navbar />
                <Products />
              </>
            }
          />
          <Route
            path="/recipes"
            element={
              <>
                <Navbar />
                <Recipe />
              </>
            }
          />
          <Route
            path="/carts"
            element={
              <>
                <Navbar />
                <Carts />
              </>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
