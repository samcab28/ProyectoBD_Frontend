// src/router/RouteHomeScreen.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import HomeScreen from "../PaginasCliente/HomeScreen";
import About from "../PaginasCliente/About";
import Login from "../PaginasCliente/Login";
import Carrito from "../PaginasCliente/Carrito"
import Mascotas from '../PaginasCliente/Mascotas';

const RouteHomeScreen = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/mascotas' element={<Mascotas />} />
        </Routes>
    );
};

export default RouteHomeScreen;
