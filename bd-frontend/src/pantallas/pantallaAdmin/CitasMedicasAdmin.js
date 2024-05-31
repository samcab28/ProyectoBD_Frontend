import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavAdmin from "./NavAdmin";
import fondoVet from "../../Imagenes/FondoVet.jpg";

function CitasCliente(){

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavAdmin/>
            <main className="main-content">
                <h2>citas medicas admin</h2>
            </main>
        </div>
    );
}

export default CitasCliente;
