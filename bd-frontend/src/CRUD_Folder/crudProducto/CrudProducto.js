import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProducto from './CreateProducto';

function ProductoList() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);

    // fetch producto
    useEffect(() => {
        fetch('http://localhost:3001/producto')
            .then(response => response.json())
            .then(data => {
                console.log("Productos fetched:", data); // Debug line
                setProductos(data);
            })
            .catch(error => console.error('Error fetching producto:', error));
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost:3001/producto/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setProductos(productos.filter(producto => producto.IdProducto !== id));
                } else {
                    alert('Error deleting producto');
                }
            })
            .catch(error => console.error('Error deleting producto:', error));
    }

    const handleRegresar = () => {
        navigate('/crud'); // Cambia '/crud' por la ruta deseada
    };

    const handleMod = (id) => {
        console.log("Modificar producto con Id:", id);
    };

    return (
        <div>
            <h1>Crud de productos</h1>
            <CreateProducto />
            <h2>Listado de productos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripcion</th>
                        <th>Cantidad</th>
                        <th>Sucursal</th>
                        <th>Tipo de producto</th>
                        <th>Marca</th>
                        <th>URL</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.IdProducto}>
                            <td>{producto.IdProducto}</td>
                            <td>{producto.NombreProducto}</td>
                            <td>{producto.PrecioProducto}</td>
                            <td>{producto.DescripcionProducto}</td>
                            <td>{producto.CantidadDisponible}</td>
                            <td>{producto.NombreSucursal}</td>
                            <td>{producto.TipoProducto}</td>
                            <td>{producto.NombreMarcaPro}</td>
                            <td>{producto.Dirrecion}</td>
                            <td>
                                <button onClick={() => handleDelete(producto.IdProducto)}>Eliminar</button>
                                <button onClick={() => handleMod(producto.IdProducto)}>Modificar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleRegresar}>Regresar</button>
        </div>
    );
}

export default ProductoList;
