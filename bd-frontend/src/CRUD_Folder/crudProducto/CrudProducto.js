import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import CreateProducto from './CreateProducto';

function ProductoList(){
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    
    // fetch producto
    useEffect(() => {
        // Fetch personas
        fetch('http://localhost:3001/producto')
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
                    setProductos(productos.filter(productos => productos.IdProducto!== id));
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


    return(
        <div>
            <h1>Crud de productos</h1>
            <CreateProducto/>
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
                        <td>{productos.CantidadDisponible}</td>
                        <td>{productos.NombreSucursal}</td>
                        <td>{productos.TipoProducto}</td>
                        <td>{productos.NombreMarcaPro}</td>
                        <td>{productos.Dirrecion}</td>
                        <td>
                            <button onClick={() => handleDelete(productos.IdProducto)}>Eliminar</button>
                            <button onClick={() => handleMod(productos.IdProducto)}>Modificar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleRegresar}>regresar</button>
        </div>
    )
}

export default ProductoList;
