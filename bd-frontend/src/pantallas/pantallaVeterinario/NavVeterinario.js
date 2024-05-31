import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos de NavCliente


function NavAdmin() {
    return (
        <nav className="sidebar">
            <h2>Navegación</h2>
            <ul>
                <li><Link to="/veterinario/"><button className="nav-button">Home</button></Link></li>
                <li><Link to="/crud/"><button className="nav-button">Gestión</button></Link></li>
                <li><Link to="/veterinario/medicamento"><button className="nav-button">Medicamentos Disponibles</button></Link></li>
                <li><Link to="/veterinario/mascota"><button className="nav-button">Mascotas</button></Link></li>
                <li><Link to="/veterinario/citaMedica"><button className="nav-button">Citas Medicas</button></Link></li>
                <li><Link to="/"><button className="nav-button">Logout</button></Link></li>
            </ul>
        </nav>
    );
}

export default NavAdmin;
