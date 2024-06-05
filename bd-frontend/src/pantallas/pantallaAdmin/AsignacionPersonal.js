import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AsignacionPersonal(){
    const navigate = useNavigate(); 
    const [citas, setCitas] = useState([]);
    const handleRegresar = () => {
        navigate('/admin/citasMedica'); 
    };

    useEffect(() => {
        fetch('http://localhost:3001/citaMedica')
            .then(response => response.json())
            .then(data => setCitas(data))
            .catch(error => console.error('Error fetching citas:', error));
    }, []);

    return (
        <div>
            <h1>Asignación de Personal a Cita Médica</h1>

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