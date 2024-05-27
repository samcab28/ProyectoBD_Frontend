// src/router/RouteAdmin.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import InitialAdmin from '../initialScreen/InitialAdmin';
import Prueba from "../CRUD_Folder/prueba";

//crud de personas
import CreatePersona from "../CRUD_Folder/crudPersona/CreatePersona";
import RudPersona from "../CRUD_Folder/crudPersona/rudPersona";

const RouteAdmin = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialAdmin />} />
            <Route path='/prueba' element={<Prueba />} />

            <Route path='/crud/persona/create' element={<CreatePersona />} />;
            <Route path='/crud/persona/rud' element={<RudPersona />} />;
        </Routes>
    );
};

export default RouteAdmin;
