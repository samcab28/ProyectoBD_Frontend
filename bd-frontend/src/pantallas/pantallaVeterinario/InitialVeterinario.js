// InitialVeterinario.js
import React from 'react';
import '../../Styles/PageContainer.css';
import {Link} from "react-router-dom"; // Importa el archivo de estilos
import NavVeterinario from "./NavVeterinario";
function InitialVeterinario() {
    return (
        <div className="home-screen">
            <header className="header">
                <img src="https://via.placeholder.com/1500x150" alt="Banner" className="header-image"/>
            </header>
            <NavVeterinario/>
            <main className="main-content">
                <h2>Initial Veterinarian Page</h2>
                <p>Welcome, Veterinarian!</p>
            </main>
        </div>
    );
}

export default InitialVeterinario;
