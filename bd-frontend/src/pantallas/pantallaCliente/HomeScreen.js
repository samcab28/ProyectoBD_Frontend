import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'; // Importa el contexto de usuario
import '../../Styles/PageContainer.css'; // Asegúrate de importar el archivo CSS
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";

function HomeScreen() {
    const [products, setProducts] = useState([]);
    const { user } = useContext(UserContext); // Obtén la información del usuario del contexto

    useEffect(() => {
        fetch('http://localhost:3001/producto')
            .then(response => response.json())
            .then(data => {
                console.log("Productos fetched:", data); // Debug line
                setProducts(data);
                data.forEach(product => console.log("Image URL:", product.IdURL)); // Imprimir las URLs de las imágenes
            })
            .catch(error => console.error('Error fetching productos:', error));
    }, []);

    const handleAddToCart = (IdProducto) => {
        if (user && user.IdPersona) {
            fetch('http://localhost:3001/carrito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    IdPersona: user.IdPersona,
                    IdProducto: IdProducto,
                    Cantidad: 1
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Producto agregado al carrito:", data);
                    // Aquí podrías añadir algún mensaje de confirmación para el usuario
                })
                .catch(error => console.error('Error al agregar producto al carrito:', error));
        } else {
            console.error('Usuario no autenticado');
            // Aquí podrías redirigir al usuario a la página de pantallaLogin o mostrar un mensaje
        }
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
                <h2>Lista de Productos</h2>
                <div className="product-grid">
                    {products.map(product => (
                        <div className="product-card" key={product.IdProducto}>
                            <div className="product-info">
                                <img src={`http://localhost:3001/images/${product.IdURL}`} alt={product.NombreProducto} className="product-image" />
                                <p><strong>Nombre:</strong> {product.NombreProducto}</p>
                                <p><strong>Precio:</strong> {product.PrecioProducto}</p>
                                <p><strong>Disponibles:</strong> {product.CantidadDisponible}</p>
                                <p><strong>Descripción:</strong> {product.DescripcionProducto}</p>
                                <button onClick={() => handleAddToCart(product.IdProducto)}>Agregar al Carrito</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default HomeScreen;
