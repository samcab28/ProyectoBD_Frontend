import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavGerente from "./NavGerente";
import NotificacionHistorial from "../../seguridad/NotificacionHistorial";
import moment from "moment";

function HistorialLogin() {
    const [info, setInfo] = useState([]);
    const [loginFallido, setLoginFallido] = useState([]);

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

        confirmacionLoginFallido();
    }, []);

    const confirmacionLoginFallido = () => {
        NotificacionHistorial.checkHistorialLoginMinuto()
            .then(cantidad => console.log(cantidad))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavGerente />
            <main className="main-content">
                <h2>Registro de logins fallidos de los últimos cinco minutos</h2>
                {loginFallido.length > 0 ? (
                    <table>
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
                            <tr key={fallido.id}>
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
                <table>
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
                        <tr key={inf.id}>
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
