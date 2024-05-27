// src/router/RouteVeterinario.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de veterinario
import InitialVeterinario from '../initialScreen/InitialVeterinario';

const RouteVeterinario = () => {
    return (
        <Routes>
            <Route path='/veterinario' element={<InitialVeterinario />} />
            {/* Agrega más rutas de veterinario aquí según sea necesario */}
        </Routes>
    );
};

export default RouteVeterinario;
