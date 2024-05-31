import React, { useState, useEffect } from "react";


function CreateMascota() {
    const [nombreMascota, setNombreMascota] = useState('');
    const [edad, setEdad] = useState('');
    const [tipoSexo, setTipoSexo] = useState('');
    const [nombreAnimal, setNombreAnimal] = useState('');
    const [nombrePersona, setNombrePersona] = useState('');

    const [sexos, setSexos] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [animales, setAnimales] = useState([]);

    useEffect(() => {
        // Fetch sexos
        fetch('http://localhost:3001/sexo')
            .then(response => response.json())
            .then(data => {
                console.log("sexos fetched:", data); // Debug line
                setSexos(data);
            })
            .catch(error => console.error('Error fetching sexos:', error));

        // Fetch personas
        fetch('http://localhost:3001/persona')
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setPersonas(data);
            })
            .catch(error => console.error('Error fetching personas:', error));

        // Fetch animales
        fetch('http://localhost:3001/animal')
            .then(response => response.json())
            .then(data => {
                console.log("animales fetched:", data); // Debug line
                setAnimales(data);
            })
            .catch(error => console.error('Error fetching animales:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const newMascota = {
            NombreMascota: nombreMascota,
            Edad: parseInt(edad),
            Sexo: parseInt(tipoSexo),
            Animal: parseInt(nombreAnimal),
            Duegno: parseInt(nombrePersona)
        };

        fetch('http://localhost:3001/mascota', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMascota)
        })
            .then(response => {
                if (response.ok) {
                    alert('mascota creada exitosamente');
                    window.location.reload(); // Recargar la página
                } else {
                    alert('Error al crear mascota');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    return (
        <div>
            <h2>Crear Mascota</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre Mascota:
                    <input
                        name="nombreMascota"
                        type="text"
                        value={nombreMascota}
                        onChange={e => setNombreMascota(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Edad:
                    <input
                        name="edad"
                        type="text"
                        value={edad}
                        onChange={e => setEdad(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Tipo Sexo:
                    <select
                        name="tipoSexo"
                        value={tipoSexo}
                        onChange={e => setTipoSexo(e.target.value)}
                    >
                        <option value="">Selecciona un sexo</option>
                        {sexos.map(sexo => (
                            <option key={sexo.IdSexo} value={sexo.IdSexo}>{sexo.TipoSexo}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Nombre Animal:
                    <select
                        name="nombreAnimal"
                        value={nombreAnimal}
                        onChange={e => setNombreAnimal(e.target.value)}
                    >
                        <option value="">Selecciona un animal</option>
                        {animales.map(animal => (
                            <option key={animal.IdAnimal} value={animal.IdAnimal}>{animal.NombreAnimal}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Nombre Dueño:
                    <select
                        name="nombrePersona"
                        value={nombrePersona}
                        onChange={e => setNombrePersona(e.target.value)}
                    >
                        <option value="">Selecciona un dueño</option>
                        {personas.map(persona => (
                            <option key={persona.IdPersona} value={persona.IdPersona}>{persona.NombrePersona}</option>
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

export default CreateMascota;
