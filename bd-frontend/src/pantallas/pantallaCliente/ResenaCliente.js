import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../Styles/PageContainer.css';
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";

function ResenaCliente() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [resenas, setResenas] = useState([]);
    const [puntuacion, setPuntuacion] = useState([]);

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




    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
                {product && puntuacion && (
                    <>
                        <h2>Reseña de {product[0].NombreProducto} de la marca {product[0].NombreMarcaPro} puntuacion de {puntuacion[0].PuntuacionPromedio}</h2>
                        <div className="product-grid">
                            {resenas.map(resena => (
                                <div className="product-card" key={resena.IdResPro}>
                                    <p><strong>Autora:</strong> {resena.Nombre_Completo}</p>
                                    <p><strong>Titulo:</strong> {resena.TituloRes}</p>
                                    <p><strong>Descripcion:</strong> {resena.ContenidoRes}</p>
                                    <p><strong>Puntuacion:</strong> {resena.Puntuacion}</p>
                                </div>
                            ))}
                        </div>
                        <button>Agregar Resena</button>
                        <button onClick={handleRegresar}>Regresar</button>
                    </>
                )}

            </main>
        </div>
    );

}

export default ResenaCliente;
