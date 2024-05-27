// src/router/RouteCliente.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de cliente
import InitialCliente from "../initialScreen/InitialCliente";

const RouteCliente = () => {
    return (
        <Routes>
            <Route path='/cliente' element={<InitialCliente />} />
            {/* Agrega más rutas de cliente aquí según sea necesario */}
        </Routes>
    );
};

export default RouteCliente;
