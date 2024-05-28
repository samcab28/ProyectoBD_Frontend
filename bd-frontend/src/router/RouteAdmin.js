// src/router/RouteAdmin.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import InitialAdmin from '../initialScreen/InitialAdmin';
import Prueba from "../CRUD_Folder/prueba";

//crud de personas
import RudPersona from "../CRUD_Folder/crudPersona/CrudPersona";
import CrudAnimal from "../CRUD_Folder/crudAnimal/CrudAnimal";

const RouteAdmin = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialAdmin />} />
            <Route path='/prueba' element={<Prueba />} />
            <Route path='/crud/persona' element={<RudPersona />} />;
            <Route path='/crud/animal' element={<CrudAnimal />} />;
        </Routes>
    );
};

export default RouteAdmin;
