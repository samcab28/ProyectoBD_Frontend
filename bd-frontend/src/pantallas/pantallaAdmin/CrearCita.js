import React, { useState, useEffect } from 'react';

function CreateCita(){
    const [FechaCita, setFechaCita] = useState('');
    const [Duracion, setDuracion] = useState('');
    const [Encargado, setEncargado] = useState('');
    const [Mascota, setMacota] = useState('');
    const [Estado, setEstado] = useState('');

    const [personas, setPersonas] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        // Fetch personas (veterinarios)
        fetch('http://localhost:3001/persona/tipo/2') 
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setPersonas(data);
            })
            .catch(error => console.error('Error fetching personas:', error));
        
        // Fetch estados (de cita)
        fetch('http://localhost:3001/estadoCita') 
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setEstados(data);
            })
            .catch(error => console.error('Error fetching personas:', error));

        // Fetch animales
        fetch('http://localhost:3001/mascota')
            .then(response => response.json())
            .then(data => {
                console.log("productos fetched:", data); // Debug line
                setMascotas(data);
            })
            .catch(error => console.error('Error fetching productos:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const newCita = {
            FechaCita: FechaCita,
            DuracionCita: Duracion,
            IdMascota: parseInt(Mascota),
            IdEncargado: parseInt(Encargado),
            EstadoCita : parseInt(Estado)
        };

        fetch('http://localhost:3001/citaMedica', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCita)
        })
            .then(response => {
                if (response.ok) {
                    alert('Cita creada exitosamente');
                    window.location.reload(); // Recargar la página
                } else {
                    alert('Error al crear cita');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    return(
        <div>
            <h2>Crear Cita</h2>
            <form onSubmit={handleSubmit}>
            <label>
                    Fecha:
                    <input
                        name="fechaCita"
                        type="date"
                        value={FechaCita}
                        onChange={e => setFechaCita(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Duración:
                    <input
                        name="Duracion"
                        type="text"
                        value={Duracion}
                        onChange={e => setDuracion(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Encargado:
                    <select
                        name="encargado"
                        value={Encargado}
                        onChange={e => setEncargado(e.target.value)}
                    >
                        <option value="">Selecciona un encargado</option>
                        {personas.map(persona => (
                            <option key={persona.IdPersona} value={persona.IdPersona}>{persona.NombrePersona} {persona.ApellidoPersona}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Mascota:
                    <select
                        name="mascota"
                        value={Mascota}
                        onChange={e => setMacota(e.target.value)}
                    >
                        <option value="">Selecciona una mascota</option>
                        {mascotas.map(mascota => (
                            <option key={mascota.IdMascota} value={mascota.IdMascota}>{mascota.NombreMascota} </option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Estado:
                    <select
                        name="estado"
                        value={Estado}
                        onChange={e => setEstado(e.target.value)}
                    >
                        <option value="">Selecciona un estado</option>
                        {estados.map(estado => (
                            <option key={estado.IdEstCita} value={estado.IdEstCita}>{estado.TipoEstCita} </option>
                        ))}
                    </select>
                </label>
                <br/>
                <button type="reset">Reset data</button>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default CreateCita;