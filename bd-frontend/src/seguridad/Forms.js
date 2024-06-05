import React, { useState } from 'react';

function TarjetaForm({ onSubmit }) {
    const [nombrePropietario, setNombrePropietario] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [codigoSeguridad, setCodigoSeguridad] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            NombrePropietario: nombrePropietario,
            NumeroTarjeta: numeroTarjeta,
            CodigoSeguridad: codigoSeguridad,
            FechaVencimiento: fechaVencimiento
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre del Propietario:
                <input type="text" value={nombrePropietario} onChange={(e) => setNombrePropietario(e.target.value)} required />
            </label>
            <label>
                Número de Tarjeta:
                <input type="text" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} required />
            </label>
            <label>
                Código de Seguridad:
                <input type="text" value={codigoSeguridad} onChange={(e) => setCodigoSeguridad(e.target.value)} required />
            </label>
            <label>
                Fecha de Vencimiento:
                <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} required />
            </label>
            <button type="submit">Agregar Tarjeta</button>
        </form>
    );
}

function DireccionForm({ onSubmit }) {
    const [direccionCompleta, setDireccionCompleta] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            DireccionCompleta: direccionCompleta,
            CodigoPostal: codigoPostal
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Dirección Completa:
                <input type="text" value={direccionCompleta} onChange={(e) => setDireccionCompleta(e.target.value)} required />
            </label>
            <label>
                Código Postal:
                <input type="text" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} required />
            </label>
            <button type="submit">Agregar Dirección</button>
        </form>
    );
}

export { TarjetaForm , DireccionForm };
