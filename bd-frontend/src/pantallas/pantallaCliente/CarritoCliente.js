import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css';
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";
import { TarjetaForm, ComprobanteForm } from '../../seguridad/Forms.js';

function CarritoCliente() {
    const [carrito, setCarrito] = useState([]);
    const { user } = useContext(UserContext);
    const [monto, setMonto] = useState(0);
    const [metodosPago, setMetodosPago] = useState([]);
    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);
    const [divisas, setDivisas] = useState([]);
    const [divisaSeleccionada, setDivisaSeleccionada] = useState(null);
    const [tarjetas, setTarjetas] = useState([]);
    const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);
    const [showTarjetaForm, setShowTarjetaForm] = useState(false);
    const [numComprobante, setNumComprobante] = useState('');
    const [showComprobanteForm, setShowComprobanteForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/carrito/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("CarritoCliente fetched:", data);
                    setCarrito(data);
                    handlePrecioFinal(data); 
                })
                .catch(error => console.error('Error fetching carrito:', error));
        }
    }, [user]);

    useEffect(() => {
        fetch(`http://localhost:3001/metodoPago`)
            .then(response => response.json())
            .then(data => {
                console.log("Metodos de Pago fetched:", data);
                setMetodosPago(data);
            })
            .catch(error => console.error('Error fetching metodos de pago:', error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3001/divisa`)
            .then(response => response.json())
            .then(data => {
                console.log("Divisas fetched:", data);
                setDivisas(data);
            })
            .catch(error => console.error('Error fetching divisas:', error));
    }, []);

    useEffect(() => {
        if (user && (metodoPagoSeleccionado === 3 || metodoPagoSeleccionado === 4)) {
            fetch(`http://localhost:3001/infoTarjeta/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Tarjetas fetched:", data);
                    setTarjetas(data);
                })
                .catch(error => console.error('Error fetching tarjetas:', error));
        }
    }, [user, metodoPagoSeleccionado]);

    const handleDelete = (idCarrito) => {
        fetch(`http://localhost:3001/carrito/${idCarrito}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                const updatedCarrito = carrito.filter(item => item.IdCarrito !== idCarrito);
                setCarrito(updatedCarrito);
                handlePrecioFinal(updatedCarrito); 
            })
            .catch(error => console.error('Error deleting item:', error));
    };

    const handleQuantityChange = (idCarrito, newQuantity) => {
        fetch(`http://localhost:3001/carrito/${idCarrito}/${newQuantity}`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(() => {
                const updatedCarrito = carrito.map(item =>
                    item.IdCarrito === idCarrito ? { ...item, Cantidad: newQuantity } : item
                );
                setCarrito(updatedCarrito);
                handlePrecioFinal(updatedCarrito); 
            })
            .catch(error => console.error('Error updating quantity:', error));
    };

    const handlePrecioFinal = (carrito) => {
        const total = carrito.reduce((accumulator, item) => accumulator + (item.PrecioProducto * item.Cantidad), 0);
        setMonto(total);
    };

    const handleCrearPedido = () => {
        if (!metodoPagoSeleccionado) {
            alert("Seleccione un método de pago.");
            return;
        }

        if (!divisaSeleccionada) {
            alert("Seleccione una divisa.");
            return;
        }

        if ((metodoPagoSeleccionado === 2 || metodoPagoSeleccionado === 5) && numComprobante.trim() === '') {
            alert("Debe ingresar un número de comprobante.");
            return;
        }

        const pedidoData = {
            IdPersona: user.IdPersona,
            MontoTotal: monto,
            IdMetPago: metodoPagoSeleccionado,
            IdDivisa: divisaSeleccionada,
            IdInformacionTarjeta: metodoPagoSeleccionado === 3 || metodoPagoSeleccionado === 4 ? tarjetaSeleccionada : null,
            NumComprobante: metodoPagoSeleccionado === 2 || metodoPagoSeleccionado === 5 ? numComprobante : null,
            FechaPedido: new Date().toISOString().split('T')[0],
            EstadoPedido: 1
        };

        fetch(`http://localhost:3001/pedido`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoData),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Pedido creado:", data);
                alert("Pedido creado exitosamente.");
                carrito.forEach(item => handleDelete(item.IdCarrito)); // Eliminar cada artículo del carrito
                setCarrito([]);
                setMonto(0);
                setMetodoPagoSeleccionado(null);
                setDivisaSeleccionada(null);
                setTarjetaSeleccionada(null);
                setNumComprobante('');
            })
            .catch(error => console.error('Error creando pedido:', error));
    };

    const handleAgregarTarjeta = (tarjetaData) => {
        fetch(`http://localhost:3001/infoTarjeta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...tarjetaData, IdPersona: user.IdPersona }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Tarjeta creada:", data);
                alert("Tarjeta agregada exitosamente.");
                setShowTarjetaForm(false);
                setTarjetas([...tarjetas, data]); 
            })
            .catch(error => console.error('Error agregando tarjeta:', error));
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavCliente />
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
                                <p><strong>Sucursal:</strong> {item.NombreSucursal}</p>
                                <div className="quantity-control">
                                    <button style={{ marginBottom: '3px' }} className="form-button"
                                        onClick={() => handleQuantityChange(item.IdCarrito, item.Cantidad - 1)}
                                        disabled={item.Cantidad <= 1}>-
                                    </button>
                                    <span>{item.Cantidad}</span>
                                    <button style={{ marginBottom: '3px', marginRight: '10px' }} className="form-button"
                                        onClick={() => handleQuantityChange(item.IdCarrito, item.Cantidad + 1)}
                                        disabled={item.Cantidad >= item.CantidadDisponible}>+
                                    </button>
                                </div>
                                <button onClick={() => handleDelete(item.IdCarrito)} className="form-button">Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="payment-method-selection">
                    <label htmlFor="metodoPago">Seleccione método de pago:</label>
                    <select 
                        id="metodoPago" 
                        value={metodoPagoSeleccionado || ''}
                        onChange={(e) => {
                            setMetodoPagoSeleccionado(parseInt(e.target.value));
                            setShowComprobanteForm(e.target.value === "2" || e.target.value === "5");
                        }}
                    >
                        <option value="" disabled>Seleccione un método de pago</option>
                        {metodosPago.map(metodo => (
                            <option key={metodo.IdMetPago} value={metodo.IdMetPago}>
                                {metodo.TipoMetPago}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="divisa-selection">
                    <label htmlFor="divisa">Seleccione divisa:</label>
                    <select 
                        id="divisa" 
                        value={divisaSeleccionada || ''}
                        onChange={(e) => setDivisaSeleccionada(parseInt(e.target.value))}
                    >
                        <option value="" disabled>Seleccione una divisa</option>
                        {divisas.map(divisa => (
                            <option key={divisa.IdDivisa} value={divisa.IdDivisa}>
                                {divisa.TipoDivisa}
                            </option>
                        ))}
                    </select>
                </div>

                {(metodoPagoSeleccionado === 3 || metodoPagoSeleccionado === 4) && (
                    <div className="tarjeta-selection">
                        <label htmlFor="tarjeta">Seleccione una tarjeta:</label>
                        <select 
                            id="tarjeta" 
                            value={tarjetaSeleccionada || ''}
                            onChange={(e) => setTarjetaSeleccionada(parseInt(e.target.value))}
                        >
                            <option value="" disabled>Seleccione una tarjeta</option>
                            {tarjetas.map(tarjeta => (
                                <option key={tarjeta.IdInformacionTarjeta} value={tarjeta.IdInformacionTarjeta}>
                                    {`${tarjeta.NombrePropietario} - ${tarjeta.NumeroTarjeta}`}
                                </option>
                            ))}
                        </select>
                        <button onClick={() => setShowTarjetaForm(!showTarjetaForm)}>
                            {showTarjetaForm ? 'Cancelar' : 'Agregar nueva tarjeta'}
                        </button>
                    </div>
                )}

                {showTarjetaForm && <TarjetaForm onSubmit={handleAgregarTarjeta} />}
                
                {showComprobanteForm && (
                    <div className="comprobante-form">
                        <label htmlFor="comprobante">Número de Comprobante:</label>
                        <input 
                            type="text" 
                            id="comprobante" 
                            value={numComprobante}
                            onChange={(e) => setNumComprobante(e.target.value)}
                            required 
                        />
                    </div>
                )}

                <button style={{ marginTop: '50px' }} className="form-button" onClick={handleCrearPedido}>Generar Pedido</button>
                <h2>El monto total del pedido es de: {monto}</h2>
            </main>
        </div>
    );
}

export default CarritoCliente;
