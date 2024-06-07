import React, { useState, useEffect } from "react";

function CreateMedicamento() {
    const [nombreProducto, setNombreProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [descripcionProducto, setDescripcionProducto] = useState('');
    const [idMarcaPro, setIdMarcaPro] = useState('');
    const [fechaCaducidad, setFechaCaducidad] = useState('');
    const [idUnidadMedida, setIdUnidadMedida] = useState('');
    const [idTipoMedicamento, setIdTipoMedicamento] = useState('');
    const [aptoPublico, setAptoPublico] = useState(false);
    const [idSucursal, setIdSucursal] = useState('');
    const [cantidad, setCantidad] = useState('');

    const [marcas, setMarcas] = useState([]);
    const [unidadesMedida, setUnidadesMedida] = useState([]);
    const [tiposMedicamento, setTiposMedicamento] = useState([]);
    const [sucursales, setSucursales] = useState([]);

    useEffect(() => {
        // Fetch marcas
        fetch('http://localhost:3001/marcaProducto')
            .then(response => response.json())
            .then(data => {
                setMarcas(data);
            })
            .catch(error => console.error('Error fetching marcas:', error));

        // Fetch unidades de medida
        fetch('http://localhost:3001/unidadMedida')
            .then(response => response.json())
            .then(data => {
                setUnidadesMedida(data);
            })
            .catch(error => console.error('Error fetching unidades de medida:', error));

        // Fetch tipos de medicamento
        fetch('http://localhost:3001/tipoMedicamento')
            .then(response => response.json())
            .then(data => {
                setTiposMedicamento(data);
            })
            .catch(error => console.error('Error fetching tipos de medicamento:', error));

        // Fetch sucursales
        fetch('http://localhost:3001/sucursal')
            .then(response => response.json())
            .then(data => {
                setSucursales(data);
            })
            .catch(error => console.error('Error fetching sucursales:', error));
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const newMedicamento = {
            NombreProducto: nombreProducto,
            PrecioProducto: parseFloat(precioProducto),
            DescripcionProducto: descripcionProducto,
            IdTipoPro: 2, // TipoProducto siempre es 2
            IdMarcaPro: parseInt(idMarcaPro),
            IdUrl: 1, // IdUrl siempre es 1
            FechaCaducidad: fechaCaducidad,
            IdUnidadMedida: parseInt(idUnidadMedida),
            IdTipoMedicamento: parseInt(idTipoMedicamento),
            AptoPublico: aptoPublico,
            IdSucursal: parseInt(idSucursal),
            Cantidad: parseInt(cantidad)
        };

        fetch('http://localhost:3001/medicamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMedicamento)
        })
            .then(response => {
                if (response.ok) {
                    alert('Medicamento creado exitosamente');
                    window.location.reload(); // Recargar la página
                } else {
                    alert('Error al crear medicamento');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    }

    return (
        <div>
            <h2>Crear Medicamento</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre Producto:
                    <input
                        name="nombreProducto"
                        type="text"
                        value={nombreProducto}
                        onChange={e => setNombreProducto(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Precio Producto:
                    <input
                        name="precioProducto"
                        type="text"
                        value={precioProducto}
                        onChange={e => setPrecioProducto(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Descripción Producto:
                    <input
                        name="descripcionProducto"
                        type="text"
                        value={descripcionProducto}
                        onChange={e => setDescripcionProducto(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Marca Producto:
                    <select
                        name="IdMarcaPro"
                        value={idMarcaPro}
                        onChange={e => setIdMarcaPro(e.target.value)}
                    >
                        <option value="">Selecciona una marca</option>
                        {marcas.map(marca => (
                            <option key={marca.IdMarcaPro} value={marca.IdMarcaPro}>{marca.NombreMarcaPro}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Fecha Caducidad:
                    <input
                        name="fechaCaducidad"
                        type="date"
                        value={fechaCaducidad}
                        onChange={e => setFechaCaducidad(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Unidad de Medida:
                    <select
                        name="IdUnidad"
                        value={idUnidadMedida}
                        onChange={e => setIdUnidadMedida(e.target.value)}
                    >
                        <option value="">Selecciona una unidad de medida</option>
                        {unidadesMedida.map(unidad => (
                            <option key={unidad.IdUnidad} value={unidad.IdUnidad}>{unidad.NombreUnidad}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Tipo de Medicamento:
                    <select
                        name="IdTMedicamento"
                        value={idTipoMedicamento}
                        onChange={e => setIdTipoMedicamento(e.target.value)}
                    >
                        <option value="">Selecciona un tipo de medicamento</option>
                        {tiposMedicamento.map(tipo => (
                            <option key={tipo.IdTMedicamento} value={tipo.IdTMedicamento}>{tipo.TipoMedicamento}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Apto para el Público:
                    <select
                        name="aptoPublico"
                        value={aptoPublico}
                        onChange={e => setAptoPublico(e.target.value === 'true')}
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </select>
                </label>
                <br/>
                <label>
                    Sucursal:
                    <select
                        name="idSucursal"
                        value={idSucursal}
                        onChange={e => setIdSucursal(e.target.value)}
                    >
                        <option value="">Selecciona una sucursal</option>
                        {sucursales.map(sucursal => (
                            <option key={sucursal.IdSucursal} value={sucursal.IdSucursal}>{sucursal.NombreSucursal}</option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    Cantidad:
                    <input
                        name="cantidad"
                        type="text"
                        value={cantidad}
                        onChange={e => setCantidad(e.target.value)}
                    />
                </label>
                <br/>
                <button type="reset">Reset</button>
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default CreateMedicamento;
