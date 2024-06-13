import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css';
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";
import logHistorialClick from '../../seguridad/historialClick';

function MascotaCliente() {
    const [mascotas, setMascotas] = useState([]);
    const { user } = useContext(UserContext);

    const [sexos, setSexos] = useState([]);
    const [animales, setAnimales] = useState([]);
    const [nombreAnimal, setNombreAnimal] = useState('');
    const [edad, setEdad] = useState('');
    const [tipoSexo, setTipoSexo] = useState('');
    const [nombreMascota, setNombreMascota] = useState('');


    useEffect(() => {
        // Fetch sexos
        fetch('http://localhost:3001/sexo')
            .then(response => response.json())
            .then(data => {
                console.log("sexos fetched:", data); // Debug line
                setSexos(data);
            })
            .catch(error => console.error('Error fetching sexos:', error));
        

        // Fetch animales
        fetch('http://localhost:3001/animal')
            .then(response => response.json())
            .then(data => {
                console.log("animales fetched:", data); // Debug line
                setAnimales(data);
            })
            .catch(error => console.error('Error fetching animales:', error));
    }, []);

    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/mascotaDuenio/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("MascotaCliente fetched:", data);
                    setMascotas(data);
                })
                .catch(error => console.error('Error fetching mascotas:', error));
        }
    }, [user]);

    function handleSubmit(e) {
        e.preventDefault();

        const newMascota = {
            NombreMascota: nombreMascota,
            Edad: parseInt(edad),
            Sexo: parseInt(tipoSexo),
            Animal: parseInt(nombreAnimal),
            Duegno: user.IdPersona
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
                    logHistorialClick( user,"Nueva Mascota", `${newMascota.NombreMascota}`);
                    window.location.reload(); // Recargar la página
                } else {
                    alert('Error al crear mascota');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    if(mascotas!=0){
        return (
            <div className="home-screen">
                <header className="header">
                    <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
                </header>
                <NavCliente/>
                <main className="main-content">
                    <h2>Lista de Mascotas</h2>
                    <div className="product-grid">
                        {mascotas.map(mascota => (
                            <div className="product-card" key={mascota.IdMascota}>
                                <div className="product-info">
                                    <p><strong>Nombre:</strong> {mascota.NombreMascota}</p>
                                    <p><strong>Animal:</strong> {mascota.NombreAnimal}</p>
                                    <p><strong>Raza:</strong> {mascota.RazaAnimal}</p>
                                    <p><strong>Edad:</strong> {mascota.Edad}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2>Agregar mascota</h2>
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
                        <button className="form-button" type="submit">Agregar mascota</button>
                    </form>
                </main>
            </div>
        );
    } else {
        return (
            <div className="home-screen">
                <header className="header">
                    <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
                </header>
                <NavCliente/>
                <main className="main-content">
                    <h2>Lista de Mascotas</h2>
                    <br/>
                    <h2>El cliente no cuenta con mascotas registradas en el sistema</h2>
                </main>
            </div>
        );
    }

}

export default MascotaCliente;
