// AboutCliente.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";

function InitialCliente() {
    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
                <h2>initial cliente</h2>
            </main>
        </div>
    );
}

export default InitialCliente;
