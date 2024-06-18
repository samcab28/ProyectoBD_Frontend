import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logHistorialClick from '../../seguridad/historialClick'; // Asegúrate de importar la función logHistorialClick
import { UserContext } from '../../context/UserContext'; // Importar el contexto de usuario
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavGerente from './NavGerente';
import '../../Styles/PageContainer.css'; // Asegúrate de tener un archivo CSS para los estilos

function AsignacionPersonalGerente() {
    const [Encargado, setEncargado] = useState('');
    const [Cita, setCita] = useState('');
    const { user } = useContext(UserContext); // Obtener el contexto del usuario
    const navigate = useNavigate();
    const [EncargadosCitas, setEncargadosCitas] = useState([]);
    const [citas, setCitas] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);

    const handleRegresar = () => {
        logHistorialClick(user, "Navegacion", "/admin/citasMedica");
        navigate('/gerente/citaMedica');
    };

    useEffect(() => {
        // Fetch personas (veterinarios)
        fetch('http://localhost:3001/persona/tipo/2')
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setVeterinarios(data);
            })
            .catch(error => console.error('Error fetching personas:', error));

        fetch('http://localhost:3001/citaMedica')
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setCitas(data);
            })
            .catch(error => console.error('Error fetching personas:', error));

        fetch('http://localhost:3001/personalEncargado')
            .then(response => response.json())
            .then(data => setEncargadosCitas(data))
            .catch(error => console.error('Error fetching citas:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const newPersonalEncargado = {
            IdPersona: parseInt(Encargado),
            IdCita: parseInt(Cita),
        };

        fetch('http://localhost:3001/personalEncargado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPersonalEncargado)
        })
        .then(response => {
            if (response.ok) {
                logHistorialClick(user, "Asignar Personal", `Cita ID: ${Cita}, Encargado ID: ${Encargado}`);
                alert('Personal agregado exitosamente');
                window.location.reload(); // Recargar la página
            } else {
                alert('Error al agregar personal a la cita');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    }

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavGerente />
            <main className="main-content">
                <h2>Asignación de Personal a Cita Médica</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Cita:
                        <select
                            name="cita"
                            value={Cita}
                            onChange={e => setCita(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Seleccione una cita</option>
                            {citas.map(cita => (
                                <option key={cita.IdCitaMed} value={cita.IdCitaMed}>{cita.IdCitaMed}</option>
                            ))}
                        </select>
                    </label>
                    <br/>
                    <label>
                        Encargado:
                        <select
                            name="encargado"
                            value={Encargado}
                            onChange={e => setEncargado(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Selecciona un encargado</option>
                            {veterinarios.map(persona => (
                                <option key={persona.IdPersona} value={persona.IdPersona}>{persona.NombrePersona} {persona.ApellidoPersona}</option>
                            ))}
                        </select>
                    </label>
                    <br/>
                    <button type="submit" className="form-button">Asignar</button>
                </form>
                <h2>Listado de Citas Médicas</h2>
                <div className="product-grid">
                    {EncargadosCitas.map(cita => (
                        <div className="product-card" key={cita.IdCitaMed}>
                            <div className="product-info">
                                <p><strong>IdCita:</strong> {cita.IdCitaMed}</p>
                                <p><strong>FechaCita:</strong> {cita.FechaCita}</p>
                                <p><strong>Encargados:</strong> {cita.Encargados}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handleRegresar} className="form-button">Regresar</button>
            </main>
        </div>
    );
}

export default AsignacionPersonalGerente;
