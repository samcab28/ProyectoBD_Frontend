// src/router/RouteAdmin.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import InitialAdmin from '../initialScreen/InitialAdmin';
import Prueba from "../CRUD_Folder/prueba";

const RouteAdmin = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialAdmin />} />
            <Route path='/prueba' element={<Prueba />} />
            {/* Agrega más rutas de administración aquí según sea necesario */}
        </Routes>
    );
};

export default RouteAdmin;
