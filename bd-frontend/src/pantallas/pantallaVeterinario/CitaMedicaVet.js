import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavVeterinario from "./NavVeterinario";
import React from "react";

function CitaMedicaVet(){
    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavVeterinario/>
            <main className="main-content">
                <h2>citas medicas veterinario</h2>
            </main>
        </div>
    );
}

export default CitaMedicaVet;
