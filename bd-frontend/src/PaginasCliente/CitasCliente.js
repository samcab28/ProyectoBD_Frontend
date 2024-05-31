// src/PaginasCliente/CitasMedicas.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../Styles/PageContainer.css';
import fondoVet from '../Imagenes/FondoVet.jpg';

function CitasMedicas() {
    const [citas, setCitas] = useState([]);
    const { user } = useContext(UserContext);
    const [estadoCita, setEstadoCita] = useState(1); // Estado predeterminado como Atendida

    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/citaMedica/${user.IdPersona}/${estadoCita}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Citas fetched:", data);
                    setCitas(data);
                })
                .catch(error => console.error('Error fetching citas:', error));
        }
    }, [user, estadoCita]);

    const handleEstadoChange = (event) => {
        setEstadoCita(event.target.value);
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <nav className="sidebar">
                <h2>Navegación</h2>
                <ul>
                    <li><Link to="/home"><button>Products</button></Link></li>
                    <li><Link to="/about"><button>About</button></Link></li>
                    <li><Link to="/"><button>Logout</button></Link></li>
                    <li><Link to="/carrito"><button>Carrito</button></Link></li>
                    <li><Link to="/mascotas"><button>Mascotas</button></Link></li>
                    <li><Link to="/citas-medicas"><button>Citas Médicas</button></Link></li>
                </ul>
            </nav>
            <main className="main-content">
                <h2>Lista de Citas Médicas</h2>
                <div>
                    <label>Estado de la Cita: </label>
                    <select value={estadoCita} onChange={handleEstadoChange}>
                        <option value="1">Atendida</option>
                        <option value="2">No Atendida</option>
                        <option value="3">Cancelada</option>
                    </select>
                </div>
                <div className="product-grid">
                    {citas.map(cita => (
                        <div className="product-card" key={cita.IdCitaMed}>
                            <div className="product-info">
                                <p><strong>Fecha:</strong> {cita.FechaCita}</p>
                                <p><strong>Duración:</strong> {cita.DuracionCita}</p>
                                <p><strong>Estado:</strong> {cita.EstadoCita}</p>
                                <p><strong>Veterinario:</strong> {cita.NombrePersona} {cita.ApellidoPersona}</p>
                                <p><strong>Mascota:</strong> {cita.NombreMascota}</p>
                                <p><strong>Animal:</strong> {cita.NombreAnimal}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default CitasMedicas;
