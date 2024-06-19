// CitaMedicaVet.js
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavVeterinario from "./NavVeterinario";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import ProductImage from "../../Imagenes/ProductImage";
import { useNavigate } from "react-router-dom";
import logHistorialClick from "../../seguridad/historialClick";

function CitaMedicaVet() {
    const { user } = useContext(UserContext);
    const [citas, setCitas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/citaMedicaByVeterinario/${user.IdPersona}`)
            .then(response => response.json())
            .then(data => {
                console.log("Citas fetched:", data);
                setCitas(data);
            })
            .catch(error => console.error('Error fetching de citas:', error));
    }, []);

    const goToCita = (citaId, citaMasc) => {
        logHistorialClick(user, "Iniciar cita", `Cita ID: ${citaId}, Mascota ID: ${citaMasc}`);
        navigate(`/veterinario/citaManejo/${citaId}/${citaMasc}`);
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavVeterinario />
            <main className="main-content">
                <h2>Citas Médicas</h2>
                <div className="product-grid">
                    {citas.length > 0 ? (
                        citas.map(cita => (
                            <div className="product-card" key={cita.IdCitaMed}>
                                <div className="product-info">
                                    <p><strong>Fecha de la cita:</strong> {cita.FechaCita}</p>
                                    <p><strong>Duracion cita, minutos:</strong> {cita.DuracionCita}</p>
                                    <p><strong>Nombre Encargado:</strong> {cita.NombrePersona}</p>
                                    <p><strong>Nombre Mascota:</strong> {cita.NombreMascota}</p>
                                    <button style={{ marginBottom: '10px', marginRight: '10px' }}
                                        className="form-button"
                                        onClick={() => goToCita(cita.IdCitaMed, cita.IdMascota)}>Iniciar Cita
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay citas disponibles en este momento</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default CitaMedicaVet;
