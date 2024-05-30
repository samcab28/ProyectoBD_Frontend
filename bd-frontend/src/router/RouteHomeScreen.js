// src/router/RouteAdmin.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import HomeScreen from "../homeScreen/HomeScreen";
import About from "../homeScreen/About";
import Login from "../homeScreen/Login";
import Carrito from "../homeScreen/Carrito"

const RouteAdmin = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/carrito' element={<Carrito />} />
        </Routes>
    );
};

export default RouteAdmin;
