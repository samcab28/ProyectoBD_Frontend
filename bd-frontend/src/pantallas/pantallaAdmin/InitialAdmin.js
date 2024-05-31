// InitialAdmin.js
import React from 'react';
import '../../Styles/PageContainer.css';
import {Link} from "react-router-dom"; // Importa el archivo de estilos
import NavAdmin from "./NavAdmin";

function InitialAdmin() {
    return (
        <div className="home-screen">
            <header className="header">
                <img src="https://via.placeholder.com/1500x150" alt="Banner" className="header-image"/>
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
