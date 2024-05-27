import React, { useState, useEffect } from 'react';

function PersonaList() {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        // Simulate a fetch request to get personas from the server
        // Replace 'your-api-endpoint' with your actual API endpoint
        fetch('http://localhost:3001/persona')
            .then(response => response.json())
            .then(data => setPersonas(data))
            .catch(error => console.error('Error fetching personas:', error));
    }, []);

    function handleMod(id){
        console.log("implementar logica");
    }
    function handleDelete(id) {
        // Simulate a fetch request to delete a persona
        // Replace 'your-api-endpoint' with your actual API endpoint
        fetch(`http://localhost:3001/persona/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted persona from the state
                    setPersonas(personas.filter(persona => persona.IdPersona !== id));
                } else {
                    console.error('Error deleting persona');
                }
            })
            .catch(error => console.error('Error deleting persona:', error));
    }

    return (
        <div>
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
                    <th>Contrasena</th>
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
                        <td>{persona.TipoPersona}</td>
                        <td>{persona.Sexo}</td>
                        <td>
                            <button onClick={() => handleDelete(persona.IdPersona)}>Eliminar</button>
                            <button onClick={() => handleMod(persona.IdPersona)}>Modificar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PersonaList;
