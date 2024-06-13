// src/seguridad/historialClick.js

const logHistorialClick = async (user, accion, detalle) => {
    try {
        await fetch('http://localhost:3001/HistorialClick', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fechaClick: new Date().toISOString(),
                IdPersona: user.IdPersona,
                Accion: accion,
                Detalle: detalle
            }),
        });
    } catch (error) {
        console.error('Error logging historial click:', error);
    }
};

export default logHistorialClick;
