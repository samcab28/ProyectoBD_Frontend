import React, { useState, useEffect, useContext } from "react";
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavVeterinario from "./NavVeterinario";
import { UserContext } from "../../context/UserContext";

function MascotaVet() {
    const { user } = useContext(UserContext);
    const [mascotas, setMascotas] = useState([]);
    const [selectedMascota, setSelectedMascota] = useState(null);
    const [expedientes, setExpedientes] = useState([]);
    const [mostrarExpediente, setMostrarExpediente] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/mascota')
            .then(response => response.json())
            .then(data => setMascotas(data))
            .catch(error => console.error('Error fetching mascotas:', error));
    }, []);

    const handleMascotaSelect = (IdMascota) => {
        setSelectedMascota(IdMascota);
        fetchExpediente(IdMascota);
    };

    const fetchExpediente = (IdMascota) => {
        fetch(`http://localhost:3001/expediente/mascota/${IdMascota}`)
            .then(response => response.json())
            .then(data => {
                setExpedientes(data);
                console.log("Expedientes fetched:", data);
                setMostrarExpediente(true);
            })
            .catch(error => console.error('Error fetching expedientes:', error));
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavVeterinario />
            <main className="main-content">
                <h2>Mascotas Veterinario</h2>
                <div>
                    <label htmlFor="mascotaSelect">Seleccionar Mascota: </label>
                    <select id="mascotaSelect" onChange={(e) => handleMascotaSelect(parseInt(e.target.value, 10))} defaultValue="">
                        <option value="" disabled>Selecciona una mascota</option>
                        {mascotas.map(mascota => (
                            <option key={mascota.IdMascota} value={mascota.IdMascota}>
                                {mascota.NombreMascota}
                            </option>
                        ))}
                    </select>
                </div>
                {mostrarExpediente && selectedMascota && (
                    <div>
                        <h3>Expediente de la Mascota</h3>
                        <div className="list-container">
                            {expedientes.length > 0 ? (
                                expedientes.map(exp => (
                                    <div className="list-item" key={exp.IdExpediente}>
                                        <div className="list-item-content">
                                            <p><strong>Veterinario:</strong> {exp.Veterinario}</p>
                                            <p><strong>Fecha:</strong> {new Date(exp.FechaCita).toLocaleDateString()}</p>
                                            <p><strong>Comentarios:</strong> {exp.Comentarios}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hay expedientes para mostrar</p>
                            )}
                        </div>
                    </div>
                )}
                <h2>Lista de Todas las Mascotas</h2>
                <div className="list-container">
                    {mascotas.map(mascota => (
                        <div className="list-item" key={mascota.IdMascota} onClick={() => handleMascotaSelect(mascota.IdMascota)}>
                            <div className="list-item-content">
                                <p><strong>ID Mascota:</strong> {mascota.IdMascota}</p>
                                <p><strong>Nombre:</strong> {mascota.NombreMascota}</p>
                                <p><strong>Edad:</strong> {mascota.Edad}</p>
                                <p><strong>Sexo:</strong> {mascota.Sexo}</p>
                                <p><strong>Animal:</strong> {mascota.Animal}</p>
                                <p><strong>Dueño:</strong> {mascota.Duegno}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default MascotaVet;
