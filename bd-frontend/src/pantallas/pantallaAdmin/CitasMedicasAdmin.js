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
                <h2>Citas Médicas</h2>
                <ul>
                <li>
                    <Link to="/admin/citasMedica/gestion">
                        <button>Gestionar Citas</button>
                    </Link>
                </li>
                <li>
                    <Link to="/crud">
                        <button>Asignar Personal</button>
                    </Link>
                </li>
                <li>
                    <Link to="/crud">
                        <button>Cancelar Cita</button>
                    </Link>
                </li>
                </ul>
            </main>
        </div>
    );
}

export default CitasCliente;
