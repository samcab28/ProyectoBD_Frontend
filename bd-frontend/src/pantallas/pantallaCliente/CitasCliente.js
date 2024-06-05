import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css';
import '../../Styles/FormsTarjeta.css';
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from '../../pantallas/pantallaCliente/NavCliente';

function CitasMedicas() {
    const [citas, setCitas] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);
    const { user } = useContext(UserContext);
    const [estadoCita, setEstadoCita] = useState(1);
    const [nuevaCita, setNuevaCita] = useState({
        FechaCita: '',
        DuracionCita: '',
        IdMascota: '',
        IdEncargado: '',
        EstadoCita: 1
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/citaMedica/${user.IdPersona}/${estadoCita}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Citas fetched:", data); // Debug line
                    setCitas(data);
                })
                .catch(error => console.error('Error fetching citas:', error));

            fetch(`http://localhost:3001/mascotaDuenio/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Mascotas fetched:", data); // Debug line
                    setMascotas(data);
                })
                .catch(error => console.error('Error fetching mascotas:', error));

            fetch('http://localhost:3001/persona/tipo/2')
                .then(response => response.json())
                .then(data => {
                    console.log("Veterinarios fetched:", data); // Debug line
                    setVeterinarios(data);
                })
                .catch(error => console.error('Error fetching veterinarios:', error));
        }
    }, [user, estadoCita]);

    const handleEstadoChange = (event) => {
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

        if (nuevaCita.DuracionCita < 1 || nuevaCita.DuracionCita > 3) {
            setError('La duración de la cita debe ser entre 1 y 3 horas.');
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
        })
        .catch(error => console.error('Error creating cita:', error.message));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/citaMedica/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            setCitas(citas.filter(cita => cita.IdCitaMed !== id));
        })
        .catch(error => console.error('Error deleting cita:', error));
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
                        <label>Duración en horas: </label>
                        <input type="number" name="DuracionCita" value={nuevaCita.DuracionCita} onChange={handleChange} min="1" max="3" required />
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
                <div className="product-grid">
                    {citas.map(cita => (
                        <div className="product-card" key={cita.IdCitaMed}>
                            <div className="product-info">
                                <p><strong>Fecha:</strong> {cita.FechaCita}</p>
                                <p><strong>Duración:</strong> {cita.DuracionCita}</p>
                                <p><strong>Estado:</strong> {cita.EstadoCita}</p>
                                <p><strong>Veterinario:</strong> {cita.NombreVeterinario || 'N/A'} {cita.ApellidoVeterinario || 'N/A'}</p>
                                <p><strong>Mascota:</strong> {cita.NombreMascota}</p>
                                <p><strong>Animal:</strong> {cita.NombreAnimal}</p>
                                <button className="form-button" onClick={() => handleDelete(cita.IdCitaMed)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default CitasMedicas;
