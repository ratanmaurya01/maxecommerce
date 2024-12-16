import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Navbar from './Navbar/navbar';
import Login from './Auth/Login';
import Singin from './Auth/Singin';
import Profile from './Auth/Profile';
import AddProduct from './Admin/AddProduct';
import ManageProducts from './Admin/ManageProduct';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './redux/productSlice';
import ProductDetails from './Product/ProductDetails';
import ViewCard from './Product/ViewCArd';


function App() {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts());
    },[dispatch]);

    return (
        <Router>
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className="content-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Signin" element={<Singin />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Addproduct" element={<AddProduct />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/Manageproduct" element={<ManageProducts />} />
                    <Route path="/ViewCard" element={<ViewCard />} />
          
                </Routes>
            </div>
        </Router>
    );
}

export default App;
