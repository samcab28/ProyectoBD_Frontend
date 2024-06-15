import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext'; // Asegúrate de que tengas acceso al contexto del usuario
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavAdmin from "./NavAdmin";
import CreateCita from './CrearCita';
import '../../Styles/PageContainer.css'; // Asegúrate de tener un archivo CSS para los estilos

function GestionCitas() {
    const { user } = useContext(UserContext); // Obtener el contexto del usuario
    const navigate = useNavigate(); 
    const [citas, setCitas] = useState([]);

    const handleRegresar = () => {
        logHistorialClick(user, "Regresar", "Volver a la gestión de citas médicas");
        navigate('/admin/citasMedica'); 
    };

    function handleDelete(id) {
        logHistorialClick(user, "Eliminar cita", `ID de la cita: ${id}`);
        fetch(`http://localhost:3001/citaMedica/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Remove the deleted persona from the state
                setCitas(citas.filter(cita => cita.IdCitaMed !== id));
                window.location.reload();
            } else {
                alert('Error deleting cita');
            }
        })
        .catch(error => console.error('Error deleting cita:', error));
    }

    function handleMod(id) {
        logHistorialClick(user, "Modificar cita", `ID de la cita: ${id}`);
        console.log("Implementar lógica");
    }

    useEffect(() => {
        fetch('http://localhost:3001/citaMedica')
            .then(response => response.json())
            .then(data => setCitas(data))
            .catch(error => console.error('Error fetching citas:', error));
    }, []);

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavAdmin />
            <main className="main-content">
                <h2>Gestión de Citas Médicas</h2>
                <CreateCita />
                <h2>Listado de Citas Médicas</h2>
                <div className="product-grid">
                    {citas.map(cita => (
                        <div className="product-card" key={cita.IdCitaMed}>
                            <div className="product-info">
                                <p><strong>Id:</strong> {cita.IdCitaMed}</p>
                                <p><strong>Fecha de Cita:</strong> {cita.FechaCita}</p>
                                <p><strong>Duración:</strong> {cita.Duracion}</p>
                                <p><strong>Mascota:</strong> {cita.NombreMascota}</p>
                                <p><strong>Encargado:</strong> {cita.Encargado}</p>
                                <p><strong>Estado:</strong> {cita.TipoEstCita}</p>
                                <div className="action-buttons">
                                    <button onClick={() => handleDelete(cita.IdCitaMed)} className="form-button">Eliminar</button>
                                    <button onClick={() => handleMod(cita.IdCitaMed)} className="form-button">Modificar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handleRegresar} className="form-button">Regresar</button>
            </main>
        </div>
    );
}

export default GestionCitas;
