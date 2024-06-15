import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos de NavCliente
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext';

function NavVet() {
    const { user } = useContext(UserContext); // Obtener el contexto del usuario
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        logHistorialClick(user, "Navegación", `Navegar a ${path}`);
        navigate(path);
    };

    return (
        <nav className="sidebar">
            <h2>Navegación</h2>
            <ul>
                <li>
                    <button className="action-button" onClick={() => handleNavigation('/veterinario/')}>Home</button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleNavigation('/crud/')}>Gestión</button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleNavigation('/veterinario/medicamento')}>Medicamentos Disponibles</button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleNavigation('/veterinario/mascota')}>Mascotas</button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleNavigation('/veterinario/citaMedica')}>Citas Medicas</button>
                </li>
                <li>
                    <button className="action-button" onClick={() => handleNavigation('/')}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default NavVet;
