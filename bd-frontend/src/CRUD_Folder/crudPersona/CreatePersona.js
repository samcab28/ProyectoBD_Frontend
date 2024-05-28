import React, { useState } from 'react';

function CreatePersona() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [tipo, setTipo] = useState('Cliente');
    const [sexo, setSexo] = useState('masculino');

    function handleSubmit(e) {
        e.preventDefault();

        let tipoPersonaValue;
        switch (tipo) {
            case 'Administrador':
                tipoPersonaValue = 1;
                break;
            case 'Veterinario':
                tipoPersonaValue = 2;
                break;
            case 'Cliente':
                tipoPersonaValue = 3;
                break;
            case 'Gerente':
                tipoPersonaValue = 4;
                break;
            default:
                tipoPersonaValue = 3;
        }

        let sexoValue;
        switch (sexo) {
            case 'masculino':
                sexoValue = 1;
                break;
            case 'femenino':
                sexoValue = 2;
                break;
            case 'otro':
                sexoValue = 3;
                break;
            default:
                sexoValue = 3;
        }

        const order = ["TipoPersona", "Sexo", "NombrePersona", "ApellidoPersona", "TelefonoPersona", "CorreoPersona", "UsuarioPersona", "PasswordPersona"];

        const formData = order.reduce((acc, key) => {
            switch (key) {
                case "TipoPersona":
                    acc[key] = parseInt(tipoPersonaValue);
                    break;
                case "Sexo":
                    acc[key] = parseInt(sexoValue);
                    break;
                case "NombrePersona":
                    acc[key] = nombre;
                    break;
                case "ApellidoPersona":
                    acc[key] = apellido;
                    break;
                case "TelefonoPersona":
                    acc[key] = parseInt(telefono);
                    break;
                case "CorreoPersona":
                    acc[key] = correo;
                    break;
                case "UsuarioPersona":
                    acc[key] = usuario;
                    break;
                case "PasswordPersona":
                    acc[key] = contrasena;
                    break;
                default:
                    break;
            }
            return acc;
        }, {});

        console.log(formData);

        fetch('http://localhost:3001/persona', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    alert('Persona creada exitosamente');
                    window.location.reload(); // Recargar la página
                } else {
                    console.error('Error al crear persona');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    return (
        <div>
            <div>Crear persona</div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre: <input name="nombre" type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                </label><br/>
                <label>
                    Apellido: <input name="apellido" type="text" value={apellido} onChange={e => setApellido(e.target.value)} />
                </label><br/>
                <label>
                    Correo: <input name="correo" type="email" value={correo} onChange={e => setCorreo(e.target.value)} />
                </label><br/>
                <label>
                    Teléfono: <input name="telefono" type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} />
                </label><br/>
                <label>
                    Usuario: <input name="usuario" type="text" value={usuario} onChange={e => setUsuario(e.target.value)} />
                </label><br/>
                <label>
                    Contraseña: <input name="contrasena" type="password" value={contrasena} onChange={e => setContrasena(e.target.value)} />
                </label><br/>
                <label>
                    Tipo de persona:
                    <select name="tipo" value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option value="Cliente">Cliente</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Gerente">Gerente</option>
                        <option value="Veterinario">Veterinario</option>
                    </select>
                </label><br/>
                <label>
                    Sexo:
                    <select name="sexo" value={sexo} onChange={e => setSexo(e.target.value)}>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                </label><br/>
                <button type="reset">Reset data</button>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default CreatePersona;
