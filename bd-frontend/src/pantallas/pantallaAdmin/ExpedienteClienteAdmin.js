import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavAdmin from "./NavAdmin";

function ExpedienteClienteAdmin(){

    const [busqueda, setBusqueda] = useState('');
    const [expedientes, setExpedientes] = useState([]);
    const [expedienteFiltrado, setExpedienteFiltrado] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/expediente')
            .then(response => response.json())
            .then(data => setExpedientes(data))
            .catch(error => console.error('Error fetching expediente:', error));
    }, []);

    useEffect(() => {
        if (expedienteFiltrado === 'Duegno') {
            fetch('http://localhost:3001/persona/tipo/3')
                .then(response => response.json())
                .then(data => {
                    console.log("cliente fetched:", data);
                    setUsuarios(data);
                })
                .catch(error => console.error('Error fetching cliente:', error));
        } else if (expedienteFiltrado === 'Mascota') {
            fetch('http://localhost:3001/mascota')
                .then(response => response.json())
                .then(data => {
                    console.log("mascota fetched:", data);
                    setMascotas(data);
                })
                .catch(error => console.error('Error fetching mascota:', error));
        }
    }, [expedienteFiltrado]);

    function handleSubmit(e) {
        e.preventDefault();
        
        if(expedienteFiltrado === 'Mascota'){
            fetch(`http://localhost:3001/expedienteMascota/${busqueda}`)
            .then(response => response.json())
            .then(data => {
                console.log("expediente fetched:", data); 
                setExpedientes(data);
            })
            .catch(error => console.error('Error fetching expediente:', error));
        } else{
            fetch(`http://localhost:3001/expedienteDuegno/${busqueda}`)
            .then(response => response.json())
            .then(data => {
                console.log("expediente fetched:", data); 
                setExpedientes(data);
            })
            .catch(error => console.error('Error fetching expediente:', error)); 
        }
    }

    function reset() {
        setBusqueda('');
        setExpedienteFiltrado('');
        fetch('http://localhost:3001/expediente')
            .then(response => response.json())
            .then(data => setExpedientes(data))
            .catch(error => console.error('Error fetching expediente:', error));
    }

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavAdmin/>
            <main className="main-content">
                <h2>Expedientes de los clientes</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Filtrar por:
                        <select
                            name="filtrar"
                            value={expedienteFiltrado}
                            onChange={e => setExpedienteFiltrado(e.target.value)}
                        >
                            <option value="">Selecciona un filtro</option>
                            <option value="Duegno">Duegno</option>
                            <option value="Mascota">Mascota</option>
                        </select>
                    </label>
                    <br />
                    {expedienteFiltrado === 'Duegno' && (
                        <label>
                            Duegno:
                            <select
                                name="busqueda"
                                value={busqueda}
                                onChange={e => setBusqueda(e.target.value)}
                            >
                                <option value="">Seleccione un dueño</option>
                                {usuarios.map(user => (
                                    <option key={user.IdPersona} value={user.IdPersona}>
                                        {user.IdPersona}, {user.NombrePersona} {user.ApellidoPersona}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}
                    {expedienteFiltrado === 'Mascota' && (
                        <label>
                            Mascota:
                            <select
                                name="busqueda"
                                value={busqueda}
                                onChange={e => setBusqueda(e.target.value)}
                            >
                                <option value="">Seleccione una mascota</option>
                                {mascotas.map(mascota => (
                                    <option key={mascota.IdMascota} value={mascota.IdMascota}>
                                        {mascota.NombreMascota}
                                    </option>
                                ))}
                            </select>
                        </label>
                    )}              
                    <button type="submit">Buscar</button>
                    <button type="button" onClick={reset}>Reset </button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Comentarios</th>
                            <th>Fecha_Cita</th>
                            <th>Veterinario</th>
                            <th>Duegno</th>
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
                                <td>{expediente.NombreVeterinario}</td>
                                <td>{expediente.Duegno}</td>
                                <td>{expediente.NombreMascota}</td>
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