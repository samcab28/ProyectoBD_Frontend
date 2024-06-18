import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavGerente from './NavGerente';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css';

function CitasClienteGerente() {
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
            <NavGerente />
            <main className="main-content">
                <h2>Citas Médicas</h2>
                <div className="button-container">
                    <button className="action-button" onClick={() => handleClick('/gerente/citaMedica/gestion')}>
                        Gestionar Citas
                    </button>
                    <button className="action-button" onClick={() => handleClick('/gerente/citaMedica/asignacionPersonal')}>
                        Asignar Personal
                    </button>
                    <button className="action-button" onClick={() => handleClick('/gerente/citaMedica/cancelarCita')}>
                        Cancelar Cita
                    </button>
                </div>
            </main>
        </div>
    );
}

export default CitasClienteGerente;
