import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../../context/UserContext';

function CreateProduct() {
    const [nombreProducto, setNombreProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [descripcionProducto, setDescripcionProducto] = useState('');
    const [cantidadDisponible, setCantidadDisponible] = useState('');
    const [nombreSucursal, setNombreSucursal] = useState('');
    const [tipoProducto, setTipoProducto] = useState('');
    const [nombreMarcaPro, setNombreMarcaPro] = useState('');
    const [url, setUrl] = useState('');

    const [sucursales, setSucursales] = useState([]);
    const [tiposProducto, setTiposProducto] = useState([]);
    const [marcasProducto, setMarcasProducto] = useState([]);
    const [urls, setUrls] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        // fetch sucursales
        fetch(`http://localhost:3001/sucursal/${user.Sucursal}`)
            .then(response => response.json())
            .then(data => {
                console.log("sucursales fetched:", data); // Debug line
                setSucursales(data);
            })
            .catch(error => console.error('Error fetching sucursales:', error));
        
        // fetch tipos de producto
        fetch('http://localhost:3001/tipoProducto')
            .then(response => response.json())
            .then(data => {
                console.log("tipos producto fetched:", data); // Debug line
                setTiposProducto(data);
            })
            .catch(error => console.error('Error fetching tipos producto:', error));

        // fetch marcas de producto
        fetch('http://localhost:3001/marcaProducto')
            .then(response => response.json())
            .then(data => {
                console.log("marcas producto fetched:", data); // Debug line
                setMarcasProducto(data);
            })
            .catch(error => console.error('Error fetching marcas producto:', error));

        // fetch URLs
        fetch('http://localhost:3001/direccionurl')
            .then(response => response.json())
            .then(data => {
                console.log("urls fetched:", data); // Debug line
                setUrls(data);
            })
            .catch(error => console.error('Error fetching urls:', error));

    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const newProducto = {
            NombreProducto: nombreProducto,
            PrecioProducto: parseFloat(precioProducto),
            DescripcionProducto: descripcionProducto,
            CantidadDisponible: parseInt(cantidadDisponible),
            NombreSucursal: nombreSucursal,
            TipoProducto: tipoProducto,
            NombreMarcaPro: nombreMarcaPro,
            Direccion: parseInt(url)
        };

        fetch('http://localhost:3001/producto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProducto)
        })
            .then(response => {
                if (response.ok) {
                    alert('Producto creado exitosamente');
                    window.location.reload(); // Recargar la página
                } else {
                    alert('Error al crear producto');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    return (
        <div>
            <h2>Crear Producto</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre Producto:
                    <input
                        name="nombreProducto"
                        type="text"
                        value={nombreProducto}
                        onChange={e => setNombreProducto(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Precio Producto:
                    <input
                        name="precioProducto"
                        type="text"
                        value={precioProducto}
                        onChange={e => setPrecioProducto(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Descripción Producto:
                    <input
                        name="descripcionProducto"
                        type="text"
                        value={descripcionProducto}
                        onChange={e => setDescripcionProducto(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Cantidad Disponible:
                    <input
                        name="cantidadDisponible"
                        type="text"
                        value={cantidadDisponible}
                        onChange={e => setCantidadDisponible(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Nombre Sucursal:
                    <select
                        name="nombreSucursal"
                        value={nombreSucursal}
                        onChange={e => setNombreSucursal(e.target.value)}
                    >
                        <option value="">Selecciona una sucursal</option>
                        {sucursales.map(sucursal => (
                            <option key={sucursal.IdSucursal} value={sucursal.NombreSucursal}>{sucursal.NombreSucursal}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Tipo de Producto:
                    <select
                        name="tipoProducto"
                        value={tipoProducto}
                        onChange={e => setTipoProducto(e.target.value)}
                    >
                        <option value="">Selecciona un tipo de producto</option>
                        {tiposProducto.map(tipo => (
                            <option key={tipo.IdTipoPro} value={tipo.NombreTipoPro}>{tipo.NombreTipoPro}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Marca Producto:
                    <select
                        name="nombreMarcaPro"
                        value={nombreMarcaPro}
                        onChange={e => setNombreMarcaPro(e.target.value)}
                    >
                        <option value="">Selecciona una marca</option>
                        {marcasProducto.map(marca => (
                            <option key={marca.IdMarcaPro} value={marca.NombreMarcaPro}>{marca.NombreMarcaPro}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    URL:
                    <select
                        name="url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    >
                        <option value="">Selecciona una URL</option>
                        {urls.map(urlObj => (
                            <option key={urlObj.IdURL} value={urlObj.Direccion}>{urlObj.Direccion}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <button type="reset">Reset data</button>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default CreateProduct;
