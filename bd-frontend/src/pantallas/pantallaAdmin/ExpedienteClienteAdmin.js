import React, { useContext, useEffect, useState } from 'react';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavAdmin from "./NavAdmin";
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css';

function ExpedienteClienteAdmin() {
    const { user } = useContext(UserContext);
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
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavAdmin />
            <main className="main-content">
                <h2>Expedientes de los clientes</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <label>
                        Filtrar por:
                        <select
                            name="filtrar"
                            value={expedienteFiltrado}
                            onChange={e => setExpedienteFiltrado(e.target.value)}
                            className="form-select"
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
                                className="form-select"
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
                                className="form-select"
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
                    <br/>
                    <button type="submit" className="form-button">Buscar</button>
                    <button type="button" onClick={reset} className="form-button">Reset</button>
                </form>
                <div className="product-grid">
                    {expedientes.map(expediente => (
                        <div className="product-card" key={expediente.IdExpediente}>
                            <div className="product-info">
                                <p><strong>Id:</strong> {expediente.IdExpediente}</p>
                                <p><strong>Comentarios:</strong> {expediente.Comentarios}</p>
                                <p><strong>Fecha Cita:</strong> {expediente.FechaCita}</p>
                                <p><strong>Veterinario:</strong> {expediente.NombreVeterinario}</p>
                                <p><strong>Duegno:</strong> {expediente.Duegno}</p>
                                <p><strong>Mascota:</strong> {expediente.NombreMascota}</p>
                                <p><strong>Productos Recetados:</strong> {expediente.ProductosRecetados}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ExpedienteClienteAdmin;
