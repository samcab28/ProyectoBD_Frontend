import React, { useState, useEffect } from 'react';

function CreateResena(){
    const [TituloRes, setTituloRes] = useState('');
    const [ContenidoRes, setContenidoRes] = useState('');
    const [Autor, setNombrePersona] = useState('');
    const [Producto, setNombreProducto] = useState('');

    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        // Fetch personas (gerentes)
        fetch('http://localhost:3001/persona/tipo/3')
            .then(response => response.json())
            .then(data => {
                console.log("personas fetched:", data); // Debug line
                setPersonas(data);
            })
            .catch(error => console.error('Error fetching personas:', error));
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
                <button type="reset">Reset data</button>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default CreateResena;