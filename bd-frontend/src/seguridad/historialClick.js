// src/seguridad/historialClick.js

const logHistorialClick = async (user, accion, detalle) => {
    try {
        const response = await fetch('http://localhost:3001/HistorialClick', {
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

        if (!response.ok) {
            console.error('Error al registrar el historial de clics:', response.statusText);
        }
    } catch (error) {
        console.error('Error logging historial click:', error);
    }
};

export default logHistorialClick;
