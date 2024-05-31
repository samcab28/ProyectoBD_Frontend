// Carrito.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/PageContainer.css'; // Importa el archivo de estilos

function Carrito() {
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
                    <li><Link to="/citasmedicas"><button>Citas Médicas</button></Link></li>
                </ul>
            </nav>
            <main className="main-content">
                <h2>Sobre Nosotros</h2>
                <p>Holaaaaaaaaaaaaaaaaa</p>
                <p>Estebitan Mi Amor uwu </p>
                <Link to="/">
                    <button>Regresar</button>
                </Link>
            </main>
        </div>
    );
}

export default Carrito;
