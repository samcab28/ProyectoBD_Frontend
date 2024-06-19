import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fondoVet from "../../Imagenes/FondoVet.jpg";
import NavAdmin from './NavAdmin';

function ResenaListAdmin() {
    const navigate = useNavigate();
    const [resenas, setResenas] = useState([]);
    const handleRegresar = () => {
        navigate('/gerente/gestion');
    };

    function handleDelete(id) {
        fetch(`http://localhost:3001/resena/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted persona from the state
                    setResenas(resenas.filter(resena => resena.IdAnimal !== id));
                    window.location.reload();
                } else {
                    alert('Error deleting sucursal');
                }
            })
            .catch(error => console.error('Error deleting sucursal:', error));

    }


    useEffect(() => {
        fetch('http://localhost:3001/resena')
            .then(response => response.json())
            .then(data => setResenas(data))
            .catch(error => console.error('Error fetching sucursal:', error));
    }, []);

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image" />
            </header>
            <NavAdmin />
            <main className="crud">
                <h1>Crud de resenas</h1>
                <h2>Listado de resenas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>TituloResena</th>
                            <th>ContenidoResena</th>
                            <th>Autor</th>
                            <th>Producto</th>
                            <th>Puntuacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resenas.map(resena => (
                            <tr key={resena.IdResPro}>
                                <td>{resena.IdResPro}</td>
                                <td>{resena.TituloRes}</td>
                                <td>{resena.ContenidoRes}</td>
                                <td>{resena.Nombre_Completo}</td>
                                <td>{resena.NombreProducto}</td>
                                <td>{resena.Puntuacion}</td>

                                <td>
                                    <button onClick={() => handleDelete(resena.IdResPro)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
                <button onClick={handleRegresar}>Regresar</button>
        </div>
    )
}

export default ResenaListAdmin;
