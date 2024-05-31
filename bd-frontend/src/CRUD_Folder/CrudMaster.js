import React from 'react';
import { Link } from 'react-router-dom';

function CrudMaster() {
    return (
        <div className="sidebar">
            <h2>Gestión</h2>
            <ul>
                <li>
                    <Link to="/crud/persona">
                        <button>Crud de personas</button>
                    </Link>
                </li>
                <li>
                    <Link to="/crud/animal">
                        <button>Crud de animales</button>
                    </Link>
                </li>
                <li>
                    <Link to="/crud/mascota">
                        <button>Crud de mascotas</button>
                    </Link>
                </li>
                <li>
                    <Link to="/crud/sucursal">
                        <button>Crud de sucursal</button>
                    </Link>
                </li>
                <li>
                    <Link to="/crud/producto">
                        <button>Crud de productos</button>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <button>regresar</button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default CrudMaster;
