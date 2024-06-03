// src/PaginasCliente/ProductoCliente.js
import React, { useContext, useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css';
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";
import ProductImage from '../../Imagenes/ProductImage.js'; // Importa el nuevo componente

function ProductoCliente() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:3001/producto')
            .then(response => response.json())
            .then(data => {
                console.log("Productos fetched:", data);
                setProducts(data);
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
                })
                .catch(error => console.error('Error al agregar producto al carrito:', error));
        } else {
            console.error('Usuario no autenticado');
        }
    };

    const handleResenaGo = (IdProducto) => {
        navigate(`/cliente/resena/${IdProducto}`);
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
                <h2>Lista de Productos</h2>
                <div className="product-grid">
                    {products.map(product => (
                        <div className="product-card" key={product.IdProducto}>
                            <ProductImage url={product.IdURL} alt={product.NombreProducto} />
                            <div className="product-info">
                                <p><strong>Nombre:</strong> {product.NombreProducto}</p>
                                <p><strong>Precio:</strong> {product.PrecioProducto}</p>
                                <p><strong>Marca:</strong> {product.NombreMarcaPro}</p>
                                <p><strong>Disponibles:</strong> {product.CantidadDisponible}</p>
                                <p><strong>Descripción:</strong> {product.DescripcionProducto}</p>
                                <p><strong>URL:</strong> {product.IdURL}</p>
                                <button style={{ marginBottom: '10px', marginRight: '10px' }} onClick={() => handleResenaGo(product.IdProducto)} className="form-button">Resena</button>
                                <button onClick={() => handleAddToCart(product.IdProducto)} className="form-button">Agregar al Carrito</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ProductoCliente;
