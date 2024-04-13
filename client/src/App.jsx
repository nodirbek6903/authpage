import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Register from "./auth/register";
import Login from "./auth/login";
import ForgotPassword from "./auth/forgotpassword";
import Navbar from "./components/Navbar";
import Teams from "./components/Teams";
import ProductsTable from "./components/ProductsTable";
import Products from "./components/Products";
import Projects from "./components/Projects";
import Dashboard from "./components/Dashboard";
import Notifications from "./components/Notifications";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProduct from "./components/EditProduct/EditProduct";

function App() {
  return (
    <>
    <ToastContainer />
      <Navbar />
      <br /><br /><br />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/addproducts" element={<Products />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/tableproducts" element={<ProductsTable />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </>
  );
}

export default App;
