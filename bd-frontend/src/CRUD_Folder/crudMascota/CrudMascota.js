import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import CreateMascota from "./CreateMascota";

function MascotaList() {
    const navigate = useNavigate();
    const [mascotas, setMascotas] = useState([]);


    useEffect(() => {
        // Fetch personas
        fetch('http://localhost:3001/mascotaDetalle')
            .then(response => response.json())
            .then(data => {
                console.log("mascotas fetched:", data); // Debug line
                setMascotas(data);
            })
            .catch(error => console.error('Error fetching mascotas:', error));
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost:3001/mascota/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setMascotas(mascotas.filter(mascota => mascota.IdMascota!== id));
                    window.location.reload();
                } else {
                    alert('Error deleting mascota');
                }
            })
            .catch(error => console.error('Error deleting mascota:', error));
    }

    const handleRegresar = () => {
        navigate('/crud'); // Cambia '/another' por la ruta deseada
    };

    const handleMod = () => {
        console.log("implementar");
    };

    return (
        <div>
            <h1>crud de mascotas</h1>
            <CreateMascota/>
            <h2>listado de mascotas</h2>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Sexo</th>
                    <th>Animal</th>
                    <th>Nombre Duegno</th>
                </tr>
                </thead>
                <tbody>
                {mascotas.map(mascota => (
                    <tr key={mascota.IdMascota}>
                        <td>{mascota.IdMascota}</td>
                        <td>{mascota.NombreMascota}</td>
                        <td>{mascota.Edad}</td>
                        <td>{mascota.TipoSexo}</td>
                        <td>{mascota.NombreAnimal}</td>
                        <td>{mascota.NombrePersona}</td>
                        <td>
                            <button onClick={() => handleDelete(mascota.IdMascota)}>Eliminar</button>
                            <button onClick={() => handleMod(mascota.IdMascota)}>Modificar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleRegresar}>regresar</button>
        </div>
    );

}

export default MascotaList;
