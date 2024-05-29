// src/router/RouteAdmin.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import HomeScreen from "../homeScreen/HomeScreen";
import About from "../homeScreen/About";
import Login from "../homeScreen/Login";

const RouteAdmin = () => {
    return (
        <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
};

export default RouteAdmin;
