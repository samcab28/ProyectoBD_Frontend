import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../Styles/PageContainer.css';

function Mascotas() {
    const [mascotas, setMascotas] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/mascotaDuenio/${user.IdPersona}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Mascotas fetched:", data);
                    setMascotas(data);
                })
                .catch(error => console.error('Error fetching mascotas:', error));
        }
    }, [user]);

    return (
        <div className="home-screen">
            <header className="header">
                <img src="https://via.placeholder.com/1500x150" alt="Banner" className="header-image" />
            </header>
            <nav className="sidebar">
                <h2>Navegación</h2>
                <ul>
                    <li><Link to="/home"><button>Products</button></Link></li>
                    <li><Link to="/about"><button>About</button></Link></li>
                    <li><Link to="/"><button>Logout</button></Link></li>
                    <li><Link to="/carrito"><button>Carrito</button></Link></li>
                    <li><Link to="/mascotas"><button>Mascotas</button></Link></li>
                </ul>
            </nav>
            <main className="main-content">
                <h2>Lista de Mascotas</h2>
                <div className="product-grid">
                    {mascotas.map(mascota => (
                        <div className="product-card" key={mascota.IdMascota}>
                            <div className="product-info">
                                <p><strong>Nombre:</strong> {mascota.NombreMascota}</p>
                                <p><strong>Raza:</strong> {mascota.RazaAnimal}</p>
                                <p><strong>Edad:</strong> {mascota.Edad}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Mascotas;
