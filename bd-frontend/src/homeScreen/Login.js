import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css'; // Importa el archivo de estilos del login

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [personas, setPersonas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch personas
        fetch('http://localhost:3001/persona')
            .then(response => response.json())
            .then(data => {
                console.log("Personas fetched:", data);
                setPersonas(data);
            })
            .catch(error => console.error('Error fetching personas:', error));
    }, []);

    // Function to handle changes in the username input
    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    // Function to handle changes in the password input
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);

        // Find if the provided username and password match any persona
        const foundPersona = personas.find(persona => persona.UsuarioPersona === username && persona.PasswordPersona === password);

        if (foundPersona) {
            console.log('Login successful');
            switch (foundPersona.TipoPersona) {
                case 1:
                    navigate('/admin');
                    break;
                case 2:
                    navigate('/veterinario');
                    break;
                case 3:
                    navigate('/cliente');
                    break;
                case 4:
                    navigate('/gerente');
                    break;
                default:
                    break;
            }
        } else {
            console.log('Invalid username or password');
            // Display an error message or perform any other action for invalid login
        }

        // Reset form fields after submission
        setUsername('');
        setPassword('');
    };

    // Function to handle "Continue without logging in" button
    const handleContinueWithoutLogin = () => {
        navigate('/cliente');
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <div className="login-box text-center">
                    <h4 className="mb-4 pb-3">Log In</h4>
                    <div className="card-3d-wrap mx-auto">
                        <div className="card-3d-wrapper">
                            <div className="card-front">
                                <div className="center-wrap">
                                    <div className="section text-center">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input type="text" className="form-style" placeholder="User" value={username} onChange={handleChangeUsername} required />
                                                <i className="input-icon uil uil-at"></i>
                                            </div>
                                            <div className="form-group mt-2">
                                                <input type="password" className="form-style" placeholder="Password" value={password} onChange={handleChangePassword} required />
                                                <i className="input-icon uil uil-lock-alt"></i>
                                            </div>
                                            <button type="submit" className="btn mt-4">Login</button>
                                        </form>
                                        <p className="mb-0 mt-4 text-center">
                                            <a href="#" className="link">Forgot your password?</a>
                                        </p>
                                        <p className="mb-0 mt-2 text-center">
                                            <a href="#" className="link" onClick={handleContinueWithoutLogin}>Continue without logging in</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
