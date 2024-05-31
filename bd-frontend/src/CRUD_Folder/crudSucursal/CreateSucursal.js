import React, { useState, useEffect } from "react";

function CreateSucursal() {
    const [nombreSucursal, setNombreSucursal] = useState('');
    const [telefonoSucursal, setTelefonoSucursal] = useState('');
    const [direccionSucursal, setDireccionSucursal] = useState('');
    const [horaApertura, setHoraApertura] = useState('');
    const [horaCierre, setHoraCierre] = useState('');
    const [gerente, setGerente] = useState('');

    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        // Fetch personas (gerentes)
        fetch('http://localhost:3001/persona/tipo/4')
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setPersonas(data);
            })
            .catch(error => console.error('Error fetching personas:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const newSucursal = {
            NombreSucursal: nombreSucursal,
            TelefonoSucursal: parseInt(telefonoSucursal),
            DireccionSucursal: direccionSucursal,
            HoraApertura: horaApertura,
            HoraCierre: horaCierre,
            Gerente: parseInt(gerente)
        };

        fetch('http://localhost:3001/sucursal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSucursal)
        })
            .then(response => {
                if (response.ok) {
                    alert('Sucursal creada exitosamente');
                    window.location.reload(); // Recargar la página
                } else {
                    alert('Error al crear sucursal');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    return (
        <div>
            <h2>Crear Sucursal</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre Sucursal:
                    <input
                        name="nombreSucursal"
                        type="text"
                        value={nombreSucursal}
                        onChange={e => setNombreSucursal(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Teléfono Sucursal:
                    <input
                        name="telefonoSucursal"
                        type="text"
                        value={telefonoSucursal}
                        onChange={e => setTelefonoSucursal(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Dirección Sucursal:
                    <input
                        name="direccionSucursal"
                        type="text"
                        value={direccionSucursal}
                        onChange={e => setDireccionSucursal(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Hora Apertura:
                    <input
                        name="horaApertura"
                        type="time"
                        value={horaApertura}
                        onChange={e => setHoraApertura(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Hora Cierre:
                    <input
                        name="horaCierre"
                        type="time"
                        value={horaCierre}
                        onChange={e => setHoraCierre(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Gerente:
                    <select
                        name="gerente"
                        value={gerente}
                        onChange={e => setGerente(e.target.value)}
                    >
                        <option value="">Selecciona un gerente</option>
                        {personas.map(persona => (
                            <option key={persona.IdPersona} value={persona.IdPersona}>{persona.NombrePersona} {persona.ApellidoPersona}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <button type="reset">Reset data</button>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default CreateSucursal;
