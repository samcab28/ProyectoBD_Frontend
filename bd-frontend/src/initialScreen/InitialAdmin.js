import React from 'react';
import { useNavigate } from 'react-router-dom';

function InitialAdmin() {
    const navigate = useNavigate();

    const handleRegresar = () => {
        navigate('/'); // Cambia '/another' por la ruta deseada
    };

    return (
        <div>
            <div>Pagina central de admin</div>
            <button>CRUD</button>
            <button onClick={handleRegresar}>Regresar</button>
        </div>
    );
}

export default InitialAdmin;
