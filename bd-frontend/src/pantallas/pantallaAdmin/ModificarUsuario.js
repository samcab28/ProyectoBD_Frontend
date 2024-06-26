import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logHistorialClick from '../../seguridad/historialClick';
import { UserContext } from '../../context/UserContext';
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavAdmin from "./NavAdmin";
import '../../Styles/PageContainer.css'; // Asegúrate de tener un archivo CSS para los estilos

function ModificarUsuario() {
    const { user } = useContext(UserContext); // Assuming you have a user context to get the current user
    const [usuario, setUsuario] = useState('');
    const [campoModificar, setCampoModificar] = useState('');
    const [valorNuevo, setvalorNuevo] = useState('');

    const camposModificables = [];
    camposModificables.push(<option key={'NombrePersona'} value={'NombrePersona'}>{'Nombre'}</option>);
    camposModificables.push(<option key={'ApellidoPersona'} value={'ApellidoPersona'}>{'Apellido'}</option>);
    camposModificables.push(<option key={'TelefonoPersona'} value={'TelefonoPersona'}>{'Télefono'}</option>);
    camposModificables.push(<option key={'UsuarioPersona'} value={'UsuarioPersona'}>{'Nombre de Usuario'}</option>);
    camposModificables.push(<option key={'PasswordPersona'} value={'PasswordPersona'}>{'Password'}</option>);

    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [tiposPersona, setTiposPersona] = useState({});
    const [sexos, setSexos] = useState({});

    const handleRegresar = () => {
        logHistorialClick(user, "Regresar", "Volver a la gestión de usuarios");
        navigate('/admin/usuarios');
    };

    useEffect(() => {
        fetch('http://localhost:3001/persona/tipo/3')
            .then(response => response.json())
            .then(data => setUsuarios(data))
            .catch(error => console.error('Error fetching citas:', error));

        // Fetch tipos de persona
        fetch('http://localhost:3001/tipoPersona')
            .then(response => response.json())
            .then(data => {
                console.log("Tipos de Persona fetched:", data); // Debug line
                const tiposMap = {};
                data.forEach(tipo => {
                    tiposMap[tipo.IdTipoPer] = tipo.Puesto; // Ajusta según la estructura de tu respuesta
                });
                console.log("Tipos de Persona Map:", tiposMap); // Debug line
                setTiposPersona(tiposMap);
            })
            .catch(error => console.error('Error fetching tiposPersona:', error));

        // Fetch sexos
        fetch('http://localhost:3001/sexo')
            .then(response => response.json())
            .then(data => {
                console.log("Sexos fetched:", data); // Debug line
                const sexosMap = {};
                data.forEach(sexo => {
                    sexosMap[sexo.IdSexo] = sexo.TipoSexo; // Ajusta según la estructura de tu respuesta
                });
                console.log("Sexos Map:", sexosMap); // Debug line
                setSexos(sexosMap);
            })
            .catch(error => console.error('Error fetching sexos:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        
        const updateData = {
            campoModificar: campoModificar,
            valorNuevo: valorNuevo
        };
    
        fetch(`http://localhost:3001/persona/${usuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
        .then(response => {
            if (response.ok) {
                alert('Informacion modificada exitosamente');
                logHistorialClick(user, "Modificar Usuario", `Usuario ID: ${usuario}, Campo: ${campoModificar}, Nuevo Valor: ${valorNuevo}`);
                window.location.reload(); // Recargar la página
            } else {
                alert('Error al modificar la informacion del usuario');
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
            <NavAdmin />
            <main className="main-content">
                <h2>Modificar Información de Usuario</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <label>
                        Usuario:
                        <select
                            name="usuario"
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Seleccione un usuario</option>
                            {usuarios.map(user => (
                                <option key={user.IdPersona} value={user.IdPersona}>{user.IdPersona}, {user.NombrePersona} {user.ApellidoPersona}</option>
                            ))}
                        </select>
                    </label>
                    <br/>
                    <label>
                        Campo que desea modificar:
                        <select
                            name="campoModificar"
                            value={campoModificar}
                            onChange={e => setCampoModificar(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Seleccione un campo</option>
                            {camposModificables}
                        </select>
                    </label>
                    <br/>
                    <label>
                        Nuevo Dato: <input name="valorNuevo" type="text" value={valorNuevo} onChange={e => setvalorNuevo(e.target.value)} className="form-input"/>
                    </label><br/>
                    <button type="submit" className="form-button">Guardar Cambios</button>
                </form>
                <h2>Listado de Personas</h2>
                <div className="product-grid">
                    {usuarios.map(persona => (
                        <div className="product-card" key={persona.IdPersona}>
                            <div className="product-info">
                                <p><strong>Id:</strong> {persona.IdPersona}</p>
                                <p><strong>Nombre:</strong> {persona.NombrePersona}</p>
                                <p><strong>Apellido:</strong> {persona.ApellidoPersona}</p>
                                <p><strong>Correo:</strong> {persona.CorreoPersona}</p>
                                <p><strong>Teléfono:</strong> {persona.TelefonoPersona}</p>
                                <p><strong>Usuario:</strong> {persona.UsuarioPersona}</p>
                                <p><strong>Contraseña:</strong> {persona.PasswordPersona}</p>
                                <p><strong>Puesto:</strong> {tiposPersona[persona.TipoPersona]}</p>
                                <p><strong>Sexo:</strong> {sexos[persona.Sexo]}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handleRegresar} className="form-button">Regresar</button>
            </main>
        </div>
    );
}

export default ModificarUsuario;
