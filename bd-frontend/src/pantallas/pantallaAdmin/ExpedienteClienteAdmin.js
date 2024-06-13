import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavAdmin from "./NavAdmin";
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext'; // Asegúrate de que tengas acceso al contexto del usuario

function ExpedienteClienteAdmin() {
    const { user } = useContext(UserContext); // Obtener el contexto del usuario
    const [busqueda, setBusqueda] = useState('');
    const [expedientes, setExpedientes] = useState([]);
    const [expedienteFiltrado, setExpedienteFiltrado] = useState([]);

    const expedientesFiltrados = [];
    expedientesFiltrados.push(<option key={'Duegno'} value={'Duegno'}>{'Duegno'}</option>);
    expedientesFiltrados.push(<option key={'Mascota'} value={'Mascota'}>{'Mascota'}</option>);

    const handleInputChange = (event) => {
        setBusqueda(event.target.value);
    };

    useEffect(() => {
        fetch('http://localhost:3001/expediente')
            .then(response => response.json())
            .then(data => setExpedientes(data))
            .catch(error => console.error('Error fetching expediente:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
    }
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
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavAdmin />
            <main className="main-content">
                <h2>Expedientes de los clientes</h2>
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={busqueda}
                    onChange={handleInputChange}
                />
                <form onSubmit={handleSubmit}>
            <label>
                    Filtrar por:
                    <select
                        name="filtrar"
                        value={expedienteFiltrado}
                        onChange={e => setExpedienteFiltrado(e.target.value)}
                    >
                       <option value="">Selecciona un filtro</option>
                       {expedientesFiltrados}
                    </select>
                </label>
                <br/>
                <button type="submit">Buscar</button>
            </form>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Comentarios</th>
                            <th>Fecha_Cita</th>
                            <th>Encargado</th>
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
                                <td>{expediente.Veterinario}</td>
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
