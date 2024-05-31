import React, {useState, useEffect}  from "react";
import { useNavigate } from 'react-router-dom';
import CreateSucursal from "./CreateSucursal";

function SucursalList(){
    const navigate = useNavigate();
    const [sucursales, setSucursales] = useState([]);
    const handleRegresar = () => {
        navigate('/crud'); // Cambia '/another' por la ruta deseada
    };

    function handleDelete(id) {
        // Simulate a fetch request to delete a persona
        // Replace 'your-api-endpoint' with your actual API endpoint
        fetch(`http://localhost:3001/sucursal/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    // Remove the deleted persona from the state
                    setSucursales(sucursales.filter(sucursal => sucursal.IdAnimal !== id));
                    window.location.reload();
                } else {
                    alert('Error deleting sucursal');
                }
            })
            .catch(error => console.error('Error deleting sucursal:', error));
    }

    function handleMod(id){
        console.log("implementar logica");
    }

    useEffect(() => {
        // Simulate a fetch request to get personas from the server
        // Replace 'your-api-endpoint' with your actual API endpoint
        fetch('http://localhost:3001/sucursal')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error fetching sucursal:', error));
    }, []);

    return (
        <div>
            <h1>Crud de sucursales</h1>
            <CreateSucursal/>
            <h2>Listado de sucursales</h2>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre Sucursal</th>
                    <th>Telefono</th>
                    <th>Direccion Sucursal</th>
                    <th>Hora apertura</th>
                    <th>Hora Cierre</th>
                    <th>Nombre Gerente</th>
                </tr>
                </thead>
                <tbody>
                {sucursales.map(sucursal => (
                    <tr key={sucursal.IdSucursal}>
                        <td>{sucursal.IdSucursal}</td>
                        <td>{sucursal.NombreSucursal}</td>
                        <td>{sucursal.TelefonoSucursal}</td>
                        <td>{sucursal.DireccionSucursal}</td>
                        <td>{sucursal.HoraApertura}</td>
                        <td>{sucursal.HoraCierre}</td>
                        <td>{sucursal.Gerente}</td>

                        <td>
                            <button onClick={() => handleDelete(sucursal.IdSucursal)}>Eliminar</button>
                            <button onClick={() => handleMod(sucursal.IdSucursal)}>Modificar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
            <button onClick={handleRegresar}>Regresar</button>
        </div>
    )
}

export default SucursalList;
