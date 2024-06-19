import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../Styles/Login.css';
import moment from 'moment';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [personas, setPersonas] = useState([]);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/persona')
            .then(response => response.json())
            .then(data => {
                console.log("Personas fetched:", data);
                setPersonas(data);
            })
            .catch(error => console.error('Error fetching personas:', error));
    }, []);

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const registroHistorialLogin = async (estado, username, password) => {
        const horaActual = moment().format('YYYY-MM-DD HH:mm:ss');

        const newHistorial = {
            "username": username,
            "passwordUser": password,
            "hora": horaActual,
            "acceso": estado
        }

        try {
            const response = await fetch('http://localhost:3001/HistorialLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newHistorial)
            });

            if (response.ok) {
                console.log("registro de login exitoso")
            } else {
                console.log("error en el registro de login")
            }
        } catch (error) {
            console.error('Error en el registro de login:', error);
        }

        if (!estado) {
            const response = await fetch(`http://localhost:3001/HistorialLoginMinutoAll/${encodeURIComponent(horaActual)}`);
            const data = await response.json();

            const usernameFailedAttempts = data.filter(entry => entry.username === username && !entry.acceso);

            if (usernameFailedAttempts.length >= 3) {
                const foundPersona = personas.find(persona => persona.UsuarioPersona === username);

                if (foundPersona) {
                    try {
                        await fetch(`http://localhost:3001/persona/bloquear/${foundPersona.IdPersona}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        // Enviar correo de notificación
                        await enviarCorreo([foundPersona.CorreoPersona], 'Cuenta Bloqueada', `Su cuenta ha sido bloqueada debido a múltiples intentos fallidos de inicio de sesión.`);

                        alert(`El usuario ${username} ha sido bloqueado por múltiples intentos fallidos de inicio de sesión.`);
                    } catch (error) {
                        console.error('Error bloqueando el usuario:', error);
                    }
                }
            }
        }
    };

    const enviarCorreo = async (correos, asunto, mensaje) => {
        try {
            const response = await fetch('http://localhost:3001/enviarCorreo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correos: correos,
                    asunto: asunto,
                    mensaje: mensaje
                })
            });

            if (!response.ok) {
                throw new Error('Error al enviar el correo');
            }

            const data = await response.json();
            console.log('Correo enviado exitosamente:', data);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const foundPersona = personas.find(persona => persona.UsuarioPersona === username && persona.PasswordPersona === password);

        if (foundPersona) {
            if (foundPersona.Bloqueado) {
                alert('Esta cuenta está bloqueada. Contacte al administrador.');
                return;
            }

            registroHistorialLogin(true, username, password);
            setUser(foundPersona); // Almacena el usuario en el contexto y en localStorage
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
            registroHistorialLogin(false, username, password);
            console.log('Invalid username or password');
        }
        setUsername('');
        setPassword('');
    };

    const handleContinueWithoutLogin = () => {
        const foundPersona = personas.find(persona => persona.UsuarioPersona === "UsuarioInvitado" && persona.PasswordPersona === "123");

        if (foundPersona) {
            setUser(foundPersona)
            navigate('/cliente');
        } else {
            alert("Error a la hora de la sesión");
        }
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
