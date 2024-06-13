import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logHistorialClick from '../../seguridad/historialClick'; // Asegúrate de importar la función logHistorialClick
import { UserContext } from '../../context/UserContext'; // Importar el contexto de usuario

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
            } else {
                alert('Error al modificar la cita');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    }

    return (
        <div>
            <h1>Cancelación de Cita Médica</h1>
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
                            <option key={cita.IdCitaMed} value={cita.IdCitaMed}>
                                {cita.IdCitaMed}, {cita.FechaCita}, {cita.NombreMascota}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <button type="submit">Cancelar Cita</button>
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

export default CancelarCita;
