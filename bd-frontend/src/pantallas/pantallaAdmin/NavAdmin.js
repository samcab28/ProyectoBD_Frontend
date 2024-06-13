import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos de NavCliente
import { UserContext } from '../../context/UserContext';
import logHistorialClick from '../../seguridad/historialClick';

function NavAdmin() {
    const { user } = useContext(UserContext);

    const handleClick = (accion, detalle) => {
        logHistorialClick(user, accion, detalle);
    };

    return (
        <nav className="sidebar">
            <h2>Navegación</h2>
            <ul>
                <li>
                    <Link to="/admin/">
                        <button className="nav-button" onClick={() => handleClick('Navegación', 'Home')}>Home</button>
                    </Link>
                </li>
                <li>
                    <Link to="/crud/">
                        <button className="nav-button" onClick={() => handleClick('Navegación', 'Gestión General')}>Gestión General</button>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/citasMedica">
                        <button className="nav-button" onClick={() => handleClick('Navegación', 'Citas Médicas')}>Citas Médicas</button>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/usuarios">
                        <button className="nav-button" onClick={() => handleClick('Navegación', 'Usuarios')}>Usuarios</button>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/cobro">
                        <button className="nav-button" onClick={() => handleClick('Navegación', 'Cobro')}>Cobro</button>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/expedienteCliente">
                        <button className="nav-button" onClick={() => handleClick('Navegación', 'Expediente Cliente')}>Expediente Cliente</button>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/producto">
                        <button className="nav-button" onClick={() => handleClick('Navegación', 'Productos')}>Productos</button>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <button className="nav-button" onClick={() => handleClick('Navegación', 'Logout')}>Logout</button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavAdmin;
