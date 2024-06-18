// src/router/RouteGerente.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de gerente
import InitialGerente from '../pantallas/pantallaGerente/InitialGerente';
import CitaMedicaGerente from "../pantallas/pantallaGerente/CitaMedicaGerente";
import CobroGerente from "../pantallas/pantallaGerente/CobroGerente";
import ExpedienteGerente from "../pantallas/pantallaGerente/ExpedienteGerente";
import ProductoGerente from "../pantallas/pantallaGerente/ProductoGerente";

import CRUDMasterGerente from '../pantallas/pantallaGerente/CRUDMasterGerente';
import ProductList from '../pantallas/CRUDSPantallas/ProductoList';
import ClienteList from '../pantallas/CRUDSPantallas/ClienteList';
import AdminList from '../pantallas/CRUDSPantallas/AdminList';
import VetList from '../pantallas/CRUDSPantallas/VetList';
import ResenaList from '../pantallas/CRUDSPantallas/ResenaList';
import HistorialLogin from "../pantallas/pantallaGerente/HistorialLoginGerente";



const RouteGerente = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialGerente />} />
            <Route path='/citaMedica' element={<CitaMedicaGerente />} />
            <Route path='/cobro' element={<CobroGerente />} />
            <Route path='/expediente' element={<ExpedienteGerente />} />
            <Route path='/producto' element={<ProductoGerente />} />

            <Route path='/gestion' element={<CRUDMasterGerente />} />
            <Route path='/gestion/cliente' element={<ClienteList />} />
            <Route path='/gestion/veterinario' element={<VetList />} />
            <Route path='/gestion/administrador' element={<AdminList />} />
            <Route path='/gestion/producto' element={<ProductList />} />
            <Route path='/gestion/resena' element={<ResenaList />} />
            

            <Route path='/historial' element={<HistorialLogin />} />

        </Routes>
    );
};

export default RouteGerente;
