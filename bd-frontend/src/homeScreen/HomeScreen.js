import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/PageContainer.css'; // Asegúrate de importar el archivo CSS

function HomeScreen() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/producto')
            .then(response => response.json())
            .then(data => {
                console.log("Productos fetched:", data); // Debug line
                setProducts(data);
            })
            .catch(error => console.error('Error fetching productos:', error));
    }, []);

    return (
        <div className="home-screen">
            <header className="header">
                <img src="https://via.placeholder.com/1500x150" alt="Banner" className="header-image" />
            </header>
            <nav className="sidebar">
                <h2>Navegación</h2>
                <ul>
                    <li><Link to="/home"><button>Home</button></Link></li>
                    <li><Link to="/about"><button>About</button></Link></li>
                    <li><Link to="/"><button>Login</button></Link></li>
                    <li><Link to="/carrito"><button>Carrito</button></Link></li>
                </ul>
            </nav>
            <main className="main-content">
                <h2>Lista de Productos</h2>
                <div className="product-grid">
                    {products.map(product => (
                        <div className="product-card" key={product.IdProducto}>
                            <div className="product-info">
                                <p><strong>Nombre:</strong> {product.NombreProducto}</p>
                                <p><strong>Precio:</strong> {product.PrecioProducto}</p>
                                <p><strong>Disponibles:</strong> {product.CantidadDisponible}</p>
                                <p><strong>Descripción:</strong> {product.DescripcionProducto}</p>
                                <p><strong>URL:</strong> {product.IdURL}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default HomeScreen;
