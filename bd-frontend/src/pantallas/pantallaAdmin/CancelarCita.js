import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logHistorialClick from '../../seguridad/historialClick'; // Asegúrate de importar la función logHistorialClick
import { UserContext } from '../../context/UserContext'; // Importar el contexto de usuario
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavAdmin from "./NavAdmin";
import '../../Styles/PageContainer.css'; // Asegúrate de tener un archivo CSS para los estilos

function CancelarCita() {
    const [Cita, setCita] = useState('');
    const campoModificar = 'EstadoCita';
    const valorNuevo = '3';

    const navigate = useNavigate();
    const { user } = useContext(UserContext); // Obtener el contexto del usuario
    const [citas, setCitas] = useState([]);

    const handleRegresar = () => {
        logHistorialClick(user, "Navegacion", "/admin/citasMedica");
        navigate('/admin/citasMedica');
    };

    useEffect(() => {
        fetch('http://localhost:3001/citaMedica')
            .then(response => response.json())
            .then(data => setCitas(data))
            .catch(error => console.error('Error fetching citas:', error));
    }, []);

    const enviarCorreo = async (correos, asunto, mensaje) => {
        try {
            const response = await fetch('http://localhost:3001/enviarCorreo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correos: correos,
                    asunto: asunto,
                    mensaje: mensaje
                })
            });

            if (!response.ok) {
                throw new Error('Error al enviar el correo');
            }

            const data = await response.json();
            console.log('Correo enviado exitosamente:', data);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    };

    function handleSubmit(e) {
        e.preventDefault();

        const updateData = {
            campoModificar: campoModificar,
            valorNuevo: valorNuevo
        };

        fetch(`http://localhost:3001/citaMedica/${Cita}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
        .then(response => {
            if (response.ok) {
                logHistorialClick(user, "Cancelar Cita", `Cita ID: ${Cita}`);
                alert('Cita modificada exitosamente');
                window.location.reload(); // Recargar la página

                // Obtener los correos electrónicos del dueño y veterinario
                const citaCancelada = citas.find(cita => cita.IdCitaMed === Cita);
                if (citaCancelada) {
                    const correos = [citaCancelada.DuegnoCorreo, citaCancelada.VetCorreo];
                    const asunto = 'Notificación de Cancelación de Cita Médica';
                    const mensaje = `La cita médica para la mascota ${citaCancelada.NombreMascota}, del dueño ${citaCancelada.NombrePersona} ha sido cancelada.`;
                    enviarCorreo(correos, asunto, mensaje);
                }
            } else {
                alert('Error al modificar la cita');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    }

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavAdmin />
            <main className="main-content">
                <h2>Cancelación de Cita Médica</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Cita:
                        <select
                            name="cita"
                            value={Cita}
                            onChange={e => setCita(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Seleccione una cita</option>
                            {citas.map(cita => (
                                <option key={cita.IdCitaMed} value={cita.IdCitaMed}>
                                    {cita.IdCitaMed}, {cita.FechaCita}, {cita.NombreMascota}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br/>
                    <button type="submit" className="form-button">Cancelar Cita</button>
                </form>
                <h2>Listado de Citas Médicas</h2>
                <div className="product-grid">
                    {citas.map(cita => (
                        <div className="product-card" key={cita.IdCitaMed}>
                            <div className="product-info">
                                <p><strong>Id:</strong> {cita.IdCitaMed}</p>
                                <p><strong>FechaCita:</strong> {cita.FechaCita}</p>
                                <p><strong>Duracion:</strong> {cita.Duracion}</p>
                                <p><strong>Mascota:</strong> {cita.NombreMascota}</p>
                                <p><strong>Encargado:</strong> {cita.Encargado}</p>
                                <p><strong>Estado:</strong> {cita.TipoEstCita}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handleRegresar} className="form-button">Regresar</button>
            </main>
        </div>
    );
}

export default CancelarCita;
