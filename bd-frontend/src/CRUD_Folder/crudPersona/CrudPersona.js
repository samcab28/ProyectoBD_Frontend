import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePersona from "./CreatePersona";



function PersonaList() {
    const navigate = useNavigate();
    const [personas, setPersonas] = useState([]);
    const [tiposPersona, setTiposPersona] = useState({});
    const [sexos, setSexos] = useState({});

    const handleRegresar = () => {
        navigate('/crud'); // Cambia '/another' por la ruta deseada
    };

    useEffect(() => {
        // Fetch personas
        fetch('http://localhost:3001/persona')
            .then(response => response.json())
            .then(data => {
                console.log("Personas fetched:", data); // Debug line
                setPersonas(data);
            })
            .catch(error => console.error('Error fetching personas:', error));

        // Fetch tipos de persona
        fetch('http://localhost:3001/tipoPersona')
            .then(response => response.json())
            .then(data => {
                console.log("Tipos de Persona fetched:", data); // Debug line
                const tiposMap = {};
                data.forEach(tipo => {
                    tiposMap[tipo.IdTipoPer] = tipo.Puesto; // Ajusta según la estructura de tu respuesta
                });
                console.log("Tipos de Persona Map:", tiposMap); // Debug line
                setTiposPersona(tiposMap);
            })
            .catch(error => console.error('Error fetching tiposPersona:', error));

        // Fetch sexos
        fetch('http://localhost:3001/sexo')
            .then(response => response.json())
            .then(data => {
                console.log("Sexos fetched:", data); // Debug line
                const sexosMap = {};
                data.forEach(sexo => {
                    sexosMap[sexo.IdSexo] = sexo.TipoSexo; // Ajusta según la estructura de tu respuesta
                });
                console.log("Sexos Map:", sexosMap); // Debug line
                setSexos(sexosMap);
            })
            .catch(error => console.error('Error fetching sexos:', error));
    }, []);

    function handleMod(id) {
        console.log("implementar logica");
    }

    function handleDelete(id) {
        fetch(`http://localhost:3001/persona/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setPersonas(personas.filter(persona => persona.IdPersona !== id));
                    window.location.reload();
                } else {
                    alert('Error deleting persona');
                }
            })
            .catch(error => console.error('Error deleting persona:', error));
    }

    return (
        <div>
            <CreatePersona/>
            <h2>Listado de Personas</h2>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Usuario</th>
                    <th>Contraseña</th>
                    <th>Puesto</th>
                    <th>Sexo</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {personas.map(persona => (
                    <tr key={persona.IdPersona}>
                        <td>{persona.IdPersona}</td>
                        <td>{persona.NombrePersona}</td>
                        <td>{persona.ApellidoPersona}</td>
                        <td>{persona.CorreoPersona}</td>
                        <td>{persona.TelefonoPersona}</td>
                        <td>{persona.UsuarioPersona}</td>
                        <td>{persona.PasswordPersona}</td>
                        <td>{tiposPersona[persona.TipoPersona]}</td>
                        <td>{sexos[persona.Sexo]}</td>
                   
                    </tr>
                ))}
                </tbody>
            </table>

     
       </div>
    );
}

export default PersonaList;
