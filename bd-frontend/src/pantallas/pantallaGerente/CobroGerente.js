import React, { useContext, useEffect, useState } from 'react';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavGerente from './NavGerente';
import { UserContext } from '../../context/UserContext';

function CobroGerente() {
    const { user } = useContext(UserContext);
    const [citas, setCitas] = useState([]);
    const [selectedCita, setSelectedCita] = useState(null);
    const [productosRecetados, setProductosRecetados] = useState([]);
    const [nuevoPrecio, setNuevoPrecio] = useState(0);
    const [montoTotal, setMontoTotal] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3001/citaMedica')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching citas');
                }
                return response.json();
            })
            .then(data => {
                console.log("Datos de citas obtenidos:", data);
                const citasAtendidas = data.filter(cita => cita.TipoEstCita === "Atendida"); // Filtrar solo citas "Atendida"
                setCitas(citasAtendidas);
                console.log("Citas atendidas:", citasAtendidas);
            })
            .catch(error => console.error('Error fetching citas:', error));
    }, []);

    const handleCitaSelect = (e) => {
        const citaId = parseInt(e.target.value, 10);
        const cita = citas.find(c => c.IdCitaMed === citaId);
        setSelectedCita(cita);
        setNuevoPrecio(cita.Precio); // Set the initial value of nuevoPrecio
        fetch(`http://localhost:3001/productosRecetados/${cita.IdCitaMed}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching productos recetados');
                }
                return response.json();
            })
            .then(data => {
                setProductosRecetados(data);
                const total = data.reduce((sum, producto) => sum + producto.PrecioProducto * producto.cantidad, cita.Precio);
                setMontoTotal(total);
            })
            .catch(error => console.error('Error fetching productos recetados:', error));
    };

    const handleCobrar = () => {
        if (!selectedCita) {
            alert("Por favor, seleccione una cita.");
            return;
        }
    
        fetch(`http://localhost:3001/pedidoDesdeCita/${selectedCita.IdCitaMed}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productos: productosRecetados })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al realizar el cobro');
            }
            return response.json();
        })
        .then(data => {
            alert('Cobro realizado exitosamente y pedido creado');
        })
        .catch(error => console.error('Error en la solicitud:', error));
    };

    const handleModificarPrecio = () => {
        if (nuevoPrecio < 15000 || nuevoPrecio % 2500 !== 0) {
            alert('El precio debe ser mínimo 15000 y aumentarse en incrementos de 2500');
            return;
        }

        fetch(`http://localhost:3001/citaMedica/${selectedCita.IdCitaMed}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ campoModificar: 'Precio', valorNuevo: nuevoPrecio.toString() }) // Convertir el nuevo precio a string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al modificar el precio de la cita');
            }
            alert('Precio de la cita modificado exitosamente');
            setMontoTotal(montoTotal + (nuevoPrecio - selectedCita.Precio));
            setSelectedCita({ ...selectedCita, Precio: nuevoPrecio });
        })
        .catch(error => console.error('Error al modificar el precio de la cita:', error));
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavGerente/>
            <main className="main-content">
                <h2>Realizar Cobro</h2>
                <div>
                    <label htmlFor="citaSelect">Seleccionar Cita: </label>
                    <select id="citaSelect" onChange={handleCitaSelect} defaultValue="">
                        <option value="" disabled>Selecciona una cita</option>
                        {citas.map(cita => (
                            <option key={cita.IdCitaMed} value={cita.IdCitaMed}>
                                ID Cita: {cita.IdCitaMed} - Fecha: {new Date(cita.FechaCita).toLocaleDateString()} - Precio: {cita.Precio}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedCita && (
                    <div>
                        <h3>Productos Recetados</h3>
                        <div className="list-container">
                            {productosRecetados.map(producto => (
                                <div className="list-item" key={producto.IdProducto}>
                                    <div className="list-item-content">
                                        <p><strong>Producto:</strong> {producto.NombreProducto}</p>
                                        <p><strong>Precio:</strong> {producto.PrecioProducto}</p>
                                        <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h3>Modificar Precio de la Cita</h3>
                        <input
                            type="number"
                            value={nuevoPrecio}
                            onChange={(e) => setNuevoPrecio(parseInt(e.target.value, 10))}
                            step="2500"
                            min="15000"
                        />
                        <button onClick={handleModificarPrecio} className="form-button">Modificar Precio</button>
                        <h3>Monto Total a Cobrar: {montoTotal}</h3>
                        <button onClick={handleCobrar} className="form-button">Realizar Cobro</button>
                    </div>
                )}
                <h2>Citas Disponibles</h2>
                <div className="list-container">
                    {citas.map(cita => (
                        <div className="list-item" key={cita.IdCitaMed} onClick={() => handleCitaSelect({ target: { value: cita.IdCitaMed } })}>
                            <div className="list-item-content">
                                <p><strong>ID Cita:</strong> {cita.IdCitaMed}</p>
                                <p><strong>Fecha:</strong> {new Date(cita.FechaCita).toLocaleDateString()}</p>
                                <p><strong>Precio:</strong> {cita.Precio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default CobroGerente;
