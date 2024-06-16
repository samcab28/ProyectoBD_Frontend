import React, { useState, useEffect, useContext } from 'react'; // Importar useContext desde React
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext'; // Asegúrate de tener acceso al contexto del usuario

function CreateCita() {
    const { user } = useContext(UserContext); // Obtener el contexto del usuario
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
                console.log("estados fetched:", data); // Debug line
                setEstados(data);
            })
            .catch(error => console.error('Error fetching estados:', error));

        // Fetch animales
        fetch('http://localhost:3001/mascota')
            .then(response => response.json())
            .then(data => {
                console.log("mascotas fetched:", data); // Debug line
                setMascotas(data);
            })
            .catch(error => console.error('Error fetching mascotas:', error));
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

        const newCita = {
            FechaCita: FechaCita,
            DuracionCita: Duracion,
            IdMascota: parseInt(Mascota),
            IdEncargado: parseInt(Encargado),
            EstadoCita: parseInt(Estado)
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
                    return response.json(); // Return the response JSON for further processing
                } else {
                    throw new Error('Error al crear cita');
                }
            })
            .then(data => {
                alert('Cita creada exitosamente');
                logHistorialClick(user, "Crear cita", `Cita para mascota ID: ${Mascota} con encargado ID: ${Encargado}`);
                
                // Obtener los correos electrónicos del dueño y veterinario
                const citaCreada = data;
                if (citaCreada) {
                    const correos = [citaCreada.DuegnoCorreo, citaCreada.VetCorreo];
                    const asunto = 'Notificación de Creación de Cita Médica';
                    const mensaje = `La cita médica para la mascota ${citaCreada.NombreMascota}, del dueño ${citaCreada.NombrePersona} ha sido creada para el día ${citaCreada.FechaCita}.`;
                    enviarCorreo(correos, asunto, mensaje);
                }

                window.location.reload(); // Recargar la página
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert('Error al crear cita');
            });
    }

    function handleReset(e) {
        logHistorialClick(user, "Resetear formulario", "Formulario de creación de cita reseteado");
        setFechaCita('');
        setDuracion('');
        setEncargado('');
        setMacota('');
        setEstado('');
    }

    return (
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
                <br />
                <label>
                    Duración:
                    <input
                        name="Duracion"
                        type="text"
                        value={Duracion}
                        onChange={e => setDuracion(e.target.value)}
                    />
                </label>
                <br />
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
                <br />
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
                <br />
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
                <br />
                <button type="reset" onClick={handleReset}>Reset data</button>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default CreateCita;
