import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavAdmin from "./NavAdmin";
import fondoVet from "../../Imagenes/FondoVet.jpg";

function Usuarios(){

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavAdmin/>
            <main className="main-content">
                <h2>Gestión de Usuarios</h2>
                <ul>
                <li>
                    <Link to="/admin/citasMedica/gestion">
                        <button>Gestionar Usuarios</button>
                    </Link>
                </li>
                <li>
                    <Link to="/admin/usuarios/modificar">
                        <button>Modificar Información</button>
                    </Link>
                </li>
                </ul>
            </main>
        </div>
    );
}

export default Usuarios;
