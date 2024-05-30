import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes
import InitialCliente from '../initialScreen/InitialCliente';
import About from '../homeScreen/About';
import Login from '../homeScreen/Login';
import Carrito from '../homeScreen/Carrito';

const RouteCliente = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialCliente />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/carrito' element={<Carrito />} />
        </Routes>
    );
};

export default RouteCliente;
