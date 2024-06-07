import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavCliente from "../pantallaCliente/NavCliente";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";

function CitaEjecucionVet() {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleRegresar = () =>{
        navigate('/veterinario/citaMedica');
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
                <h2>Ejecucion de la cita de la cita id: {id}</h2>
                <button onClick={handleRegresar} className="form-button">Regresar</button>
            </main>
        </div>
    );
}

export default CitaEjecucionVet;
