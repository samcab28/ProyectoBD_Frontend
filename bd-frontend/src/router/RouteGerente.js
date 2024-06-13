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
import ProductoList from '../CRUD_Folder/crudProducto/CrudProducto';
import ClienteListGerente from '../pantallas/CRUDSPantallas/ClienteList';
import AdminListGerente from '../pantallas/CRUDSPantallas/AdminList';
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
            <Route path='/gestion/cliente' element={<ClienteListGerente />} />
            <Route path='/gestion/administrador' element={<AdminListGerente />} />
            <Route path='/gestion/producto' element={<ProductoList />} />
            
            

            <Route path='/historial' element={<HistorialLogin />} />

        </Routes>
    );
};

export default RouteGerente;
