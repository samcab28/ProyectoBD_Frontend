import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavAdmin from "./NavAdmin";

function ExpedienteClienteAdmin(){

    const [busqueda, setBusqueda] = useState('');
    const [expedientes, setExpedientes] = useState([]);
    const [expedientesFiltrados, setExpedientesFiltrados] = useState([]);

    const handleInputChange = (event) => {
        setBusqueda(event.target.value);
    };

    useEffect(() => {
        fetch('http://localhost:3001/expediente')
            .then(response => response.json())
            .then(data => setExpedientes(data))
            .catch(error => console.error('Error fetching expediente:', error));
    }, []);

    //filtro
    /*
    const expedientesFiltrados = expedientes.filter(expediente =>
        expediente.veterinario.toLowerCase().includes(busqueda.toLowerCase()) ||
        expediente.mascota.toLowerCase().includes(busqueda.toLowerCase()) 
    );
    */ 
    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavAdmin/>
            <main className="main-content">
                <h2>Expedentes de los clientes</h2>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={handleInputChange}
                />
                <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Comentarios</th>
                    <th>Fecha_Cita</th> 
                    <th>Encargado</th>
                    <th>Mascota</th>
                    <th>ProductosRecetados</th>
                    </tr> 
                    </thead>      
                    <tbody>
                {expedientes.map(expediente => (
                    <tr key={expediente.IdExpediente}>
                        <td>{expediente.IdExpediente}</td>
                        <td>{expediente.Comentarios}</td>
                        <td>{expediente.FechaCita}</td>
                        <td>{expediente.Veterinario}</td>
                        <td>{expediente.Duegno}</td>
                        <td>{expediente.ProductosRecetados}</td>
                    </tr>
                ))}
                </tbody>        
            </table>
            </main>
        </div>
    );
}

export default ExpedienteClienteAdmin;
