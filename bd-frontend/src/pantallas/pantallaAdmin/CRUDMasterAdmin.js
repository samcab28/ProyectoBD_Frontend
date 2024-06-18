import React from "react";
import { Link } from 'react-router-dom';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavAdmin from "./NavAdmin";
import '../../Styles/PageContainer.css';

function CRUDMasterAdmin(){
    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavAdmin/>
            <main className="sidebar">
                <h2>Gestión general</h2>
                <ul>
                    <li><Link to="/admin/gestion/cliente">
                    <button className="nav-button">Gestión de clientes</button></Link></li>
                    <li><Link to="/admin/gestion/veterinario">
                    <button className="nav-button">Gestión de veterinarios</button></Link></li>
                    <li><Link to="/admin/gestion/producto">
                    <button className="nav-button">Gestión de productos</button></Link></li>
                    <li><Link to="/admin/gestion/resena">
                    <button className="nav-button">Gestión de reseñas</button></Link></li>
                </ul>
            </main>
        </div>
    );
}

export default CRUDMasterAdmin;