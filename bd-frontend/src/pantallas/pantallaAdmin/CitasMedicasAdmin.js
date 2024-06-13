import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavAdmin from "./NavAdmin";
import fondoVet from "../../Imagenes/FondoVet.jpg";
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext';

function CitasCliente() {
    const { user } = useContext(UserContext); // Obtener el contexto del usuario
    const navigate = useNavigate();

    // Función para manejar los clicks y registrar la acción
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
                <h2>Citas Médicas</h2>
                <ul>
                    <li>
                        <button onClick={() => handleClick('/admin/citasMedica/gestion')}>
                            Gestionar Citas
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleClick('/admin/citasMedica/asignacionPersonal')}>
                            Asignar Personal
                        </button>
                    </li>
                    <li>
                        <button onClick={() => handleClick('/admin/citasMedica/cancelarCita')}>
                            Cancelar Cita
                        </button>
                    </li>
                </ul>
            </main>
        </div>
    );
}

export default CitasCliente;
