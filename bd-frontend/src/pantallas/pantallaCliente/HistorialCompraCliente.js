import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../Styles/PageContainer.css'; // Importa el archivo de estilos
import fondoVet from '../../Imagenes/FondoVet.jpg';
import NavCliente from "./NavCliente";
import logHistorialClick from '../../seguridad/historialClick';

function HistorialCompraCliente() {
    const { user } = useContext(UserContext);
    const [pedidos, setPedidos] = useState([]);
    const [detallesPedido, setDetallesPedido] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [sortOption, setSortOption] = useState('antiguedad-desc');

    useEffect(() => {
        if (user && user.IdPersona) {
            fetch(`http://localhost:3001/pedido/cliente/${user.IdPersona}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Pedidos fetched:", data);
                    setPedidos(data);
                    sortPedidos(sortOption, data);
                })
                .catch(error => console.error('Error fetching pedidos:', error));
        }
    }, [user]);

    useEffect(() => {
        if (selectedPedido) {
            fetch(`http://localhost:3001/detallepedido/pedido/${selectedPedido.IdPedido}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Detalles del pedido fetched:", data);
                    setDetallesPedido(data);
                })
                .catch(error => console.error('Error fetching detalles del pedido:', error));
        }
    }, [selectedPedido]);

    const handlePedidoClick = (pedido) => {
        logHistorialClick(user, "Ver detalles del pedido", `Pedido id: ${pedido.IdPedido}`);
        if (selectedPedido && selectedPedido.IdPedido === pedido.IdPedido) {
            setSelectedPedido(null); // Oculta los detalles si se vuelve a hacer clic en el pedido
        } else {
            setSelectedPedido(pedido);
        }
    };

    const handleSortChange = (event) => {
        const sortOption = event.target.value;
        logHistorialClick(user, "Cambiar orden de los pedidos", `Orden: ${sortOption}`);
        setSortOption(sortOption);
        sortPedidos(sortOption);
    };

    const sortPedidos = (option, data = pedidos) => {
        let sortedPedidos = [...data];
        switch (option) {
            case 'antiguedad-asc':
                sortedPedidos.sort((a, b) => new Date(a.FechaPedido) - new Date(b.FechaPedido));
                break;
            case 'antiguedad-desc':
                sortedPedidos.sort((a, b) => new Date(b.FechaPedido) - new Date(a.FechaPedido));
                break;
            case 'monto-asc':
                sortedPedidos.sort((a, b) => a.MontoTotal - b.MontoTotal);
                break;
            case 'monto-desc':
                sortedPedidos.sort((a, b) => b.MontoTotal - a.MontoTotal);
                break;
            default:
                break;
        }
        setPedidos(sortedPedidos);
    };

    return (
        <div className="home-screen">
            <header className="header">
                <img src={fondoVet} alt="Veterinary Clinic" className="header-image"/>
            </header>
            <NavCliente/>
            <main className="main-content">
                <h2>Historial del cliente</h2>
                <label>Ordenar por: </label>
                <select value={sortOption} onChange={handleSortChange}>
                    <option value="antiguedad-asc">Antigüedad Ascendente</option>
                    <option value="antiguedad-desc">Antigüedad Descendente</option>
                    <option value="monto-asc">Monto Ascendente</option>
                    <option value="monto-desc">Monto Descendente</option>
                </select>
                <div className="list-container">
                    {pedidos.map(pedido => (
                        <div className="list-item" key={pedido.IdPedido} onClick={() => handlePedidoClick(pedido)}>
                            <div className="list-item-content">
                                <p><strong>ID Pedido:</strong> {pedido.IdPedido}</p>
                                <p><strong>Fecha:</strong> {new Date(pedido.FechaPedido).toLocaleDateString()}</p>
                                <p><strong>Monto Total:</strong> {pedido.MontoTotal}</p>
                                <p><strong>Estado:</strong> {pedido.EstadoPedido}</p>
                            </div>
                            {selectedPedido && selectedPedido.IdPedido === pedido.IdPedido && (
                                <div className="details-container">
                                    {detallesPedido.map(detalle => (
                                        <div className="list-item-detail" key={detalle.IdProducto}>
                                            <div className="list-item-detail-content">
                                                <p><strong>Producto:</strong> {detalle.NombreProducto}</p>
                                                <p><strong>Descripción:</strong> {detalle.DescripcionProducto}</p>
                                                <p><strong>Marca:</strong> {detalle.NombreMarcaPro}</p>
                                                <p><strong>Cantidad:</strong> {detalle.Cantidad}</p>
                                                <p><strong>Precio:</strong> {detalle.PrecioProducto}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default HistorialCompraCliente;
