import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateResena from './CreateResena';

function ResenaList(){
    const navigate = useNavigate(); 
    const [resenas, setResenas] = useState([]);
    const handleRegresar = () => {
        navigate('/crud'); 
    };

    function handleDelete(id){
        fetch(`http://localhost:3001/resena/${id}`, {
            method: 'DELETE',
        })
    }

    function handleMod(id){
        console.log("implementar logica");
    }

    useEffect(() => {
        fetch('http://localhost:3001/resena')
            .then(response => response.json())
            .then(data => setResenas(data))
            .catch(error => console.error('Error fetching sucursal:', error));
    }, []);

    return(
        <div>
            <h1>Crud de resenas</h1>
            <CreateResena/>
            <h2>Listado de resenas</h2>
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>TituloResena</th>
                    <th>ContenidoResena</th>
                    <th>Autor</th>
                    <tbody>
                {resenas.map(resena => (
                    <tr key={resena.IdResPro}>
                        <td>{resena.IdResPro}</td>
                        <td>{resena.TituloRes}</td>
                        <td>{resena.ContenidoRes}</td>
                        <td>{resena.Nombre_Completo}</td>

                        <td>
                            <button onClick={() => handleDelete(resena.IdResPro)}>Eliminar</button>
                            <button onClick={() => handleMod(resena.IdResPro)}>Modificar</button>
                        </td>
                    </tr>
                ))}
                </tbody>    </tr>    
                </thead>

            </table>
            
            <button onClick={handleRegresar}>Regresar</button>
        </div>
    )
}

export default ResenaList;
