import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavGerente from "./NavGerente";
import React, { useEffect } from "react";
import NotificacionHistorial from "../../seguridad/NotificacionHistorial";

function InitialGerente() {
    const confirmacionLoginFallido = () => {
        NotificacionHistorial.checkHistorialLoginMinuto()
            .then(cantidad => console.log(cantidad))
            .catch(error => console.error('Error:', error));
    };

    useEffect(() => {
        confirmacionLoginFallido();
    }, []);

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavGerente/>
            <main className="main-content">
                <h2>expediente gerente</h2>
            </main>
        </div>
    );
}

export default InitialGerente;
