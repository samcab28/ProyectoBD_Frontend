import React from "react";
import { Link } from 'react-router-dom';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavGerente from "./NavGerente";
import '../../Styles/PageContainer.css';

function CRUDMasterGerente(){
    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavGerente/>
            <main className="sidebar">
                <h2>Gestión general</h2>
                <ul>
                    <li><Link to="/gerente/gestion/cliente">
                    <button className="nav-button">Gestión de clientes</button></Link></li>
                    <li><Link to="/gerente/gestion/veterinario">
                    <button className="nav-button">Gestión de veterinarios</button></Link></li>
                    <li><Link to="/gerente/gestion/administrador">
                    <button className="nav-button">Gestión de administradores</button></Link></li>
                    <li><Link to="/gerente/gestion/producto">
                    <button className="nav-button">Gestión de productos</button></Link></li>
                    <li><Link to="/gerente/gestion/resena">
                    <button className="nav-button">Gestión de reseñas</button></Link></li>
                </ul>
            </main>
        </div>
    );
}

export default CRUDMasterGerente;