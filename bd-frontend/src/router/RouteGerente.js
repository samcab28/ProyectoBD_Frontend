// src/router/RouteGerente.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de gerente
import InitialGerente from "../initialScreen/InitialGerente";

const RouteGerente = () => {
    return (
        <Routes>
            <Route path='/gerente' element={<InitialGerente />} />
            {/* Agrega más rutas de gerente aquí según sea necesario */}
        </Routes>
    );
};

export default RouteGerente;
