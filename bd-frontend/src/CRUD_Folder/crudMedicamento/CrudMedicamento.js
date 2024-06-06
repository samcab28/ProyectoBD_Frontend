import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMedicamento from "./CreateMedicamento";

function MedicamentoList(){
    const navigate = useNavigate();
    const [medicamentos, setMedicamentos] = useState([]);

    useEffect(() => {
        // Fetch medicamentos
        fetch('http://localhost:3001/medicamento')
            .then(response => response.json())
            .then(data => {
                console.log("medicamentos fetched:", data); // Debug line
                setMedicamentos(data);
            })
            .catch(error => console.error('Error fetching medicamentos:', error));
    }, []);

    function handleDelete(id) {
        fetch(`http://localhost:3001/medicamento/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setMedicamentos(medicamentos.filter(medicamento => medicamento.IdMedicamento !== id));
                    window.location.reload();
                } else {
                    alert('Error deleting medicamento');
                }
            })
            .catch(error => console.error('Error deleting medicamento:', error));
    }

    const handleRegresar = () => {
        navigate('/crud'); // Cambia '/another' por la ruta deseada
    };

    const handleMod = () => {
        console.log("hola");
    }

    return (
        <div>
            <h1>crud de medicamentos</h1>
            <CreateMedicamento/>
            <h2>Listado de medicamentos</h2>
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Fecha Caducidad</th>
                    <th>Unidad Medida</th>
                    <th>Tipo Medicamento</th>
                    <th>Apto Publico</th>
                    <th>Marca Producto</th>
                    <th>Sucursal</th>
                    <th>Cantidad</th>
                </tr>
                </thead>
                <tbody>
                {medicamentos.map(medicamento => (
                    <tr key={medicamento.IdMedicamento}>
                        <td>{medicamento.IdMedicamento}</td>
                        <td>{medicamento.NombreProducto}</td>
                        <td>{medicamento.DescripcionProducto}</td>
                        <td>{medicamento.PrecioProducto}</td>
                        <td>{medicamento.FechaCaducidad}</td>
                        <td>{medicamento.UnidadMedida}</td>
                        <td>{medicamento.TipoMedicamento}</td>
                        <td>{medicamento.AptoPublico}</td>
                        <td>{medicamento.MarcaProducto}</td>
                        <td>{medicamento.Sucursal}</td>
                        <td>{medicamento.Cantidad}</td>
                        <td>
                            <button onClick={() => handleDelete(medicamento.IdMedicamento)}>Eliminar</button>
                            <button onClick={() => handleMod(medicamento.IdMedicamento)}>Modificar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleRegresar}>regresar</button>
        </div>
    );
}

export default MedicamentoList;
