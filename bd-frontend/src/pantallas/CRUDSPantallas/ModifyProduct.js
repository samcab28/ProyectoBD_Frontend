import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function ModifyProduct() {
    const [producto, setProducto] = useState('');
    const [campoModificar, setCampoModificar] = useState('');
    const [valorNuevo, setValorNuevo] = useState('');

    const camposModificables = [];
    camposModificables.push(<option key={'NombreProducto'} value={'NombreProducto'}>{'Nombre'}</option>);
    camposModificables.push(<option key={'PrecioProducto'} value={'PrecioProducto'}>{'Precio'}</option>);
    camposModificables.push(<option key={'DescripcionProducto'} value={'DescripcionProducto'}>{'Descripción'}</option>);
    camposModificables.push(<option key={'Cantidad'} value={'Cantidad'}>{'Cantidad disponible'}</option>);

    const navigate = useNavigate(); 
    const [productos, setProductos] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:3001/producto/sucursal/${user.Sucursal}`)
            .then(response => response.json())
            .then(data => {
                console.log("Productos fetched:", data); // Debug line
                setProductos(data);
            })
            .catch(error => console.error('Error fetching producto:', error));
    }, [user.Sucursal]);

    function handleSubmit(e) {
        e.preventDefault();
        
        const updateData = {
            campoModificar: campoModificar,
            valorNuevo: valorNuevo
        };

        console.log(producto);
        console.log("json: ", updateData);
    
        fetch(`http://localhost:3001/producto/${producto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
        .then(response => {
            if (response.ok) {
                alert('Información modificada exitosamente');
                window.location.reload(); // Recargar la página
            } else {
                alert('Error al modificar la información del producto');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    }

    return (
        <div>
            <h2>Modificar Información de Producto</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Producto:
                    <select
                        name="producto"
                        value={producto}
                        onChange={e => setProducto(e.target.value)}
                    >
                        <option value="">Seleccione un producto</option>
                        {productos.map(product => (
                            <option key={product.IdProducto} value={product.IdProducto}>{product.IdProducto} - {product.NombreProducto}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Campo que desea modificar:
                    <select
                        name="campoModificar"
                        value={campoModificar}
                        onChange={e => setCampoModificar(e.target.value)}
                    >
                        <option value="">Seleccione un campo</option>
                        {camposModificables}
                    </select>
                </label>
                <br/>
                <label>
                    Nuevo Dato: <input name="valorNuevo" type="text" value={valorNuevo} onChange={e => setValorNuevo(e.target.value)} />
                </label><br/>
                <button type="submit">Guardar Cambios</button>
            </form>          
        </div>
    );
}

export default ModifyProduct;
