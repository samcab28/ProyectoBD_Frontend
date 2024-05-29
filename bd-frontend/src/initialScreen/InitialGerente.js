// InitialGerente.js
import React from 'react';
import '../Styles/PageContainer.css'; // Importa el archivo de estilos

function InitialGerente() {
    return (
        <div className="home-screen">
            <header className="header">
                <img src="https://via.placeholder.com/1500x150" alt="Banner" className="header-image" />
            </header>
            <nav className="sidebar">
                <h2>Navegación</h2>
                <ul>
                    <li>Manager Navigation Item 1</li>
                    <li>Manager Navigation Item 2</li>
                    <li>Manager Navigation Item 3</li>
                </ul>
            </nav>
            <main className="main-content">
                <h2>Initial Manager Page</h2>
                <p>Welcome, Manager!</p>
            </main>
        </div>
    );
}

export default InitialGerente;
