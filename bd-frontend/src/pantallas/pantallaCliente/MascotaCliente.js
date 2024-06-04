import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css';
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";

function MascotaCliente() {
    const [mascotas, setMascotas] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/mascotaDuenio/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("MascotaCliente fetched:", data);
                    setMascotas(data);
                })
                .catch(error => console.error('Error fetching mascotas:', error));
        }
    }, [user]);

    console.log(mascotas);
    if(mascotas!=0){
        return (
            <div className="home-screen">
                <header className="header">
                    <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
                </header>
                <NavCliente/>
                <main className="main-content">
                    <h2>Lista de Mascotas</h2>
                    <div className="product-grid">
                        {mascotas.map(mascota => (
                            <div className="product-card" key={mascota.IdMascota}>
                                <div className="product-info">
                                    <p><strong>Nombre:</strong> {mascota.NombreMascota}</p>
                                    <p><strong>Animal:</strong> {mascota.NombreAnimal}</p>
                                    <p><strong>Raza:</strong> {mascota.RazaAnimal}</p>
                                    <p><strong>Edad:</strong> {mascota.Edad}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        );
    }
    else{
        return (
            <div className="home-screen">
                <header className="header">
                    <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
                </header>
                <NavCliente/>
                <main className="main-content">
                    <h2>Lista de Mascotas</h2>
                    <br/>
                    <h2>El cliente no cuenta con mascotas registradas en el sistema</h2>
                </main>
            </div>
        );
    }

}

export default MascotaCliente;
