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
import CancelarCita from '../pantallas/pantallaAdmin/CancelarCita';
import Usuarios from '../pantallas/pantallaAdmin/Usuarios';
import ModificarUsuario from '../pantallas/pantallaAdmin/ModificarUsuario';
import CarritosDeCompra from '../pantallas/pantallaAdmin/CarritosDeCompra';
import HistorialLoginAdmin from "../pantallas/pantallaAdmin/HistorialLoginAdmin";

const RouteAdmin = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialAdmin />} />
            <Route path='/citasMedica' element={<CitasMedicasAdmin />} />
            <Route path='/citasMedica/gestion' element={<GestionCitas />} />
            <Route path='/citasMedica/asignacionPersonal' element={<AsignacionPersonal />} />
            <Route path='/citasMedica/cancelarCita' element={<CancelarCita />} />
            <Route path='/carritos' element={<CarritosDeCompra />} />
            <Route path='/cobro' element={<CobroAdmin />} />
            <Route path='/usuarios' element={<Usuarios />} />
            <Route path='/usuarios/modificar' element={<ModificarUsuario />} />
            <Route path='/expedienteCliente' element={<ExpedienteClienteAdmin />} />
            <Route path='/producto' element={<ProductoAdmin />} />
            <Route path='/historial' element={<HistorialLoginAdmin />} />
        </Routes>
    );
};

export default RouteAdmin;
