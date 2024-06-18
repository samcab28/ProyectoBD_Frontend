import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavAdmin from "./NavAdmin";
import fondoVet from "../../Imagenes/FondoVet.jpg";
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css';  // Importa los estilos CSS

function Usuarios() {
    const { user } = useContext(UserContext);
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
                <div className="button-container">
                    <button className="action-button" onClick={() => handleClick('/admin/usuarios/gestionar')}>
                        Gestionar Usuarios
                    </button>
                    <button className="action-button" onClick={() => handleClick('/admin/usuarios/modificar')}>
                        Modificar Información
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Usuarios;
