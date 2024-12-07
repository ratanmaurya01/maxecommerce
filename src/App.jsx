import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Navbar from './Navbar/navbar';
import Login from './Auth/Login';
import Singin from './Auth/Singin';


function App() {
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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
