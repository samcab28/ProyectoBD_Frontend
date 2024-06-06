import React, {useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../Styles/PageContainer.css';
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";
import {UserContext} from "../../context/UserContext";

function ResenaCliente() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [resenas, setResenas] = useState([]);
    const [puntuacion, setPuntuacion] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const { user } = useContext(UserContext);
    const [puntuacionNumero, setPuntuacionNumero] = useState(0);

    const handleRegresar = () => {
        navigate('/cliente/producto'); // Cambia '/another' por la ruta deseada
    };

    //carga de informacion del puntaje del producto
    useEffect(() => {
        fetch(`http://localhost:3001/puntuacion/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Puntuacion fetched:", data);
                setPuntuacion(data);
            })
            .catch(error => console.error('Error fetching puntuacion:', error));
    }, [id]);

    //carga de la informacion del producto
    useEffect(() => {
        fetch(`http://localhost:3001/producto/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("Producto fetched:", data);
                setProduct(data);
            })
            .catch(error => console.error('Error fetching producto:', error));
    }, [id]);

    //carga de la informacion de las resenas segun el id producto
    useEffect(() => {
        fetch(`http://localhost:3001/resenaByProducto/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("resenas fetched:", data);
                setResenas(data);
            })
            .catch(error => console.error('Error fetching resenas:', error));
    }, [id]);


    function handleSubmit(e){
        e.preventDefault();

        console.log("usuario de persona",user.IdPersona);
        if (!user || !user.IdPersona) {
            alert('Por favor, inicie sesión para dejar una reseña.');
            return;
        }

        const formData = {
            TituloRes: titulo,
            ContenidoRes: contenido,
            IdAutor: user.IdPersona,
            IdProducto: parseInt(id),
            Puntuacion: parseInt(puntuacionNumero)
        };

        console.log(formData);

        fetch('http://localhost:3001/resena', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    alert('resena creada exitosamente');
                    window.location.reload(); // Recargar la página
                } else {
                    alert('Error al crear la resena');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }


    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
                {product && (
                    <>
                        <h2>Reseña de {product[0].NombreProducto} de la marca {product[0].NombreMarcaPro} puntuacion
                            de {puntuacion.length > 0 ? puntuacion[0].PuntuacionPromedio : 'N/A'}</h2>
                        <div className="product-grid">
                            {resenas.map(resena => (
                                <div className="product-card" key={resena.IdResPro}>
                                    <p><strong>Autor:</strong> {resena.Nombre_Completo}</p>
                                    <p><strong>Titulo:</strong> {resena.TituloRes}</p>
                                    <p><strong>Descripcion:</strong> {resena.ContenidoRes}</p>
                                    <p><strong>Puntuacion:</strong> {resena.Puntuacion}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <h2>Deja tu propia reseña sobre este producto</h2>
                <form onSubmit={handleSubmit} className="review-form">
                    <label>
                        Titulo de la reseña:
                        <input
                            name="titulo"
                            type="text"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            className="form-input"
                        />
                    </label><br/>
                    <label>
                        Contenido de la reseña:
                        <textarea
                            name="contenido"
                            value={contenido}
                            onChange={e => setContenido(e.target.value)}
                            className="form-textarea"
                        />
                    </label><br/>
                    <label>
                        Puntuacion:
                        <select
                            name="puntuacion"
                            value={puntuacionNumero}
                            onChange={e => setPuntuacionNumero(e.target.value)}
                            className="form-select"
                        >
                            {Array.from({length: 11}, (_, i) => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                    </label><br/>

                    <button type="submit" className="form-button">Guardar</button>
                </form>
                <br/>
                <button onClick={handleRegresar} className="form-button">Regresar</button>
            </main>
        </div>
    );
}

export default ResenaCliente;
