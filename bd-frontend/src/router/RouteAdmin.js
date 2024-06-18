// src/router/RouteAdmin.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import InitialAdmin from '../pantallas/pantallaAdmin/InitialAdmin';

//importaciones de admin
import CitasMedicasAdmin from "../pantallas/pantallaAdmin/CitasMedicasAdmin";
import CobroAdmin from "../pantallas/pantallaAdmin/CobroAdmin";
import ExpedienteClienteAdmin from "../pantallas/pantallaAdmin/ExpedienteClienteAdmin";
import GestionCitas from '../pantallas/pantallaAdmin/GestionCitas';
import AsignacionPersonal from '../pantallas/pantallaAdmin/AsignacionPersonal';
import CancelarCita from '../pantallas/pantallaAdmin/CancelarCita';
import ModificarUsuario from '../pantallas/pantallaAdmin/ModificarUsuario';
import CarritosDeCompra from '../pantallas/pantallaAdmin/CarritosDeCompra';
import HistorialLoginAdmin from "../pantallas/pantallaAdmin/HistorialLoginAdmin";
import CrearUsuario from '../pantallas/pantallaAdmin/CrearUsuario';

import CRUDMasterAdmin from '../pantallas/pantallaAdmin/CRUDMasterAdmin';
import ResenaListAdmin from '../pantallas/pantallaAdmin/ResenaListAdmin';
import VetListAdmin from '../pantallas/pantallaAdmin/VetListAdmin';
import ProductoListAdmin from '../pantallas/pantallaAdmin/ProductoListAdmin';
import ClienteListAdmin from '../pantallas/pantallaAdmin/ClienteListAdmin';


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
            
            <Route path='/usuarios/modificar' element={<ModificarUsuario />} />
            <Route path='/usuarios/gestionar' element={<CrearUsuario />} />
            <Route path='/expedienteCliente' element={<ExpedienteClienteAdmin />} />

            <Route path='/gestion' element={<CRUDMasterAdmin />} />
            <Route path='/gestion/cliente' element={<ClienteListAdmin />} />
            <Route path='/gestion/veterinario' element={<VetListAdmin />} />
            <Route path='/gestion/producto' element={<ProductoListAdmin />} />
            <Route path='/gestion/resena' element={<ResenaListAdmin />} />

            <Route path='/historial' element={<HistorialLoginAdmin />} />

        </Routes>
    );
};

export default RouteAdmin;
