import React from 'react';
import { useNavigate } from 'react-router-dom';

function InitialAdmin() {
    const navigate = useNavigate();

    const handleRegresar = () => {
        navigate('/'); // Cambia '/another' por la ruta deseada
    };

    const handleCrud = () => {
      navigate('/crud/')
    };

    return (
        <div>
            <div>Pagina central de admin</div>
            <button onClick={handleCrud}>CRUD</button>
            <button onClick={handleRegresar}>Regresar</button>
        </div>
    );
}

export default InitialAdmin;
