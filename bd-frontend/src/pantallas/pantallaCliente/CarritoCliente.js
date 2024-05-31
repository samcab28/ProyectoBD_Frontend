import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos
import fondoVet from '../../Imagenes/FondoVet.jpg'; // Importa la imagen de fondo
import NavCliente from "./NavCliente";

function CarritoCliente() {
    const [carrito, setCarrito] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/carrito/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("CarritoCliente fetched:", data);
                    setCarrito(data);
                })
                .catch(error => console.error('Error fetching carrito:', error));
        }
    }, [user]);

    const handleDelete = (idCarrito) => {
        fetch(`http://localhost:3001/carrito/${idCarrito}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                setCarrito(carrito.filter(item => item.IdCarrito !== idCarrito));
            })
            .catch(error => console.error('Error deleting item:', error));
    };

    const handleQuantityChange = (idCarrito, newQuantity) => {
        fetch(`http://localhost:3001/carrito/${idCarrito}/${newQuantity}`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(() => {
                setCarrito(carrito.map(item => item.IdCarrito === idCarrito ? { ...item, Cantidad: newQuantity } : item));
            })
            .catch(error => console.error('Error updating quantity:', error));
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
                <h2>Carrito de Compras</h2>
                {user && <p>Bienvenido, {user.NombrePersona}</p>}
                <div className="product-grid">
                    {carrito.map(item => (
                        <div className="product-card" key={item.IdCarrito}>
                            <div className="product-info">
                                <p><strong>Nombre:</strong> {item.NombreProducto}</p>
                                <p><strong>Precio:</strong> {item.PrecioProducto}</p>
                                <p><strong>Cantidad:</strong> {item.Cantidad}</p>
                                <p><strong>Disponibles:</strong> {item.CantidadDisponible}</p>
                                <div className="quantity-control">
                                    <button onClick={() => handleQuantityChange(item.IdCarrito, item.Cantidad - 1)}
                                            disabled={item.Cantidad <= 1}>-
                                    </button>
                                    <span>{item.Cantidad}</span>
                                    <button onClick={() => handleQuantityChange(item.IdCarrito, item.Cantidad + 1)}
                                            disabled={item.Cantidad >= item.CantidadDisponible}>+
                                    </button>
                                </div>
                                <button onClick={() => handleDelete(item.IdCarrito)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default CarritoCliente;