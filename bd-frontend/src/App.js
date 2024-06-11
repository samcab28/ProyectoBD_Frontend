// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importación de UserContext
import { UserProvider } from './context/UserContext';
import { TemporaryCartProvider } from './context/TemporaryCartContext';

// Importación de rutas
import RouteHomeScreen from "./router/RouteHomeScreen";
import RouteAdmin from './router/RouteAdmin';
import RouteCliente from './router/RouteCliente';
import RouteGerente from './router/RouteGerente';
import RouteVeterinario from './router/RouteVeterinario';
import RouteCRUD from "./router/RouteCRUD";

//importacion y declaracion de inactividad
import Innactividad from "./seguridad/Innactividad";
Innactividad.startAutoLogout();

function App() {
    return (
        <UserProvider>
            <TemporaryCartProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/*' element={<RouteHomeScreen />} />
                        <Route path='/veterinario/*' element={<RouteVeterinario />} />
                        <Route path='/gerente/*' element={<RouteGerente />} />
                        <Route path='/cliente/*' element={<RouteCliente />} />
                        <Route path='/admin/*' element={<RouteAdmin />} />
                        <Route path='/crud/*' element={<RouteCRUD />} />
                    </Routes>
                </BrowserRouter>
            </TemporaryCartProvider>
        </UserProvider>
    );
}

export default App;
