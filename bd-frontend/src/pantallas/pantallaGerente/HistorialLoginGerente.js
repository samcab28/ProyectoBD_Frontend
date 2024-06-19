import React, { useContext, useEffect, useState } from 'react';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavGerente from "./NavGerente";
import NotificacionHistorial from "../../seguridad/NotificacionHistorial";
import moment from "moment";
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext';

function HistorialLogin() {
    const { user } = useContext(UserContext); // Obtener el contexto del usuario
    const [info, setInfo] = useState([]);
    const [loginFallido, setLoginFallido] = useState([]);
    const [usuariosBloqueados, setUsuariosBloqueados] = useState([]);

    useEffect(() => {
        // Fetch de historial completo login
        fetch('http://localhost:3001/HistorialLogin')
            .then(response => response.json())
            .then(data => {
                console.log("Info fetched:", data); // Debug line
                setInfo(data);
            })
            .catch(error => console.error('Error fetching informacion:', error));

        // Fetch de solo historial no completo login
        const horaActual = moment().format('YYYY-MM-DD HH:mm:ss');
        fetch(`http://localhost:3001/HistorialLoginMinutoAll/${encodeURIComponent(horaActual)}`)
            .then(response => response.json())
            .then(data => {
                console.log("Info fetched:", data); // Debug line
                setLoginFallido(data);
            })
            .catch(error => console.error('Error fetching informacion:', error));

        fetchUsuariosBloqueados();
        confirmacionLoginFallido();
    }, []);

    const confirmacionLoginFallido = () => {
        NotificacionHistorial.checkHistorialLoginMinuto()
            .then(cantidad => console.log(cantidad))
            .catch(error => console.error('Error:', error));
    };

    const fetchUsuariosBloqueados = () => {
        fetch('http://localhost:3001/personas/bloqueadas')
            .then(response => response.json())
            .then(data => {
                console.log("Usuarios bloqueados fetched:", data);
                setUsuariosBloqueados(data);
            })
            .catch(error => console.error('Error fetching usuarios bloqueados:', error));
    };

    const handleDesbloquearUsuario = (id) => {
        fetch(`http://localhost:3001/persona/desbloquear/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al desbloquear el usuario');
            }
            fetchUsuariosBloqueados(); // Actualizar la lista de usuarios bloqueados
        })
        .catch(error => console.error('Error desbloqueando usuario:', error));
    };

    const handleRowClick = (type, id) => {
        logHistorialClick(user, "Ver detalle", `${type} - ID: ${id}`);
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavGerente />
            <main className="main-content">
                <h2>Usuarios Bloqueados</h2>
                {usuariosBloqueados.length > 0 ? (
                    <table className="styled-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Acción</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usuariosBloqueados.map(usuario => (
                            <tr key={usuario.IdPersona}>
                                <td>{usuario.IdPersona}</td>
                                <td>{usuario.NombrePersona} {usuario.ApellidoPersona}</td>
                                <td>{usuario.CorreoPersona}</td>
                                <td>
                                    <button 
                                        className="form-button" 
                                        onClick={() => handleDesbloquearUsuario(usuario.IdPersona)}
                                    >
                                        Desbloquear
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay usuarios bloqueados actualmente.</p>
                )}

                <h2>Registro de logins fallidos de los últimos cinco minutos</h2>
                {loginFallido.length > 0 ? (
                    <table className="styled-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Acceso</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Hora</th>
                        </tr>
                        </thead>
                        <tbody>
                        {loginFallido.map(fallido => (
                            <tr key={fallido.id} onClick={() => handleRowClick("Login fallido", fallido.id)}>
                                <td>{fallido.id}</td>
                                <td>{fallido.acceso ? "Autorizado" : "Denegado"}</td>
                                <td>{fallido.username}</td>
                                <td>{fallido.passwordUser}</td>
                                <td>{fallido.hora}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay intentos de login fallido actualmente.</p>
                )}

                <h2>Registro completo de logins</h2>
                <table className="styled-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Acceso</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Hora</th>
                    </tr>
                    </thead>
                    <tbody>
                    {info.map(inf => (
                        <tr key={inf.id} onClick={() => handleRowClick("Login completo", inf.id)}>
                            <td>{inf.id}</td>
                            <td>{inf.acceso ? "Autorizado" : "Denegado"}</td>
                            <td>{inf.username}</td>
                            <td>{inf.passwordUser}</td>
                            <td>{inf.hora}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default HistorialLogin;
