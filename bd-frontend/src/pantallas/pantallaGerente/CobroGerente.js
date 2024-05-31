import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavGerente from "./NavGerente";
import React from "react";

function CobroGerente(){
    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavGerente/>
            <main className="main-content">
                <h2>cobro gerente</h2>
            </main>
        </div>
    );
}

export default CobroGerente;
