import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/user/Profile";
import Cookies from "js-cookie";
import Createpopup from "../Pages/user/Createpopup";
import Campaigns from "../Pages/user/Campaigns";

const isAuthenticated = () => {
    return !!Cookies.get('token');
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

const Links = () => {
    const [logincheck, setLogincheck] = useState(isAuthenticated());
    const location = useLocation();

    // Check for login status on page load and on route change
    useEffect(() => {
        const token = Cookies.get('token');
        setLogincheck(!!token);  // Updates logincheck whenever route changes
    }, [location]);  // listen to location changes (triggered when navigating between pages)

    return (
        <>


            <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

<Route
                    path="/createpopup"
                    element={
                        <ProtectedRoute>
                            <Createpopup />
                        </ProtectedRoute>
                    }
                />


<Route
                    path="/campaigns"
                    element={
                        <ProtectedRoute>
                            <Campaigns />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
};


export default Links;
