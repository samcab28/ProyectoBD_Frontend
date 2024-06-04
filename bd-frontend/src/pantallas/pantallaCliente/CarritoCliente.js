import React, { useContext, useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos
import fondoVet from '../../Imagenes/FondoVet.jpg'; // Importa la imagen de fondo
import NavCliente from "./NavCliente";

function CarritoCliente() {
    const [carrito, setCarrito] = useState([]);
    const { user } = useContext(UserContext);
    const [monto, setMonto] = useState(0);
    const [divisas, setDivisas] = useState([]);
    const [selectedDivisa, setSelectedDivisa] = useState("");
    const [metodosPago, setMetodosPago] = useState([]);
    const [selectedMetodoPago, setSelectedMetodoPago] = useState("");
    const navigate = useNavigate();

    //funcion encargada del submit
    function handleSubmit(e) {
        e.preventDefault();

        // Debugging logs
        console.log("Selected Divisa:", selectedDivisa);
        console.log("Selected MetodoPago:", selectedMetodoPago);

        const newCobro = {
            IdDivisa: parseInt(selectedDivisa),
            IdMetPago: parseInt(selectedMetodoPago)
        };

        fetch('http://localhost:3001/cobro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCobro)
        })
            .then(response => {
                if (response.ok) {
                    alert('peticion de cobro creada exitosamente');
                    //window.location.reload();
                    navigate('/cliente/direccion');
                } else {
                    alert('Error al crear peticion de cobro');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    //funcion que trae la divisas
    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/divisa`)
                .then(response => response.json())
                .then(data => {
                    console.log("divisas: ", data);
                    setDivisas(data);
                    if (data.length > 0) {
                        setSelectedDivisa(data[0].IdDivisa); // Set the first divisa as selected
                    }
                })
                .catch(error => console.error('error en el fetch de divisas:', error));
        }
    }, [user]);

    //funcion que trae los metodos de pago
    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/metodoPago`)
                .then(response => response.json())
                .then(data => {
                    console.log("metodos de pago fetched:", data);
                    setMetodosPago(data);
                    if (data.length > 0) {
                        setSelectedMetodoPago(data[0].IdMetPago); // Set the first payment method as selected
                    }
                })
                .catch(error => console.error('Error fetching metodos de pago:', error));
        }
    }, [user]);

    //funcion para traer informacion del carrito a una persona
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

    //manejo de borrado del carrito
    const handleDelete = (idCarrito) => {
        fetch(`http://localhost:3001/carrito/${idCarrito}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                setCarrito(carrito.filter(item => item.IdCarrito !== idCarrito));
            })
            .catch(error => console.error('Error deleting item:', error));

        handlePrecioFinal();
    };

    //manejo de la cantidad del carrito
    const handleQuantityChange = (idCarrito, newQuantity) => {
        fetch(`http://localhost:3001/carrito/${idCarrito}/${newQuantity}`, {
            method: 'PUT',
        })
            .then(response => response.json())
            .then(() => {
                setCarrito(carrito.map(item => item.IdCarrito === idCarrito ? { ...item, Cantidad: newQuantity } : item));
            })
            .catch(error => console.error('Error updating quantity:', error));

        handlePrecioFinal();
    };

    //manejo del precio final del carrito
    const handlePrecioFinal = () => {
        // Suma el precio de cada producto multiplicado por su cantidad
        const total = carrito.reduce((accumulator, item) => accumulator + (item.PrecioProducto * item.Cantidad), 0);
        // Actualiza el estado con el monto total
        setMonto(total);
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
                {/* Encabezado */}
                <h2>Carrito de Compras</h2>
                {user && <p>Bienvenido, {user.NombrePersona}</p>}

                {/* Lista de productos en el carrito */}
                <div className="product-grid">
                    {carrito.map(item => (
                        <div className="product-card" key={item.IdCarrito}>
                            <div className="product-info">
                                <p><strong>Nombre:</strong> {item.NombreProducto}</p>
                                <p><strong>Precio:</strong> {item.PrecioProducto}</p>
                                <p><strong>Cantidad:</strong> {item.Cantidad}</p>
                                <p><strong>Disponibles:</strong> {item.CantidadDisponible}</p>
                                <div className="quantity-control">
                                    <button style={{marginBottom: '3px'}} className="form-button"
                                            onClick={() => handleQuantityChange(item.IdCarrito, item.Cantidad - 1)}
                                            disabled={item.Cantidad <= 1}>-
                                    </button>
                                    <span>{item.Cantidad}</span>
                                    <button style={{marginBottom: '3px', marginRight: '10px'}} className="form-button"
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

                {/* Botón para proceder a la compra */}
                <button style={{marginTop: '50px'}} className="form-button" onClick={handlePrecioFinal}>Calcular precio
                    final
                </button>
                <h2>El monto total del pedido es de: {monto}</h2>
                <h2>Por favor seleccione un metodo de pago:</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Metodo de pago:
                        <select
                            name="metodoPago"
                            value={selectedMetodoPago}
                            onChange={e => setSelectedMetodoPago(e.target.value)}
                        >
                            {metodosPago.map(metodo => (
                                <option key={metodo.IdMetPago}
                                        value={metodo.IdMetPago}>{metodo.TipoMetPago} </option>
                            ))}
                        </select>
                    </label>
                    <br/>

                    <label>
                        Seleccionar divisa:
                        <select
                            name="divisa"
                            value={selectedDivisa}
                            onChange={e => setSelectedDivisa(e.target.value)}
                        >
                            {divisas.map(divisa => (
                                <option key={divisa.IdDivisa}
                                        value={divisa.IdDivisa}>{divisa.TipoDivisa} </option>
                            ))}
                        </select>
                    </label>
                    <br/>
                    <button style={{marginTop: '10px'}} className="form-button" type="submit">Proceder con compra
                    </button>
                </form>
            </main>
        </div>
    );

}

export default CarritoCliente;
