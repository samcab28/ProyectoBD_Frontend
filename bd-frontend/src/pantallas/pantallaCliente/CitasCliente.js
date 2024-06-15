import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css';
import '../../Styles/FormsTarjeta.css';
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from '../../pantallas/pantallaCliente/NavCliente';
import logHistorialClick from '../../seguridad/historialClick';

function CitasMedicas() {
    const [citas, setCitas] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const { user } = useContext(UserContext);
    const [estadoCita, setEstadoCita] = useState(1);
    const [selectedCita, setSelectedCita] = useState(null);
    const [nuevaCita, setNuevaCita] = useState({
        FechaCita: '',
        DuracionCita: '',
        IdMascota: '',
        IdEncargado: '',
        EstadoCita: 2,
        Precio: 15000 // Precio predefinido
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/citaMedica/${user.IdPersona}/${estadoCita}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Citas fetched:", data);
                    setCitas(data);
                })
                .catch(error => console.error('Error fetching citas:', error));

            fetch(`http://localhost:3001/mascotaDuenio/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Mascotas fetched:", data);
                    setMascotas(data);
                })
                .catch(error => console.error('Error fetching mascotas:', error));

            fetch('http://localhost:3001/persona/tipo/2')
                .then(response => response.json())
                .then(data => {
                    console.log("Veterinarios fetched:", data);
                    setVeterinarios(data);
                })
                .catch(error => console.error('Error fetching veterinarios:', error));
        }
    }, [user, estadoCita]);

    const handleEstadoChange = (event) => {
        logHistorialClick(user, "Ver citas", `Estado de citas: ${event.target.value}`);
        setEstadoCita(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNuevaCita(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validaciones
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 7);
        const selectedDate = new Date(nuevaCita.FechaCita);

        if (selectedDate < today || selectedDate > maxDate) {
            setError('La fecha debe estar entre hoy y una semana a partir de hoy.');
            return;
        }

        if (nuevaCita.DuracionCita < 15 || nuevaCita.DuracionCita > 30) {
            setError('La duración de la cita debe ser entre 15 y 30 minutos.');
            return;
        }

        if (!nuevaCita.FechaCita || !nuevaCita.DuracionCita || !nuevaCita.IdMascota || !nuevaCita.IdEncargado) {
            setError('Por favor complete todos los campos.');
            return;
        }

        setError('');

        const citaData = {
            ...nuevaCita,
            FechaCita: new Date(nuevaCita.FechaCita).toISOString() // Convertir a ISO string
        };

        console.log('Enviando cita:', citaData);

        fetch('http://localhost:3001/citaMedica', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(citaData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => { throw new Error(error.message) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            setCitas([...citas, data]);

            // Obtener los correos electrónicos del dueño y veterinario
            const citaCreada = data; // Asume que la respuesta contiene la cita creada
            if (citaCreada) {
                console.log(citaCreada); 
                const correos = [citaCreada.DuegnoCorreo, citaCreada.VetCorreo];
                const asunto = 'Notificación de Creación de Cita Médica';
                const mensaje = `La cita médica para la mascota ${citaCreada.NombreMascota}, del dueño ${citaCreada.NombrePersona} ha sido creada para el día ${citaCreada.FechaCita}.`;
                enviarCorreo(correos, asunto, mensaje);
                logHistorialClick(user, "Generar cita", `Mascota id: ${nuevaCita.IdMascota}, Veterinario id: ${nuevaCita.IdEncargado}`);
            }
        })
        .catch(error => console.error('Error creating cita:', error.message));
    };

    async function enviarCorreo(correos, asunto, mensaje) {
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
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/citaMedica/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            setCitas(citas.filter(cita => cita.IdCitaMed !== id));
            // Obtener los correos electrónicos del dueño y veterinario
            const citaEliminada = citas.find(cita => cita.IdCitaMed === id);
            if (citaEliminada) {
                const correos = [citaEliminada.DuegnoCorreo, citaEliminada.VetCorreo];
                const asunto = 'Notificación de Eliminación de Cita Médica';
                const mensaje = `La cita médica para la mascota ${citaEliminada.NombreMascota}, del dueño ${citaEliminada.NombrePersona} ha sido Cancelada.`;
                enviarCorreo(correos, asunto, mensaje);
            }
        })
        .catch(error => console.error('Error deleting cita:', error));
    };

    const handleCitaClick = (cita) => {
        logHistorialClick(user, "Ver detalles de la cita", `Cita id: ${cita.IdCitaMed}`);
        if (selectedCita && selectedCita.IdCitaMed === cita.IdCitaMed) {
            setSelectedCita(null); // Oculta los detalles si se vuelve a hacer clic en la cita
        } else {
            setSelectedCita(cita);
        }
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavCliente />
            <main className="main-content">
                <h2>Crear Nueva Cita Médica</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <label>Fecha: </label>
                        <input type="date" name="FechaCita" value={nuevaCita.FechaCita} onChange={handleChange} required />
                        <label>Duración en minutos: </label>
                        <input type="number" name="DuracionCita" value={nuevaCita.DuracionCita} onChange={handleChange} min="15" max="30" required />
                        <label>Mascota: </label>
                        <select name="IdMascota" value={nuevaCita.IdMascota} onChange={handleChange} required>
                            <option value="">-- Seleccione una Mascota --</option>
                            {mascotas.map(mascota => (
                                <option key={mascota.IdMascota} value={mascota.IdMascota}>{mascota.NombreMascota}</option>
                            ))}
                        </select>
                        <label>Veterinario: </label>
                        <select name="IdEncargado" value={nuevaCita.IdEncargado} onChange={handleChange} required>
                            <option value="">-- Seleccione un Veterinario --</option>
                            {veterinarios.map(vet => (
                                <option key={vet.IdPersona} value={vet.IdPersona}>{vet.NombrePersona} {vet.ApellidoPersona}</option>
                            ))}
                        </select>
                        <button type="submit">Crear Cita</button>
                    </form>
                </div>
                <h2>Lista de Citas Médicas</h2>
                <div className="form-container">
                    <label>Estado de la Cita: </label>
                    <select value={estadoCita} onChange={handleEstadoChange}>
                        <option value="1">Atendida</option>
                        <option value="2">No Atendida</option>
                        <option value="3">Cancelada</option>
                    </select>
                </div>
                <div className="list-container">
                    {citas.map(cita => (
                        <div className="list-item" key={cita.IdCitaMed} onClick={() => handleCitaClick(cita)}>
                            <div className="list-item-content">
                                <p><strong>ID Cita:</strong> {cita.IdCitaMed}</p>
                                <p><strong>Fecha:</strong> {new Date(cita.FechaCita).toLocaleDateString()}</p>
                                <p><strong>Duración en minutos:</strong> {cita.DuracionCita}</p>
                                <p><strong>Estado:</strong> {cita.EstadoCita}</p>
                                <p><strong>Veterinario:</strong> {cita.NombreVeterinario || 'N/A'} {cita.ApellidoVeterinario || 'N/A'}</p>
                                <p><strong>Dueño Correo:</strong> {cita.DuegnoCorreo}</p>
                                <p><strong>Veterinario Correo:</strong> {cita.VetCorreo}</p>
                                <p><strong>Mascota:</strong> {cita.NombreMascota}</p>
                                <p><strong>Animal:</strong> {cita.NombreAnimal}</p>
                                {(cita.EstadoCita === 2 || cita.EstadoCita === 3) && (
                                    <button className="form-button" onClick={() => handleDelete(cita.IdCitaMed)}>Eliminar</button>
                                )}
                            </div>
                            {selectedCita && selectedCita.IdCitaMed === cita.IdCitaMed && (
                                <div className="details-container">
                                    <p><strong>Comentarios:</strong> {cita.Comentarios || 'N/A'}</p>
                                    {/* Agregar más detalles de la cita si es necesario */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default CitasMedicas;
