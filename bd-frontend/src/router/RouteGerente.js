// src/router/RouteGerente.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de gerente
import InitialGerente from '../pantallas/pantallaGerente/InitialGerente';

import CitaMedicaGerente from "../pantallas/pantallaGerente/CitaMedicaGerente";
import GestionCitasGerente from '../pantallas/pantallaGerente/GestionCitasGerente';
import AsignacionPersonalGerente from '../pantallas/pantallaGerente/AsignacionPersonalGerente';

import CobroGerente from "../pantallas/pantallaGerente/CobroGerente";
import ExpedienteClienteGerente from "../pantallas/pantallaGerente/ExpedienteGerente";
import ProductoGerente from "../pantallas/pantallaGerente/ProductoGerente";
import CancelarCitaGerente from '../pantallas/pantallaGerente/CancelarCitaGerente';

import CRUDMasterGerente from '../pantallas/pantallaGerente/CRUDMasterGerente';
import ProductList from '../pantallas/pantallaGerente/ProductoListGerente';
import ClienteList from '../pantallas/pantallaGerente/ClienteListGerente';
import AdminList from '../pantallas/pantallaGerente/AdminListGerente';
import VetList from '../pantallas/pantallaGerente/VetListGerente';
import ResenaList from '../pantallas/pantallaGerente/ResenaListGerente';
import HistorialLogin from "../pantallas/pantallaGerente/HistorialLoginGerente";



const RouteGerente = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialGerente />} />
            <Route path='/citaMedica' element={<CitaMedicaGerente />} />
            <Route path='/citaMedica/gestion' element={<GestionCitasGerente />} />
            <Route path='/citaMedica/asignacionPersonal' element={<AsignacionPersonalGerente />} />
            <Route path='/citaMedica/cancelarCita' element={<CancelarCitaGerente />} />
            <Route path='/cobro' element={<CobroGerente />} />
            <Route path='/expediente' element={<ExpedienteClienteGerente />} />
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
