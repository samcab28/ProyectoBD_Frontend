import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavAdmin from './NavAdmin';
import { UserContext } from '../../context/UserContext';

import CreateProduct from '../CRUDSPantallas/CreateProduct';
import ModifyProduct from '../CRUDSPantallas/ModifyProduct';

function ProductListAdmin() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);

    // fetch producto
    useEffect(() => {
        fetch(`http://localhost:3001/producto/sucursal/${user.Sucursal}`)
            .then(response => response.json())
            .then(data => {
                console.log("Productos fetched:", data); // Debug line
                setProductos(data);
            })
            .catch(error => console.error('Error fetching producto:', error));
    }, [])

    function handleDelete(id) {
        fetch(`http://localhost:3001/producto/${id}`, {
            method: 'DELETE',
        })
        
            .then(response => {
                if (response.ok) {
                    setProductos(productos.filter(producto => producto.IdProducto !== id));
                    window.location.reload();
                } else {
                    alert('Error deleting producto');
                }
            })
            .catch(error => console.error('Error deleting producto:', error));
            
    }




    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavAdmin />
            <main className="crud">
                <h1>Gestión de Productos</h1>
                <CreateProduct />
                <ModifyProduct />
                <h2>Listado de productos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Decripcion</th>
                            <th>Cantidad</th>
                            <th>Sucursal</th>
                            <th>Tipo de producto</th>
                            <th>Marca</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(productos => (
                            <tr key={productos.IdProducto}>
                                <td>{productos.IdProducto}</td>
                                <td>{productos.NombreProducto}</td>
                                <td>{productos.PrecioProducto}</td>
                                <td>{productos.DescripcionProducto}</td>
                                <td>{productos.Cantidad}</td>
                                <td>{productos.NombreSucursal}</td>
                                <td>{productos.TipoProducto}</td>
                                <td>{productos.NombreMarcaPro}</td>
                                <td>{productos.Dirrecion}</td>
                                <td>
                                    <button onClick={() => handleDelete(productos.IdProducto)}>Eliminar</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export default ProductListAdmin;
