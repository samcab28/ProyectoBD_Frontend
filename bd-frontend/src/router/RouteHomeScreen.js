// src/router/RouteHomeScreen.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import HomeScreen from "../pantallas/pantallaCliente/HomeScreen";
import AboutCliente from "../pantallas/pantallaCliente/AboutCliente";
import Login from "../pantallas/pantallaLogin/Login";
import CarritoCliente from "../pantallas/pantallaCliente/CarritoCliente"
import MascotaCliente from '../pantallas/pantallaCliente/MascotaCliente';
import CitasMedicas from '../pantallas/pantallaCliente/CitasCliente';

const RouteHomeScreen = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/about' element={<AboutCliente />} />
            <Route path='/login' element={<Login />} />
            <Route path='/carrito' element={<CarritoCliente />} />
            <Route path='/mascotas' element={<MascotaCliente />} />
            <Route path='/citasmedicas' element={<CitasMedicas />} />
        </Routes>
    );
};

export default RouteHomeScreen;
