import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function ProductoList(){
    const navigate = useNavigate();
    const [mascotas, setMascotas] = useState([]);


    return(
        <div>
            <h1>Crud de productos</h1>
            <h2>Listado de productos</h2>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Sexo</th>
                    <th>Animal</th>
                    <th>Nombre Duegno</th>
                </tr>
                </thead>
                <tbody>
                {mascotas.map(mascota => (
                    <tr key={mascota.IdMascota}>
                        <td>{mascota.IdMascota}</td>
                        <td>{mascota.NombreMascota}</td>
                        <td>{mascota.Edad}</td>
                        <td>{mascota.TipoSexo}</td>
                        <td>{mascota.NombreAnimal}</td>
                        <td>{mascota.NombrePersona}</td>
                        <td>
                            <button onClick={() => handleDelete(mascota.IdMascota)}>Eliminar</button>
                            <button onClick={() => handleMod(mascota.IdMascota)}>Modificar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleRegresar}>regresar</button>
        </div>
    )
}

export default ProductoList;
