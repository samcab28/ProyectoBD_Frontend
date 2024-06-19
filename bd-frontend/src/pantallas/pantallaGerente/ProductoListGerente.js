import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavGerente from './NavGerente';
import { UserContext } from '../../context/UserContext';

import CreateProduct from '../CRUDSPantallas/CreateProduct';
import ModifyProduct from '../CRUDSPantallas/ModifyProduct';

function ProductList() {
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

    console.log(productos);

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

    const handleRegresar = () => {
        navigate('/crud'); // Cambia '/another' por la ruta deseada
    };

    const handleMod = () => {
        console.log("implementar");
    };


    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavGerente />
            <main className="crud">
                <h1>Gestión de Productos</h1>
                <CreateProduct/>
                <ModifyProduct/>
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
                        {productos.map(producto => (
                            <tr key={producto.IdProducto}>
                                <td>{producto.IdProducto}</td>
                                <td>{producto.NombreProducto}</td>
                                <td>{producto.PrecioProducto}</td>
                                <td>{producto.DescripcionProducto}</td>
                                <td>{producto.Cantidad}</td>
                                <td>{producto.NombreSucursal}</td>
                                <td>{producto.TipoProducto}</td>
                                <td>{producto.NombreMarcaPro}</td>
                                <td>{producto.Dirrecion}</td>
                                <td>
                                    <button onClick={() => handleDelete(producto.IdProducto)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </main>
        </div>
    )
}

export default ProductList;
