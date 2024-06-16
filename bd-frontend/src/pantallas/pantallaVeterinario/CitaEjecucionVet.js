import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavVet from "./NavVeterinario";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ProductImage from "../../Imagenes/ProductImage";
import logHistorialClick from "../../seguridad/historialClick";

function CitaEjecucionVet() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { idCita, idMascota } = useParams();
    const [comentario, setComentario] = useState("");
    const [expedientes, setExpedientes] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedSucursal, setSelectedSucursal] = useState(null);
    const [recetados, setRecetados] = useState([]);
    const [cantidades, setCantidades] = useState({});
    const [citaInfo, setCitaInfo] = useState({});
    const [mostrarExpediente, setMostrarExpediente] = useState(false);

    const handleRegresar = () => {
        logHistorialClick(user, "Regresar", "Regresó a la lista de citas médicas");
        navigate('/veterinario/citaMedica');
    };

    useEffect(() => {
        if (idCita) {
            fetch(`http://localhost:3001/citaMedica/${idCita}`)
                .then(response => response.json())
                .then(data => {
                    setCitaInfo(data);
                    console.log("Datos de la cita médica:", data);
                })
                .catch(error => console.error('Error fetching cita medica:', error));
        }
    }, [idCita]);

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
            fetch(`http://localhost:3001/medicamento/sucursal/${selectedSucursal.IdSucursal}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Productos fetched:", data);
                    setProducts(data);
                })
                .catch(error => console.error('Error fetching productos:', error));
        }
    }, [selectedSucursal]);

    const handleRecetar = (product) => {
        const cantidad = cantidades[product.IdProducto] || 1;
        const existingProduct = recetados.find(recetado => recetado.IdProducto === product.IdProducto);
        if (existingProduct) {
            setRecetados(recetados.map(recetado =>
                recetado.IdProducto === product.IdProducto
                    ? { ...recetado, cantidad: cantidad }
                    : recetado
            ));
        } else {
            setRecetados([...recetados, { ...product, cantidad }]);
        }
    };

    const handleCantidadChange = (e, productId) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1) {
            setCantidades({
                ...cantidades,
                [productId]: value
            });
        }
    };

    const handleEliminarRecetado = (idProducto) => {
        setRecetados(recetados.filter(p => p.IdProducto !== idProducto));
    };

    const handleAgregarExpediente = () => {
        const expedienteData = {
            Comentarios: comentario,
            IdCita: idCita,
            mascota: idMascota,
            veterinario: user.IdPersona
        };

        if (comentario.trim() === "") {
            alert('Debe agregar un comentario');
            return;
        }
    
        console.log(expedienteData);

        fetch('http://localhost:3001/expediente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expedienteData)
        })
            .then(response => {
                if (response.ok) {
                    alert('Expediente actualizado exitosamente');
                    logHistorialClick(user, "Agregar al expediente", `Cita ID: ${idCita}`);
                } else {
                    alert('Error al agregar al expediente');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    };

    const handleSucursalChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selected = sucursales.find(sucursal => sucursal.IdSucursal === selectedId);
        setSelectedSucursal(selected);
        console.log(selected);
    };

    const handleTerminarCita = () => {
        const updateData = {
            campoModificar: 'EstadoCita',
            valorNuevo: '1' // Valor que indica que la cita fue atendida
        };

        fetch(`http://localhost:3001/citaMedica/${idCita}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
            .then(response => {
                if (response.ok) {
                    // Guardar productos recetados
                    recetados.forEach(producto => {
                        const productoData = {
                            cantidad: producto.cantidad,
                            IdMedicamento: producto.IdMedicamento,
                            IdCita: idCita
                        };
                        fetch('http://localhost:3001/ProductoRecetado', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(productoData)
                        }).catch(error => console.error('Error al crear producto recetado:', error));
                    });
                    alert('Cita terminada exitosamente');
                    logHistorialClick(user, "Terminar cita", `Cita ID: ${idCita} terminada`);
                    handleRegresar(); // Regresar después de terminar la cita
                } else {
                    alert('Error al terminar la cita');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    };

    const handleVerExpediente = () => {
        if (mostrarExpediente) {
            setMostrarExpediente(false);
            setExpedientes([]);
        } else {
            fetch(`http://localhost:3001/expediente/mascota/${idMascota}`)
                .then(response => response.json())
                .then(data => {
                    setExpedientes(data);
                    console.log("Expedientes fetched:", data);
                    setMostrarExpediente(true);
                })
                .catch(error => console.error('Error fetching expedientes:', error));
        }
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavVet />
            <main className="main-content">
                <h2>Id de la cita que está siendo atendida: {idCita}</h2>
                <h2>Id de la mascota: {idMascota}</h2>
                <h2>Carga del expediente médico del paciente:</h2>
                <button onClick={handleVerExpediente} className="form-button">Ver Expediente</button>
                {mostrarExpediente && (
                    <div className="list-container">
                        {expedientes.length === 0 ? (
                            <p>NO HAY EXPEDIENTES PARA MOSTRAR</p>
                        ) : (
                            expedientes.map(exp => (
                                <div className="list-item" key={exp.IdExpediente}>
                                    <div className="list-item-content">
                                        <p><strong>Veterinario:</strong> {exp.Veterinario}</p>
                                        <p><strong>Mascota:</strong> {exp.Mascota}</p>
                                        <p><strong>Fecha:</strong> {new Date(exp.FechaCita).toLocaleDateString()}</p>
                                        <p><strong>Id Cita:</strong> {exp.IdCita}</p>
                                        <p><strong>Comentarios:</strong> {exp.Comentarios}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                <h2>Productos Recetados</h2>
                <div className="list-container">
                    {recetados.map(product => (
                        <div className="list-item" key={product.IdProducto}>
                            <div className="list-item-content">
                                <p><strong>Nombre:</strong> {product.NombreProducto}</p>
                                <p><strong>Precio:</strong> {product.PrecioProducto}</p>
                                <p><strong>Marca:</strong> {product.NombreMarcaPro}</p>
                                <p><strong>Cantidad Recetada:</strong> {product.cantidad}</p>
                                <button className="form-button" onClick={() => handleEliminarRecetado(product.IdProducto)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>

                <form>
                    <label>
                        Comentarios de la cita:
                        <textarea
                            name="comentario"
                            type="text"
                            value={comentario}
                            onChange={e => setComentario(e.target.value)}
                        />
                    </label><br />
                </form>
                <br />
                <button
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                    className="form-button"
                    onClick={handleAgregarExpediente}
                >
                    Agregar al Expediente
                </button>

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

                <h3>Nombre de sucursal seleccionada: {selectedSucursal ? selectedSucursal.NombreSucursal : 'Ninguna'}</h3>
                <div className="product-grid">
                    {products.map(product => (
                        <div className="product-card" key={product.IdProducto}>
                            <ProductImage url={product.Dirrecion} alt={product.NombreProducto} />
                            <div className="product-info">
                                <p><strong>ID:</strong> {parseInt(product.IdMedicamento)}</p>
                                <p><strong>Nombre:</strong> {product.NombreProducto}</p>
                                <p><strong>Precio:</strong> {product.PrecioProducto}</p>
                                <p><strong>Marca:</strong> {product.NombreMarcaPro}</p>
                                <p><strong>Disponibles:</strong> {product.Cantidad}</p>
                                <p><strong>Descripción:</strong> {product.DescripcionProducto}</p>
                                <p><strong>Sucursal:</strong> {product.NombreSucursal}</p>
                                <input
                                    type="number"
                                    min="1"
                                    max={product.Cantidad}
                                    onChange={(e) => handleCantidadChange(e, product.IdProducto)}
                                    placeholder="Cantidad"
                                    style={{ marginRight: '10px' }}
                                />
                                <button
                                    style={{ marginBottom: '10px' }}
                                    onClick={() => handleRecetar(product)}
                                    className="form-button"
                                >
                                    Recetar Producto
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <br />
                <button
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                    className="form-button"
                    onClick={handleTerminarCita}
                >
                    Terminar cita
                </button>
                <br />
                <button
                    style={{ marginTop: '10px', marginBottom: '10px' }}
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
