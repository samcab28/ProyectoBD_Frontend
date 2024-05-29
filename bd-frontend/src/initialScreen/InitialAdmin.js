// InitialAdmin.js
import React from 'react';
import '../Styles/PageContainer.css'; // Importa el archivo de estilos

function InitialAdmin() {
    return (
        <div className="home-screen">
            <header className="header">
                <img src="https://via.placeholder.com/1500x150" alt="Banner" className="header-image" />
            </header>
            <nav className="sidebar">
                <h2>Navegación</h2>
                <ul>
                    <li>Admin Navigation Item 1</li>
                    <li>Admin Navigation Item 2</li>
                    <li>Admin Navigation Item 3</li>
                </ul>
            </nav>
            <main className="main-content">
                <h2>Initial Admin Page</h2>
                <p>Welcome, Admin!</p>
            </main>
        </div>
    );
}

export default InitialAdmin;
