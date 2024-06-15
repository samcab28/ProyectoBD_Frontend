import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos de NavCliente
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext';

function NavAdmin() {
    const { user } = useContext(UserContext); // Obtener el contexto del usuario
    const navigate = useNavigate();

    const handleClick = (path) => {
        logHistorialClick(user, "Navegacion", `${path}`);
        navigate(path);
    };

    return (
        <nav className="sidebar">
            <h2>Navegación</h2>
            <ul>
                <li>
                    <button className="action-button" onClick={() => handleClick('/gerente/')}>
                        Home
                    </button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleClick('/crud/')}>
                        Gestión
                    </button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleClick('/gerente/citaMedica')}>
                        Citas Médicas
                    </button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleClick('/gerente/cobro')}>
                        Cobro
                    </button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleClick('/gerente/expediente')}>
                        Expediente Cliente
                    </button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleClick('/gerente/producto')}>
                        Producto
                    </button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleClick('/gerente/historial')}>
                        Historial Login
                    </button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleClick('/')}>
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default NavAdmin;
