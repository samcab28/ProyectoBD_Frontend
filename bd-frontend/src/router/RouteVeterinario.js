// src/router/RouteVeterinario.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importación de componentes de veterinario
import InitialVeterinario from '../pantallas/pantallaVeterinario/InitialVeterinario';

import CitaMedicaVet from "../pantallas/pantallaVeterinario/CitaMedicaVet";
import MascotaVet from "../pantallas/pantallaVeterinario/MascotaVet";
import MedicamentoVet from "../pantallas/pantallaVeterinario/MedicamentoVet";
import CitaEjecucionVet from "../pantallas/pantallaVeterinario/CitaEjecucionVet";

const RouteVeterinario = () => {
    return (
        <Routes>
            <Route path='/' element={<InitialVeterinario />} />
            <Route path='/citaMedica' element={<CitaMedicaVet />} />
            <Route path='/mascota' element={<MascotaVet />} />
            <Route path='/medicamento' element={<MedicamentoVet />} />
            <Route path='/citaManejo/:idCita/:idMascota' element={<CitaEjecucionVet />} />
        </Routes>
    );
};

export default RouteVeterinario;
