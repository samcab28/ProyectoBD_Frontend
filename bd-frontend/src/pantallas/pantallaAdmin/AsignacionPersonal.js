import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logHistorialClick from '../../seguridad/historialClick'; // Asegúrate de importar la función logHistorialClick
import { UserContext } from '../../context/UserContext'; // Importar el contexto de usuario

function AsignacionPersonal() {
    const [Encargado, setEncargado] = useState('');
    const [Cita, setCita] = useState('');
    const { user } = useContext(UserContext); // Obtener el contexto del usuario

    const navigate = useNavigate();
    const [EncargadosCitas, setEncargadosCitas] = useState([]);
    const [citas, setCitas] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);

    const handleRegresar = () => {
        logHistorialClick(user, "Navegacion", "/admin/citasMedica");
        navigate('/admin/citasMedica');
    };

    useEffect(() => {
        // Fetch personas (veterinarios)
        fetch('http://localhost:3001/persona/tipo/2')
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setVeterinarios(data);
            })
            .catch(error => console.error('Error fetching personas:', error));

        fetch('http://localhost:3001/citaMedica')
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setCitas(data);
            })
            .catch(error => console.error('Error fetching personas:', error));

        fetch('http://localhost:3001/personalEncargado')
            .then(response => response.json())
            .then(data => setEncargadosCitas(data))
            .catch(error => console.error('Error fetching citas:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const newPersonalEncargado = {
            IdPersona: parseInt(Encargado),
            IdCita: parseInt(Cita),
        };

        fetch('http://localhost:3001/personalEncargado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPersonalEncargado)
        })
        .then(response => {
            if (response.ok) {
                logHistorialClick(user, "Asignar Personal", `Cita ID: ${Cita}, Encargado ID: ${Encargado}`);
                alert('Personal agregado exitosamente');
                window.location.reload(); // Recargar la página
            } else {
                alert('Error al agregar personal a la cita');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    }

    return (
        <div>
            <h1>Asignación de Personal a Cita Médica</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Cita:
                    <select
                        name="cita"
                        value={Cita}
                        onChange={e => setCita(e.target.value)}
                    >
                        <option value="">Seleccione una cita</option>
                        {citas.map(cita => (
                            <option key={cita.IdCitaMed} value={cita.IdCitaMed}>{cita.IdCitaMed}</option>
                        ))}
                    </select>
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
                        {veterinarios.map(persona => (
                            <option key={persona.IdPersona} value={persona.IdPersona}>{persona.NombrePersona} {persona.ApellidoPersona}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <button type="submit">Asignar</button>
            </form>
            <h2>Listado de Citas Médicas</h2>
            <table>
                <thead>
                    <tr>
                        <th>IdCita</th>
                        <th>FechaCita</th>
                        <th>Encargados</th>
                    </tr>
                </thead>
                <tbody>
                    {EncargadosCitas.map(cita => (
                        <tr key={cita.IdCitaMed}>
                            <td>{cita.IdCitaMed}</td>
                            <td>{cita.FechaCita}</td>
                            <td>{cita.Encargados}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleRegresar}>Regresar</button>
        </div>
    );
}

export default AsignacionPersonal;
