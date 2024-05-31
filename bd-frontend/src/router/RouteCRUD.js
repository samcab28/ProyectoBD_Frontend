import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de administración
import CrudMaster from "../CRUD_Folder/CrudMaster";

//importacion de diferentes crud
import RudPersona from "../CRUD_Folder/crudPersona/CrudPersona";
import CrudAnimal from "../CRUD_Folder/crudAnimal/CrudAnimal";
import CrudMascota from "../CRUD_Folder/crudMascota/CrudMascota";
import CrudSucursal from "../CRUD_Folder/crudSucursal/CrudSucursal";
import CrudProducto from "../CRUD_Folder/crudProducto/CrudProducto";
import CrudResena from "../CRUD_Folder/crudResena/CrudResena";

const RouteCRUD = () => {
    return (
        <Routes>
            <Route path='/' element={<CrudMaster />} />
            <Route path='/persona' element={<RudPersona />} />;
            <Route path='/animal' element={<CrudAnimal />} />;
            <Route path='/mascota' element={<CrudMascota />} />;
            <Route path='/sucursal' element={<CrudSucursal />} />;
            <Route path='/producto' element={<CrudProducto />} />;
            <Route path='/resena' element={<CrudResena />} />;
        </Routes>
    );
};

export default RouteCRUD;
