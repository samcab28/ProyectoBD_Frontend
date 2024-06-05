import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AsignacionPersonal(){
    const [Encargado, setEncargado] = useState('');
    const [Cita, setCita] = useState('');

    const navigate = useNavigate(); 
    const [citas, setCitas] = useState([]);
    const handleRegresar = () => {
        navigate('/admin/citasMedica'); 
    };

    const [veterinarios, setVeterinarios] = useState([]);

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
            .then(data => setCitas(data))
            .catch(error => console.error('Error fetching citas:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
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
                            <option key={cita.IdCitaMed} value={cita.IdCitaMed}>{cita.IdCitaMed} </option>
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
                <button type="submit">Guardar</button>
            </form>
            <h2>Listado de Citas Médicas</h2>
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>FechaCita</th>
                    <th>Duracion</th>
                    <th>Mascota</th>
                    <th>Encargado</th>
                    <th>Estado</th>
                    </tr> 
                    </thead>
                    <tbody>
                {citas.map(cita => (
                    <tr key={cita.IdCitaMed}>
                        <td>{cita.IdCitaMed}</td>
                        <td>{cita.FechaCita}</td>
                        <td>{cita.Duracion}</td>
                        <td>{cita.NombreMascota}</td>
                        <td>{cita.Encargado}</td>
                        <td>{cita.TipoEstCita}</td>

                    </tr>
                ))}
                </tbody>       
            </table>
            
            <button onClick={handleRegresar}>Regresar</button>
        </div>
    );
}

export default AsignacionPersonal;