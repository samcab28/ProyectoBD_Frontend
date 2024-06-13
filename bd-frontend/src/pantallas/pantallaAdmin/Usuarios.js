import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavAdmin from "./NavAdmin";
import fondoVet from "../../Imagenes/FondoVet.jpg";
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext';

function Usuarios() {
    const { user } = useContext(UserContext); // Obtener el contexto del usuario
    const navigate = useNavigate();

    const handleClick = (path) => {
        logHistorialClick(user, "Navegacion", `${path}`);
        navigate(path);
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavAdmin />
            <main className="main-content">
                <h2>Gestión de Usuarios</h2>
                <ul>
                    <li>
                        <button onClick={() => handleClick('/admin/citasMedica/gestion')}>
                            Gestionar Usuarios
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleClick('/admin/usuarios/modificar')}>
                            Modificar Información
                        </button>
                    </li>
                </ul>
            </main>
        </div>
    );
}

export default Usuarios;
