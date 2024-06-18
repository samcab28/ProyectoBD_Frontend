// InitialAdmin.js
import React, {useEffect} from 'react';
import '../../Styles/PageContainer.css';
import {Link} from "react-router-dom"; // Importa el archivo de estilos
import NavAdmin from "./NavAdmin";
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NotificacionHistorial from "../../seguridad/NotificacionHistorial";

function InitialAdmin() {

    const confirmacionLoginFallido = () => {
        NotificacionHistorial.checkHistorialLoginMinuto()
            .then(cantidad => console.log(cantidad))
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        confirmacionLoginFallido();
    }, []);
    
    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavAdmin/>
            <main className="main-content">
                <h2>Initial Admin Page</h2>
                <p>Welcome, Admin!</p>
            </main>
        </div>
    );
}

export default InitialAdmin;
