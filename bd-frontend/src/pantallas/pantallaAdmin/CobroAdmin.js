import React, { useContext, useEffect, useState } from 'react';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavAdmin from "./NavAdmin";
import { UserContext } from '../../context/UserContext';

function CobroCliente() {
    const { user } = useContext(UserContext);
    const [citas, setCitas] = useState([]);
    const [selectedCita, setSelectedCita] = useState(null);
    const [productosRecetados, setProductosRecetados] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/citaMedica')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching citas');
                }
                return response.json();
            })
            .then(data => setCitas(data))
            .catch(error => console.error('Error fetching citas:', error));
    }, []);

    const handleCitaSelect = (cita) => {
        setSelectedCita(cita);
        fetch(`http://localhost:3001/productosRecetados/${cita.IdCitaMed}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching productos recetados');
                }
                return response.json();
            })
            .then(data => setProductosRecetados(data))
            .catch(error => console.error('Error fetching productos recetados:', error));
    };

    const handleCobrar = () => {
        fetch(`http://localhost:3001/cobrar/${selectedCita.IdCitaMed}`, {
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
            alert('Cobro realizado exitosamente');
            // Actualizar el historial del cliente
            return fetch(`http://localhost:3001/historialCliente/${selectedCita.IdCitaMed}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productos: productosRecetados })
            });
        })
        .then(historialResponse => {
            if (!historialResponse.ok) {
                throw new Error('Error al actualizar el historial');
            }
            alert('Historial actualizado exitosamente');
        })
        .catch(error => console.error('Error en la solicitud:', error));
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavAdmin/>
            <main className="main-content">
                <h2>Realizar Cobro</h2>
                <div className="list-container">
                    {citas.map(cita => (
                        <div className="list-item" key={cita.IdCitaMed} onClick={() => handleCitaSelect(cita)}>
                            <div className="list-item-content">
                                <p><strong>ID Cita:</strong> {cita.IdCitaMed}</p>
                                <p><strong>Fecha:</strong> {new Date(cita.FechaCita).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
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
                                        <p><strong>Cantidad:</strong> {producto.Cantidad}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleCobrar} className="form-button">Realizar Cobro</button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default CobroCliente;
