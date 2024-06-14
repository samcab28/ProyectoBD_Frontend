import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavAdmin from "./NavAdmin";
import fondoVet from "../../Imagenes/FondoVet.jpg";

function CarritosDeCompra(){
    const [clientes, setClientes]= useState([]);
    const [carrito, setCarrito]= useState([]);

    const [cliente, setCliente] = useState('');

    useEffect(() => {
        // Fetch personas (clientes)
        fetch('http://localhost:3001/persona/tipo/3') 
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setClientes(data);
            })
            .catch(error => console.error('Error fetching personas:', error));
        
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        
        // Fetch carrito 
        fetch(`http://localhost:3001/carrito/${cliente}`)
            .then(response => response.json())
            .then(data => {
                console.log("carrito fetched:", data); // Debug line
                setCarrito(data);
            })
            .catch(error => console.error('Error fetching carrito:', error));
    }
    
    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavAdmin/>
            <main className="main-content">
                <h2>Carritos de Compra</h2>

                <form onSubmit={handleSubmit}>
                    <label>
                        Cliente:
                        <select
                            name="cliente"
                            value={cliente}
                            onChange={e => setCliente(e.target.value)}
                        >
                            <option value="">Selecciona un cliente</option>
                            {clientes.map(persona => (
                                <option key={persona.IdPersona} value={persona.IdPersona}>{persona.NombrePersona} {persona.ApellidoPersona}</option>
                            ))}
                        </select>
                    </label>
                    <br/>
                    <button type="submit">Ver Carrito</button>
                </form>
                <h3 style={{ textAlign: 'center' }}>Carrito del cliente</h3>
                <table>
                    <thead>
                        <tr>
                        <th>IdCarrito</th>
                        <th>IdProducto</th>
                        <th>NombreProducto</th>
                        <th>PrecioProducto</th>
                        <th>Cantidad</th>
                        <th>Sucursal</th>
                        <th>IdSucursal</th>
                        <th>Disponibles</th>
                        </tr> 
                        </thead>
                        <tbody>
                    {carrito.map(item => (
                        <tr key={item.IdCarrito}>
                            <td>{item.IdCarrito}</td>
                            <td>{item.IdProducto}</td>
                            <td>{item.NombreProducto}</td>
                            <td>{item.PrecioProducto}</td>
                            <td>{item.Cantidad}</td>
                            <td>{item.NombreSucursal}</td>
                            <td>{item.IdSucursal}</td>
                            <td>{item.CantidadDisponible}</td>
                        </tr>
                    ))}
                    </tbody>       
                </table>
            </main>
        </div>
    );
}

export default CarritosDeCompra;
