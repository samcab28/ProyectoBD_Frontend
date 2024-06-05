import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CreateCita from './CrearCita';

function GestionCitas(){
    const navigate = useNavigate(); 
    const [citas, setCitas] = useState([]);
    const handleRegresar = () => {
        navigate('/admin/citasMedica'); 
    };

    function handleDelete(id){
        fetch(`http://localhost:3001/citaMedica/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Remove the deleted persona from the state
                setCitas(citas.filter(cita => cita.IdAnimal !== id));
                window.location.reload();
            } else {
                alert('Error deleting cita');
            }
        })
        .catch(error => console.error('Error deleting cita:', error));

    }

    function handleMod(id){
        console.log("implementar logica");
    }

    useEffect(() => {
        fetch('http://localhost:3001/citaMedica')
            .then(response => response.json())
            .then(data => setCitas(data))
            .catch(error => console.error('Error fetching citas:', error));
    }, []);

    return (
        <div>
            <h1>Gestión de Citas Médicas</h1>
            <CreateCita/>
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

                        <td>
                            <button onClick={() => handleDelete(cita.IdCitaMed)}>Eliminar</button>
                            <button onClick={() => handleMod(cita.IdCitaMed)}>Modificar</button>
                        </td>
                    </tr>
                ))}
                </tbody>       
            </table>
            
            <button onClick={handleRegresar}>Regresar</button>
        </div>
    );
}

export default GestionCitas;