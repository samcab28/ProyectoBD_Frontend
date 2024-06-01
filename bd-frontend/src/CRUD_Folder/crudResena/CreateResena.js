import React, { useState, useEffect } from 'react';

function CreateResena(){
    const [TituloRes, setTituloRes] = useState('');
    const [ContenidoRes, setContenidoRes] = useState('');
    const [Autor, setNombrePersona] = useState('');
    const [Producto, setNombreProducto] = useState('');

    const [personas, setPersonas] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Fetch personas (gerentes)
        fetch('http://localhost:3001/persona/') // Corregir, debe ser unicamente tipo 3(cliente)
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setPersonas(data);
            })
            .catch(error => console.error('Error fetching personas:', error));
        
        // Fetch animales
        fetch('http://localhost:3001/producto')
            .then(response => response.json())
            .then(data => {
                console.log("productos fetched:", data); // Debug line
                setProductos(data);
            })
            .catch(error => console.error('Error fetching productos:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const newResena = {
            tituloRes: TituloRes,
            contenidoRes: ContenidoRes,
            autor: parseInt(Autor),
            producto: parseInt(Producto)
        };

        fetch('http://localhost:3001/resena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newResena)
        })
            .then(response => {
                if (response.ok) {
                    alert('Resena creada exitosamente');
                    window.location.reload(); // Recargar la página
                } else {
                    alert('Error al crear resena');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    return(
        <div>
            <h2>Crear Resena</h2>
            <form onSubmit={handleSubmit}>
            <label>
                    Titulo Res:
                    <input
                        name="TituloRes"
                        type="text"
                        value={TituloRes}
                        onChange={e => setTituloRes(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Contenido Resena:
                    <input
                        name="ContenidoRes"
                        type="text"
                        value={ContenidoRes}
                        onChange={e => setContenidoRes(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Autor:
                    <select
                        name="autor"
                        value={Autor}
                        onChange={e => setNombrePersona(e.target.value)}
                    >
                        <option value="">Selecciona un autor</option>
                        {personas.map(persona => (
                            <option key={persona.IdPersona} value={persona.IdPersona}>{persona.NombrePersona} {persona.ApellidoPersona}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Producto:
                    <select
                        name="producto"
                        value={Producto}
                        onChange={e => setNombreProducto(e.target.value)}
                    >
                        <option value="">Selecciona un producto</option>
                        {productos.map(producto => (
                            <option key={producto.IdPersona} value={producto.IdProducto}>{producto.NombreProducto} </option>
                        ))}
                    </select>
                </label>
                <br/>
                <button type="reset">Reset data</button>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default CreateResena;