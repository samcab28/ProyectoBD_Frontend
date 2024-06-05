// src/router/RouteAdmin.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import InitialAdmin from '../pantallas/pantallaAdmin/InitialAdmin';

//importaciones de admin
import CitasMedicasAdmin from "../pantallas/pantallaAdmin/CitasMedicasAdmin";
import CobroAdmin from "../pantallas/pantallaAdmin/CobroAdmin";
import ExpedienteClienteAdmin from "../pantallas/pantallaAdmin/ExpedienteClienteAdmin";
import ProductoAdmin from "../pantallas/pantallaAdmin/ProductoAdmin";
import GestionCitas from '../pantallas/pantallaAdmin/GestionCitas';
import AsignacionPersonal from '../pantallas/pantallaAdmin/AsignacionPersonal';


const RouteAdmin = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialAdmin />} />
            <Route path='/citasMedica' element={<CitasMedicasAdmin />} />
            <Route path='/citasMedica/gestion' element={<GestionCitas />} />
            <Route path='/citasMedica/asignacionPersonal' element={<AsignacionPersonal />} />
            <Route path='/cobro' element={<CobroAdmin />} />
            <Route path='/expedienteCliente' element={<ExpedienteClienteAdmin />} />
            <Route path='/producto' element={<ProductoAdmin />} />
        </Routes>
    );
};

export default RouteAdmin;
