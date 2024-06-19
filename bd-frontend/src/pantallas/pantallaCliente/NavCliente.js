import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos
import logHistorialClick from '../../seguridad/historialClick';

function NavCliente() {
    const { user } = useContext(UserContext);

    const handleNavigationClick = (accion, detalle) => {
        logHistorialClick(user, accion, detalle);
    };

    return (
        <nav className="sidebar">
            <h2>Navegación</h2>
            <ul>
                <li>
                    <Link to="/cliente/">
                        <button 
                            className="action-button" 
                            onClick={() => handleNavigationClick('Navegación', 'Home')}
                        >
                            Home
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/cliente/producto">
                        <button 
                            className="action-button" 
                            onClick={() => handleNavigationClick('Navegación', 'Producto')}
                        >
                            Producto
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/cliente/carrito">
                        <button 
                            className="action-button" 
                            onClick={() => handleNavigationClick('Navegación', 'Carrito')}
                        >
                            Carrito
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/cliente/historial">
                        <button 
                            className="action-button" 
                            onClick={() => handleNavigationClick('Navegación', 'Historial compras')}
                        >
                            Historial compras
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/cliente/mascotas">
                        <button 
                            className="action-button" 
                            onClick={() => handleNavigationClick('Navegación', 'Mascotas')}
                        >
                            Mascotas
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/cliente/citasmedicas">
                        <button 
                            className="action-button" 
                            onClick={() => handleNavigationClick('Navegación', 'Citas Médicas')}
                        >
                            Citas Médicas
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <button 
                            className="action-button" 
                            onClick={() => handleNavigationClick('Navegación', 'Logout')}
                        >
                            Logout
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavCliente;
