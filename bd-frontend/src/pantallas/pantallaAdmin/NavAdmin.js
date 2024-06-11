import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos de NavCliente

function NavAdmin() {
    return (
        <nav className="sidebar">
            <h2>Navegación</h2>
            <ul>
                <li><Link to="/admin/"><button className="nav-button">Home</button></Link></li>
                <li><Link to="/crud/"><button className="nav-button">Gestión General</button></Link></li>
                <li><Link to="/admin/citasMedica"><button className="nav-button">Citas Médicas</button></Link></li>
                <li><Link to="/admin/usuarios"><button className="nav-button">Usuarios</button></Link></li>
                <li><Link to="/admin/carritos"><button className="nav-button">Carritos de Compra</button></Link></li>
                <li><Link to="/admin/cobro"><button className="nav-button">Cobro</button></Link></li>
                <li><Link to="/admin/expedienteCliente"><button className="nav-button">Expediente Cliente</button></Link></li>
                <li><Link to="/admin/producto"><button className="nav-button">Productos</button></Link></li>
                <li><Link to="/"><button className="nav-button">Logout</button></Link></li>
            </ul>
        </nav>
    );
}

export default NavAdmin;

