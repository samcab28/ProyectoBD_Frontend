// Importa el estado de React, hooks y componentes necesarios.
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { TemporaryCartContext } from '../../context/TemporaryCartContext';
import '../../Styles/PageContainer.css';
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";
import { TarjetaForm, DireccionForm } from '../../seguridad/Forms';
import '../../Styles/FormsTarjeta.css';

function CarritoCliente() {
    // Define los estados y contextos que se utilizarán en el componente.
    const [carrito, setCarrito] = useState([]);
    const { user } = useContext(UserContext);
    const { temporaryCart, setTemporaryCart } = useContext(TemporaryCartContext);
    const [monto, setMonto] = useState(0);
    const [metodosPago, setMetodosPago] = useState([]);
    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);
    const [divisas, setDivisas] = useState([]);
    const [divisaSeleccionada, setDivisaSeleccionada] = useState(null);
    const [tarjetas, setTarjetas] = useState([]);
    const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(null);
    const [tarjetaTemporal, setTarjetaTemporal] = useState(null); 
    const [direcciones, setDirecciones] = useState([]);
    const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
    const [direccionTemporal, setDireccionTemporal] = useState(null); 
    const [showTarjetaForm, setShowTarjetaForm] = useState(false);
    const [showDireccionForm, setShowDireccionForm] = useState(false);
    const [numComprobante, setNumComprobante] = useState('');
    const [showComprobanteForm, setShowComprobanteForm] = useState(false);
    const [envio, setEnvio] = useState(false); // Nuevo estado para manejar el envío
    const navigate = useNavigate();

    // Usa `useEffect` para cargar el carrito y las direcciones cuando el componente se monta o cuando cambia el usuario o el carrito temporal.
    useEffect(() => {
        if (user && user.IdPersona !== 37) {
            fetch(`http://localhost:3001/carrito/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("CarritoCliente fetched:", data);
                    setCarrito(data);
                    handlePrecioFinal(data, envio); 
                })
                .catch(error => console.error('Error fetching carrito:', error));

            fetch(`http://localhost:3001/dirPersonaByPer/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Direcciones fetched:", data);
                    setDirecciones(data);
                })
                .catch(error => console.error('Error fetching direcciones:', error));
        } else {
            setCarrito(temporaryCart);
            handlePrecioFinal(temporaryCart, envio);
        }
    }, [user, temporaryCart, envio]);

    // Carga los métodos de pago y las divisas disponibles.
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

    // Función para manejar la eliminación de productos del carrito.
    const handleDelete = (idCarrito) => {
        if (user && user.IdPersona !== 37) {
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
        } else {
            const updatedCarrito = carrito.filter(item => item.IdCarrito !== idCarrito);
            setTemporaryCart(updatedCarrito);
            setCarrito(updatedCarrito);
            handlePrecioFinal(updatedCarrito);
        }
    };

    // Función para manejar el cambio de cantidad de productos en el carrito.
    const handleQuantityChange = (idProducto, newQuantity) => {
        if (user && user.IdPersona !== 37) {
            fetch(`http://localhost:3001/carrito/${idProducto}/${newQuantity}`, {
                method: 'PUT',
            })
                .then(response => response.json())
                .then(() => {
                    const updatedCarrito = carrito.map(item =>
                        item.IdProducto === idProducto ? { ...item, Cantidad: newQuantity } : item
                    );
                    setCarrito(updatedCarrito);
                    handlePrecioFinal(updatedCarrito, envio); 
                })
                .catch(error => console.error('Error updating quantity:', error));
        } else {
            const updatedCarrito = carrito.map(item =>
                item.IdProducto === idProducto ? { ...item, Cantidad: newQuantity } : item
            );
            setTemporaryCart(updatedCarrito);
            setCarrito(updatedCarrito);
            handlePrecioFinal(updatedCarrito, envio);
        }
    };

    // Función para calcular el precio total del carrito.
    const handlePrecioFinal = (carrito, envio) => {
        let total = carrito.reduce((accumulator, item) => accumulator + (item.PrecioProducto * item.Cantidad), 0);
        if (envio) {
            total += 4500; // Agregar costo de envío
        }
        setMonto(total.toFixed(2));
    };

    // Función para manejar la creación de pedidos.
    const handleCrearPedido = async () => {
        if (!metodoPagoSeleccionado) {
            alert("Seleccione un método de pago.");
            return;
        }
    
        if (!divisaSeleccionada) {
            alert("Seleccione una divisa.");
            return;
        }
    
        if (envio && !direccionSeleccionada && !direccionTemporal) {
            alert("Seleccione o ingrese una dirección.");
            return;
        }
    
        if ((metodoPagoSeleccionado === 2 || metodoPagoSeleccionado === 5) && numComprobante.trim() === '') {
            alert("Debe ingresar un número de comprobante.");
            return;
        }
    
        let idTarjetaTemporal = null;
        let idDireccionTemporal = null;
    
        try {
            // Crear la tarjeta temporal si se seleccionó tarjeta de crédito/débito y es un cliente invitado
            if ((metodoPagoSeleccionado === 3 || metodoPagoSeleccionado === 4) && user.IdPersona === 37 && tarjetaTemporal) {
                const responseTarjeta = await fetch(`http://localhost:3001/infoTarjeta`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...tarjetaTemporal, IdPersona: user.IdPersona }),
                });
                const dataTarjeta = await responseTarjeta.json();
                idTarjetaTemporal = dataTarjeta.IdInformacionTarjeta;
            }
    
            // Crear la dirección temporal si es un cliente invitado
            if (user.IdPersona === 37 && direccionTemporal) {
                const responseDireccion = await fetch(`http://localhost:3001/dirPersona`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...direccionTemporal, IdPersona: user.IdPersona }),
                });
                const dataDireccion = await responseDireccion.json();
                idDireccionTemporal = dataDireccion.IdDireccionPer;
            }
    
            const pedidoData = {
                IdPersona: user.IdPersona,
                MontoTotal: monto,
                IdMetPago: metodoPagoSeleccionado,
                IdDivisa: divisaSeleccionada,
                IdInformacionTarjeta: metodoPagoSeleccionado === 3 || metodoPagoSeleccionado === 4 ? tarjetaSeleccionada : idTarjetaTemporal,
                NumComprobante: metodoPagoSeleccionado === 2 || metodoPagoSeleccionado === 5 ? numComprobante : null,
                FechaPedido: new Date().toISOString().split('T')[0],
                EstadoPedido: 1,
                Envio: envio,
                DetallesPedido: carrito.map(item => ({
                    Cantidad: item.Cantidad,
                    MontoTotal: item.PrecioProducto * item.Cantidad,
                    IdProducto: parseInt(item.IdProducto),
                    IdSucursal: item.IdSucursal,
                    NuevaCantidad: item.CantidadDisponible - item.Cantidad
                })),
                IdDireccion: envio ? (user.IdPersona !== 37 ? direccionSeleccionada : idDireccionTemporal) : null,
                DireccionTemporal: envio ? direccionTemporal : null
            };
            
    
            console.log("Pedido Data:", pedidoData); // Agrega esta línea para depurar el objeto pedidoData
    
            const responsePedido = await fetch(`http://localhost:3001/pedido`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedidoData),
            });
            const dataPedido = await responsePedido.json();
            
            console.log("Pedido creado:", dataPedido);
            alert("Pedido creado exitosamente.");
            carrito.forEach(item => handleDelete(item.IdCarrito)); 
            setCarrito([]);
            setMonto(0);
            setMetodoPagoSeleccionado(null);
            setDivisaSeleccionada(null);
            setTarjetaSeleccionada(null);
            setNumComprobante('');
            setDireccionSeleccionada(null);
            setTarjetaTemporal(null); 
            setDireccionTemporal(null); 

            // Eliminar carrito en el servidor si el usuario está autenticado
            if (user && user.IdPersona !== 37) {
                await fetch(`http://localhost:3001/carrito/${user.IdPersona}`, {
                    method: 'DELETE',
                });
            } else {
                setTemporaryCart([]); // Limpiar carrito temporal
            }
        } catch (error) {
            console.error('Error creando pedido:', error);
        }
    };            

    const handleAgregarTarjeta = (tarjetaData) => {
        if (user.IdPersona !== 37) {
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
        } else {
            setTarjetaTemporal(tarjetaData);
            setShowTarjetaForm(false);
        }
    };

    const handleAgregarDireccion = (direccionData) => {
        if (user.IdPersona !== 37) {
            fetch(`http://localhost:3001/dirPersona`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...direccionData, IdPersona: user.IdPersona }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Dirección creada:", data);
                    alert("Dirección agregada exitosamente.");
                    setShowDireccionForm(false);
                    setDirecciones([...direcciones, data]);
                })
                .catch(error => console.error('Error agregando dirección:', error));
        } else {
            setDireccionTemporal(direccionData);
            setShowDireccionForm(false);
        }
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
                        <div className="product-card" key={item.IdProducto}>
                            <div className="product-info">
                                <p><strong>Nombre:</strong> {item.NombreProducto}</p>
                                <p><strong>Precio:</strong> {item.PrecioProducto}</p>
                                <p><strong>Cantidad:</strong> {item.Cantidad}</p>
                                <p><strong>Disponibles:</strong> {item.CantidadDisponible}</p>
                                <p><strong>Sucursal:</strong> {item.NombreSucursal}</p>
                                <div className="quantity-control">
                                    <button style={{ marginBottom: '3px' }} className="form-button"
                                        onClick={() => handleQuantityChange(item.IdProducto, item.Cantidad - 1)}
                                        disabled={item.Cantidad <= 1}>-
                                    </button>
                                    <span>{item.Cantidad}</span>
                                    <button style={{ marginBottom: '3px', marginRight: '10px' }} className="form-button"
                                        onClick={() => handleQuantityChange(item.IdProducto, item.Cantidad + 1)}
                                        disabled={item.Cantidad >= item.CantidadDisponible}>+
                                    </button>
                                </div>
                                <button onClick={() => handleDelete(item.IdCarrito)} className="form-button">Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <h2>El monto total del pedido es de: {monto}</h2>

                <div className="shipping-selection">
                    <label>
                        <input 
                            type="radio" 
                            value="retirar" 
                            checked={!envio} 
                            onChange={() => setEnvio(false)}
                        />
                        Retirar en sucursal
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="enviar" 
                            checked={envio} 
                            onChange={() => setEnvio(true)}
                        />
                        Enviar por Correos
                    </label>
                </div>

                {envio && (
                    <div className="direccion-selection">
                        {user.IdPersona !== 37 && (
                            <>
                                <label htmlFor="direccion">Seleccione una dirección:</label>
                                <select 
                                    id="direccion" 
                                    value={direccionSeleccionada || ''}
                                    onChange={(e) => setDireccionSeleccionada(parseInt(e.target.value))}
                                >
                                    <option value="" disabled>Seleccione una dirección</option>
                                    {direcciones.map(direccion => (
                                        <option key={direccion.IdDireccionPer} value={direccion.IdDireccionPer}>
                                            {direccion.DireccionCompleta}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                        {direccionTemporal && <p>Dirección temporal: {direccionTemporal.DireccionCompleta}</p>}
                        <button onClick={() => setShowDireccionForm(!showDireccionForm)}>
                            {showDireccionForm ? 'Cancelar' : 'Agregar nueva dirección'}
                        </button>
                    </div>
                )}

                {showDireccionForm && <DireccionForm onSubmit={handleAgregarDireccion} />}

                <div className="payment-method-selection">
                    <label htmlFor="metodoPago">Seleccione método de pago:</label>
                    <select 
                        id="metodoPago" 
                        value={metodoPagoSeleccionado || ''}
                        onChange={(e) => {
                            setMetodoPagoSeleccionado(parseInt(e.target.value));
                            setShowComprobanteForm(parseInt(e.target.value) === 2 || parseInt(e.target.value) === 5);
                            setShowTarjetaForm(parseInt(e.target.value) === 3 || parseInt(e.target.value) === 4);
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
                        {user.IdPersona !== 37 && (
                            <>
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
                            </>
                        )}
                        {tarjetaTemporal && <p>Tarjeta temporal: {tarjetaTemporal.NumeroTarjeta}</p>}
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
            </main>
        </div>
    );
}

export default CarritoCliente;
