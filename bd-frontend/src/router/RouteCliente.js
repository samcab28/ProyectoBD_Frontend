import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes
import AboutCliente from '../pantallas/pantallaCliente/AboutCliente';
import Login from '../pantallas/pantallaLogin/Login';
import CarritoCliente from '../pantallas/pantallaCliente/CarritoCliente';
import MascotaCliente from '../pantallas/pantallaCliente/MascotaCliente';
import CitasMedicas from '../pantallas/pantallaCliente/CitasCliente';
import ProductoCliente from "../pantallas/pantallaCliente/ProductoCliente";
import InitialCliente from "../pantallas/pantallaCliente/InitialCliente";
import ResenaCliente from "../pantallas/pantallaCliente/ResenaCliente";
import HistorialCompraCliente from "../pantallas/pantallaCliente/HistorialCompraCliente";
import DireccionCliente from "../pantallas/pantallaCliente/DireccionCliente";

const RouteCliente = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialCliente />} />
            <Route path='/producto' element={<ProductoCliente />} />
            <Route path='/about' element={<AboutCliente />} />
            <Route path='/login' element={<Login />} />
            <Route path='/carrito' element={<CarritoCliente />} />
            <Route path='/mascotas' element={<MascotaCliente />} />
            <Route path='/citasmedicas' element={<CitasMedicas />} />
            <Route path='/resena/:id' element={<ResenaCliente />} />
            <Route path='/historial' element={<HistorialCompraCliente />} />
            <Route path='/direccion' element={<DireccionCliente />} />
        </Routes>
    );
};

export default RouteCliente;
