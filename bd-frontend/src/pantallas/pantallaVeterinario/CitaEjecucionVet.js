// CitaEjecucionVet.js
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavCliente from "../pantallaCliente/NavCliente";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ProductImage from "../../Imagenes/ProductImage";

function CitaEjecucionVet() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { idCita, idMascota } = useParams();
    const [comentario, setComentario] = useState("");
    const [expedientes, setExpedientes] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState(null);

    const handleRegresar = () => {
        navigate('/veterinario/citaMedica');
    };

    //carga de citas de mascotas
    useEffect(() => {
        if (idCita) {
            fetch(`http://localhost:3001/expedienteMascota/${idMascota}`)
                .then(response => response.json())
                .then(data => {
                    setExpedientes(data);
                    console.log("Datos de la cita médica:", data);
                })
                .catch(error => console.error('Error fetching cita medica:', error));
        }
    }, [idCita]);

    //carga de sucursales
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


    //carga de productos segun la sucursal
    useEffect(() => {
        if (selectedSucursal) {
            fetch(`http://localhost:3001/medicamento/sucursal/${selectedSucursal.IdSucursal}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Productos fetched:", data);
                    setProducts(data);
                })
                .catch(error => console.error('Error fetching productos:', error));
        }
    }, [selectedSucursal]);


    function handleSubmit(e) {
        e.preventDefault();
        const newExpediente = {
            Comentarios: comentario,
            IdCita: idCita,
            veterinario: user.IdPersona,
            mascota: idMascota,
            ProductosRecetados: null
        };

        console.log("Datos que se enviarán al servidor:", newExpediente);

        fetch('http://localhost:3001/expediente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExpediente)
        })
            .then(response => {
                if (response.ok) {
                    alert('Agregado al expediente exitosamente');
                    window.location.reload(); // Recargar la página
                } else {
                    alert('Error al agregar al expediente');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    const handleResenaGo = (IdProducto) => {
        console.log(IdProducto);
        navigate(`/cliente/resena/${parseInt(IdProducto)}`); // Asegurarse de que IdProducto sea un número
    };


    const handleAddToCart = (IdProducto) => {
        if (user && user.IdPersona) {
            fetch('http://localhost:3001/carrito', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    IdPersona: user.IdPersona,
                    IdProducto: parseInt(IdProducto), // Asegurarse de que IdProducto sea un número
                    IdSucursal: selectedSucursal.IdSucursal,
                    Cantidad: 1
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Producto agregado al carrito:", data);
                    alert("Producto agregado al carrito");
                })
                .catch(error => console.error('Error al agregar producto al carrito:', error));
        } else {
            console.error('Usuario no autenticado');
        }
    };

    const handleSucursalChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selected = sucursales.find(sucursal => sucursal.IdSucursal === selectedId);
        setSelectedSucursal(selected);
        console.log(selected);
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
                <h2>Id de la cita que está siendo atendida: {idCita}</h2>
                <h2>Id de la mascota: {idMascota}</h2>
                <h2>Carga del expediente médico del paciente:</h2>

                <div className="product-grid">
                    {expedientes.map(exp => (
                        <div className="product-card" key={exp.IdExpediente}>
                            <div className="product-info">
                                <p><strong>Veterinario:</strong> {exp.NombreVeterinario}</p>
                                <p><strong>Mascota:</strong> {exp.NombreMascota}</p>
                                <p><strong>Fecha:</strong> {exp.FechaCita}</p>
                                <p><strong>Id Cita:</strong> {exp.IdCita}</p>
                                <p><strong>Comentarios:</strong> {exp.Comentarios}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <label>
                        Comentarios de la cita:
                        <textarea
                            name="comentario"
                            type="text"
                            value={comentario}
                            onChange={e => setComentario(e.target.value)}
                        />
                    </label><br/>
                    <button
                        style={{marginTop: '10px', marginBottom: '10px'}}
                        className="form-button"
                        type="submit"
                    >
                        Agregar al expediente
                    </button>
                </form>
                <h2>Recetar medicamentos</h2>
                <h3>Seleccione la sucursal donde desea hacer la compra</h3>
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

                <h3>Nombre de sucursal
                    seleccionada: {selectedSucursal ? selectedSucursal.NombreSucursal : 'Ninguna'}</h3>
                <div className="product-grid">
                    {products.map(product => (
                        <div className="product-card" key={product.IdProducto}>
                            <ProductImage url={product.Dirrecion} alt={product.NombreProducto}/>
                            <div className="product-info">
                                <p><strong>Nombre:</strong> {product.NombreProducto}</p>
                                <p><strong>Precio:</strong> {product.PrecioProducto}</p>
                                <p><strong>Marca:</strong> {product.NombreMarcaPro}</p>
                                <p><strong>Disponibles:</strong> {product.Cantidad}</p>
                                <p><strong>Descripción:</strong> {product.DescripcionProducto}</p>
                                <p><strong>Sucursal:</strong> {product.NombreSucursal}</p>
                                <button style={{marginBottom: '10px', marginRight: '10px'}}
                                        onClick={() => handleResenaGo(product.IdProducto)}
                                        className="form-button">Reseña
                                </button>
                                <button onClick={() => handleAddToCart(product.IdProducto)}
                                        className="form-button">Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


                <button
                    style={{marginTop: '10px', marginBottom: '10px'}}
                    className="form-button"
                >
                    Generar receta
                </button>
                <br/>
                <button
                    style={{marginTop: '10px', marginBottom: '10px'}}
                    className="form-button"
                >
                    Terminar cita
                </button>
                <br/>
                <button
                    style={{marginTop: '10px', marginBottom: '10px'}}
                    onClick={handleRegresar}
                    className="form-button"
                >
                    Regresar
                </button>
            </main>
        </div>
    );
}

export default CitaEjecucionVet;
