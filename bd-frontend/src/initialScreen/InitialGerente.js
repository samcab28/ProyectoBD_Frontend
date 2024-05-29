import React from 'react';
import { useNavigate } from 'react-router-dom';

function InitialGerente() {
    const navigate = useNavigate();

    const handleRegresar = () => {
        navigate('/'); // Cambia '/another' por la ruta deseada
    };

    return (
        <div>
            <div>Pagina central de gerente</div>
            <button onClick={handleRegresar}>Regresar</button>
        </div>
    );
}

export default InitialGerente;
