// src/router/RouteGerente.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de gerente
import InitialGerente from '../pantallas/pantallaGerente/InitialGerente';
import CitaMedicaGerente from "../pantallas/pantallaGerente/CitaMedicaGerente";
import CobroGerente from "../pantallas/pantallaGerente/CobroGerente";
import ExpedienteGerente from "../pantallas/pantallaGerente/ExpedienteGerente";
import ProductoGerente from "../pantallas/pantallaGerente/ProductoGerente";
import HistorialLogin from "../pantallas/pantallaGerente/HistorialLoginGerente";


const RouteGerente = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialGerente />} />
            <Route path='/citaMedica' element={<CitaMedicaGerente />} />
            <Route path='/cobro' element={<CobroGerente />} />
            <Route path='/expediente' element={<ExpedienteGerente />} />
            <Route path='/producto' element={<ProductoGerente />} />
            <Route path='/historial' element={<HistorialLogin />} />
        </Routes>
    );
};

export default RouteGerente;
