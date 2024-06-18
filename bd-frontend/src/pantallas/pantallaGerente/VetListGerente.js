import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavGerente from './NavGerente';

import CreateVet from '../CRUDSPantallas/CreateVet';
import ModifyVet from '../CRUDSPantallas/ModifiyVet';

function VetList() {
    const navigate = useNavigate();
    const [personas, setPersonas] = useState([]);
    const [tiposPersona, setTiposPersona] = useState({});
    const [sexos, setSexos] = useState({});

    useEffect(() => {
        // Fetch personas
        fetch('http://localhost:3001/persona/tipo/2')
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

    const handleRegresar = () => {
        navigate('/gerente/gestion'); // Cambia '/another' por la ruta deseada
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavGerente/>
            <main className="crud">
            <h1>Gestión de Veterinarios</h1>
            <CreateVet/>
            <ModifyVet/>
            <h3>Listado de Veterinarios</h3>
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
                        <td>
                            <button onClick={() => handleDelete(persona.IdPersona)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </main>
       </div>
    );
}

export default VetList