import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ModifyCliente(){
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
        navigate('/gerente/gestion'); 
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
        <div>
            <h2>Modificar Información de Cliente</h2>
            <form onSubmit={handleSubmit}>
            <label>
                    Usuario:
                    <select
                        name="usuario"
                        value={usuario}
                        onChange={e => setUsuario(e.target.value)}
                    >
                        <option value="">Seleccione un usuario</option>
                        {usuarios.map(user => (
                            <option key={user.IdPersona} value={user.IdPersona}>{user.IdPersona}, {user.NombrePersona} {user.ApellidoPersona} </option>
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
                    >
                        <option value="">Seleccione un campo</option>
                        {camposModificables}
                    </select>
                </label>
                <br/>
                <label>
                    Nuevo Dato: <input name="valorNuevo" type="text" value={valorNuevo} onChange={e => setvalorNuevo(e.target.value)} />
                </label><br/>
                <button type="submit">Guardar Cambios</button>
            </form>            
            <button onClick={handleRegresar}>Regresar</button>
        </div>
    
    );
}

export default ModifyCliente;
