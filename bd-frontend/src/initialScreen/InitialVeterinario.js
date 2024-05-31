// InitialVeterinario.js
import React from 'react';
import '../Styles/PageContainer.css';
import {Link} from "react-router-dom"; // Importa el archivo de estilos

function InitialVeterinario() {
    return (
        <div className="home-screen">
            <header className="header">
                <img src="https://via.placeholder.com/1500x150" alt="Banner" className="header-image"/>
            </header>
            <nav className="sidebar">
                <h2>Navegación</h2>
                <ul>
                    <li><Link to="/crud">
                        <button>Gestion</button>
                    </Link></li>
                    <li><Link to="/carrito">
                        <button>Medicamentos Disponibles</button>
                    </Link></li>
                    <li><Link to="/mascotas">
                        <button>Mascotas</button>
                    </Link></li>
                    <li><Link to="/citasmedicas">
                        <button>Citas Médicas</button>
                    </Link></li>
                    <li><Link to="/">
                        <button>Logout</button>
                    </Link></li>
                </ul>
            </nav>
            <main className="main-content">
                <h2>Initial Veterinarian Page</h2>
                <p>Welcome, Veterinarian!</p>
            </main>
        </div>
    );
}

export default InitialVeterinario;
