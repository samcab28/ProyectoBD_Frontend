import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavAdmin from "./NavAdmin";

function ProductoAdmin(){

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavAdmin/>
            <main className="main-content">
                <h2>Producto admin</h2>
            </main>
        </div>
    );
}

export default ProductoAdmin;
