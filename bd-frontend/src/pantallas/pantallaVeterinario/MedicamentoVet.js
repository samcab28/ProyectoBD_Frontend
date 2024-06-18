import React, { useContext, useEffect, useState } from 'react';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavVeterinario from "./NavVeterinario";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css';
import ProductImage from '../../Imagenes/ProductImage';
import logHistorialClick from '../../seguridad/historialClick';

function MedicamentoVet() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/sucursal')
            .then(response => response.json())
            .then(data => {
                console.log("Sucursales fetched:", data);
                if (Array.isArray(data)) {
                    setSucursales(data);
                    if (data.length > 0) {
                        setSelectedSucursal(data[0]);
                    }
                } else {
                    console.error('La respuesta de sucursales no es un array:', data);
                }
            })
            .catch(error => console.error('Error fetching sucursales:', error));
    }, []);

    useEffect(() => {
        if (selectedSucursal) {
            fetch(`http://localhost:3001/producto/sucursal/${selectedSucursal.IdSucursal}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Productos fetched:", data);
                    setProducts(data);
                })
                .catch(error => console.error('Error fetching productos:', error));
        }
    }, [selectedSucursal]);

    const handleResenaGo = (IdProducto) => {
        const productToAdd = products.find(product => product.IdProducto === IdProducto);
        logHistorialClick(user, 'Ver reseña', `Producto ${parseInt(productToAdd.IdProducto)}: ${productToAdd.NombreProducto}`);
        navigate(`/veterinario/resena/${parseInt(IdProducto)}`);
    };

    const handleSucursalChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selected = sucursales.find(sucursal => sucursal.IdSucursal === selectedId);
        logHistorialClick(user, "Ver Sucursal", `Sucursal: ${selectedId}`);
        setSelectedSucursal(selected);
        console.log(selected);
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavVeterinario />
            <main className="main-content">
                <h2>Lista de Productos</h2>
                <h3>Seleccione la sucursal donde desea ver los productos</h3>
                <form>
                    <label>
                        Sucursal:
                        <select
                            name="sucursal"
                            value={selectedSucursal ? selectedSucursal.IdSucursal : ''}
                            onChange={handleSucursalChange}
                        >
                            {sucursales.map(sucursal => (
                                <option key={sucursal.IdSucursal} value={sucursal.IdSucursal}>
                                    {sucursal.NombreSucursal}
                                </option>
                            ))}
                        </select>
                    </label>
                </form>
                <h3>Nombre de sucursal seleccionada: {selectedSucursal ? selectedSucursal.NombreSucursal : 'Ninguna'}</h3>
                <div className="product-grid">
                    {products.map(product => (
                        <div className="product-card" key={product.IdProducto}>
                            <ProductImage url={product.Dirrecion} alt={product.NombreProducto} />
                            <div className="product-info">
                                <p><strong>Nombre:</strong> {product.NombreProducto}</p>
                                <p><strong>Precio:</strong> {product.PrecioProducto}</p>
                                <p><strong>Marca:</strong> {product.NombreMarcaPro}</p>
                                <p><strong>Disponibles:</strong> {product.Cantidad}</p>
                                <p><strong>Descripción:</strong> {product.DescripcionProducto}</p>
                                <p><strong>Sucursal:</strong> {product.NombreSucursal}</p>
                                <button style={{ marginBottom: '10px', marginRight: '10px' }} onClick={() => handleResenaGo(product.IdProducto)} className="form-button">Reseña</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default MedicamentoVet;
