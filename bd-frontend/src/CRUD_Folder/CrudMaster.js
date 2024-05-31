import React from 'react';
import { useNavigate } from 'react-router-dom';

function CrudMaster () {
    const navigate = useNavigate();

    const handleRegresar = () => {
        navigate('/'); // Cambia '/another' por la ruta deseada
    };

    const handlePersona = () => {
      navigate('/crud/persona')
    };

    const handleAnimal = () => {
        navigate('/crud/animal')
    };

    const handleMascota = () => {
        navigate('/crud/mascota')
    };

    const handleSucursal = () => {
        navigate('/crud/sucursal')
    };


    return (
        <div>
            <div>Crud Master</div>
            <button onClick={handlePersona}>crud de personas</button>
            <button onClick={handleAnimal}>Crud de animales</button>
            <button onClick={handleMascota}>Crud de mascotas</button>
            <button onClick={handleSucursal}>Crud de sucursal</button>
            <br/>
            <button onClick={handleRegresar}>Regresar</button>
        </div>

    );

}

export default CrudMaster;
