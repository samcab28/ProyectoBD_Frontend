import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import CrudMaster from "../CRUD_Folder/CrudMaster";

//importacion de diferentes crud
import RudPersona from "../CRUD_Folder/crudPersona/CrudPersona";
import CrudAnimal from "../CRUD_Folder/crudAnimal/CrudAnimal";
import CrudMascota from "../CRUD_Folder/crudMascota/CrudMascota";

const RouteCRUD = () => {
    return (
        <Routes>
            <Route path='/' element={<CrudMaster />} />
            <Route path='/persona' element={<RudPersona />} />;
            <Route path='/animal' element={<CrudAnimal />} />;
            <Route path='/mascota' element={<CrudMascota />} />;
        </Routes>
    );
};

export default RouteCRUD;