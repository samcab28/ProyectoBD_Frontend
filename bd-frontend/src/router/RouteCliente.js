import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes
import InitialCliente from '../initialScreen/InitialCliente';
import About from '../PaginasCliente/About';
import Login from '../PaginasCliente/Login';
import Carrito from '../PaginasCliente/Carrito';
import Mascotas from '../PaginasCliente/Mascotas';

const RouteCliente = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialCliente />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/mascotas' element={<Mascotas />} />
        </Routes>
    );
};

export default RouteCliente;
