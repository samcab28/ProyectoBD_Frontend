import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos

function NavCliente() {
    return (
        <nav className="sidebar">
            <h2>Navegación</h2>
            <ul>
                <li><Link to="/cliente/">
                    <button className="nav-button">Home</button>
                </Link></li>
                <li><Link to="/cliente/producto">
                    <button className="nav-button">Producto</button>
                </Link></li>
                <li><Link to="/cliente/about">
                    <button className="nav-button">About</button>
                </Link></li>
                <li><Link to="/cliente/carrito">
                    <button className="nav-button">Carrito</button>
                </Link></li>
                <li><Link to="/cliente/historial">
                    <button className="nav-button">Historial compras</button>
                </Link></li>
                <li><Link to="/cliente/mascotas">
                    <button className="nav-button">Mascotas</button>
                </Link></li>
                <li><Link to="/cliente/citasmedicas">
                    <button className="nav-button">Citas Médicas</button>
                </Link></li>
                <li><Link to="/">
                    <button className="nav-button">Logout</button>
                </Link></li>
            </ul>
        </nav>
    );
}

export default NavCliente;
