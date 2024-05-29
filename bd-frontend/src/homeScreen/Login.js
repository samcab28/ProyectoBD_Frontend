// Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/PageContainer.css'; // Importa el archivo de estilos

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    // Function to handle changes in the username input
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    // Function to handle changes in the password input
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    // Function to handle changes in the radio buttons
    const handleChangeOption = (event) => {
        setSelectedOption(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Selected option:', selectedOption);
        // Reset form fields after submission
        setUsername('');
        setPassword('');
        setSelectedOption('');
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src="https://via.placeholder.com/1500x150" alt="Banner" className="header-image" />
            </header>
            <nav className="sidebar">
                <h2>Navegación</h2>
                <ul>
                    <li><Link to="/"><button>Home</button></Link></li>
                    <li><Link to="/about"><button>About</button></Link></li>
                    <li><Link to="/login"><button>Login</button></Link></li>
                </ul>
            </nav>
            <main className="main-content">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username input */}
                    <div className="input-group">
                        <label>Usuario:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={handleChangeUsername}
                            required
                        />
                    </div>

                    {/* Password input */}
                    <div className="input-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handleChangePassword}
                            required
                        />
                    </div>

                    {/* Radio buttons */}
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="rol"
                                value="Administrador"
                                checked={selectedOption === 'Administrador'}
                                onChange={handleChangeOption}
                            />
                            Administrador
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="rol"
                                value="Veterinario"
                                checked={selectedOption === 'Veterinario'}
                                onChange={handleChangeOption}
                            />
                            Veterinario
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="rol"
                                value="Cliente"
                                checked={selectedOption === 'Cliente'}
                                onChange={handleChangeOption}
                            />
                            Cliente
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="rol"
                                value="Gerente"
                                checked={selectedOption === 'Gerente'}
                                onChange={handleChangeOption}
                            />
                            Gerente
                        </label>
                    </div>


                    <button type="submit">Enviar</button>
                    <Link to="/">
                        <button>Regresar</button>
                    </Link>
                </form>
            </main>
        </div>
    );
}

export default Login;
