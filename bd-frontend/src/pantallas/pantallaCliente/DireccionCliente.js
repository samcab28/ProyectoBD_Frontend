import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";
import { UserContext } from "../../context/UserContext";
import ProductImage from "../../Imagenes/ProductImage";

function DireccionCliente() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [direccionCompleta, setDireccionCompleta] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [direcciones, setDirecciones] = useState([]);
    const [divisas, setDivisas] = useState([]);
    const [selectedDivisa, setSelectedDivisa] = useState("");
    const [metodosPago, setMetodosPago] = useState([]);
    const [selectedMetodoPago, setSelectedMetodoPago] = useState("");




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


    const handleRegresar = () => {
        navigate('/cliente/carrito'); // Cambia '/another' por la ruta deseada
    };

    //funcion para traer informacion de direcciones de una persona
    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/dirPersonaByPer/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("CarritoCliente fetched:", data);
                    setDirecciones(data);
                    console.log("direcciones de usuario: ",data);
                })
                .catch(error => console.error('Error fetching carrito:', error));
        }
    }, [user]);

    const handleGuardarDireccion = () => {
        const nuevaDireccion = {
            IdPersona: user.IdPersona,
            DireccionCompleta: direccionCompleta,
            CodigoPostal: codigoPostal
        };

        fetch('http://localhost:3001/dirPersona', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaDireccion)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("direccion creada correctamente");
                window.location.reload();
            })
            .catch(error => {
                alert("error al crear la direccion");
                console.error('Error al guardar dirección:', error);
            });
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
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

                <h2>En caso de no encontrar la dirección, registrarla</h2>
                {user &&
                    <p>Bienvenido, {user.NombrePersona}, por favor llene los datos a donde quiere recibir su pedido</p>}

                <h2>Lista de direcciones guardadas por usuario</h2>

                {direcciones.length === 0 ? (
                    <p>El usuario no cuenta con direcciones guardadas.</p>
                ) : (
                    <div className="product-grid">
                        {direcciones.map(direccion => (
                            <div className="product-card" key={direccion.IdDireccionPer}>
                                <div className="product-info">
                                    <p><strong>Dirección:</strong> {direccion.DireccionCompleta}</p>
                                    <p><strong>Código Postal:</strong> {direccion.CodigoPostal}</p>
                                    <button style={{marginBottom: '10px', marginRight: '10px'}}
                                            className="form-button">Seleccionar dirección
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <h2>En caso de querer usar una nueva dirección:</h2>
                <form>
                    <label>
                        Dirección Completa:
                        <input
                            name="direccionCompleta"
                            type="text"
                            value={direccionCompleta}
                            onChange={e => setDireccionCompleta(e.target.value)}
                        />
                    </label>
                    <br/>
                    <label>
                        Código Postal:
                        <input
                            name="codigoPostal"
                            type="text"
                            value={codigoPostal}
                            onChange={e => setCodigoPostal(e.target.value)}
                        />
                    </label>
                    <br/>
                    <button type="button" className="form-button" onClick={handleGuardarDireccion}
                            style={{marginTop: "10px", marginBottom: "10px"}}>Guardar
                    </button>
                </form>
                <button onClick={handleRegresar} className="form-button"
                        style={{marginTop: "10px", marginBottom: "10px"}}>Regresar
                </button>
            </main>
        </div>
    );
}

export default DireccionCliente;
