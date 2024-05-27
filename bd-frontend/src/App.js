// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importaciones del homescreen
import HomeScreen from './homeScreen/HomeScreen';
import Login from './homeScreen/Login';
import About from './homeScreen/About';

// Importación de rutas separadas
import RouteAdmin from './router/RouteAdmin';
import RouteCliente from './router/RouteCliente';
import RouteGerente from './router/RouteGerente';
import RouteVeterinario from './router/RouteVeterinario';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* Path inicial */}
                    <Route path='/' element={<HomeScreen />} />

                    {/* Paths de homescreen */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/about' element={<About />} />

                    {/* Paths de initial */}
                    <Route path='/veterinario/*' element={<RouteVeterinario />} />
                    <Route path='/gerente/*' element={<RouteGerente />} />
                    <Route path='/cliente/*' element={<RouteCliente />} />
                    <Route path='/admin/*' element={<RouteAdmin />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
