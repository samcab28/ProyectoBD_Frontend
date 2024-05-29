// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importacion del homescreen
import RouteHomeScreen from "./router/RouteHomeScreen";

// Importación de rutas separadas
import RouteAdmin from './router/RouteAdmin';
import RouteCliente from './router/RouteCliente';
import RouteGerente from './router/RouteGerente';
import RouteVeterinario from './router/RouteVeterinario';
import RouteCRUD from "./router/RouteCRUD";
function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/*path original*/}

                    {/* Path inicial */}
                    <Route path='/*' element={<RouteHomeScreen />} />
                    <Route path='/veterinario/*' element={<RouteVeterinario />} />
                    <Route path='/gerente/*' element={<RouteGerente />} />
                    <Route path='/cliente/*' element={<RouteCliente />} />
                    <Route path='/admin/*' element={<RouteAdmin />} />
                    <Route path='/crud/*' element={<RouteCRUD />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
