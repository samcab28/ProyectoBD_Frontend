import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos de NavCliente
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext';



//falta actualizar a componentes de gerente, actualmente tiene los de admin
function NavGerente() {
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

                <li><Link to="/gerente/"><button className="nav-button">Home</button></Link></li>
                <li><Link to="/gerente/gestion"><button className="nav-button">Gestión general</button></Link></li>
                <li><Link to="/gerente/citaMedica"><button className="nav-button">Citas Médicas</button></Link></li>
                <li><Link to="/gerente/cobro"><button className="nav-button">Cobro</button></Link></li>
                <li><Link to="/gerente/expediente"><button className="nav-button">Expediente Cliente</button></Link></li>
                <li><Link to="/gerente/producto"><button className="nav-button">Producto</button></Link></li>
                <li><Link to="/gerente/historial"><button className="nav-button">Historial Login</button></Link></li>
                <li><Link to="/"><button className="nav-button">Logout</button></Link></li>
                

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

export default NavGerente;
