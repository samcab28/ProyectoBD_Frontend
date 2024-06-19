// seguridad/NotificacionHistorial.js
const checkHistorialLoginMinuto = async () => {
    try {
        const moment = require('moment');
        const horaActual = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(horaActual);
        const response = await fetch(`http://localhost:3001/HistorialLoginMinuto/${horaActual}`);
        const data = await response.json();

        console.log("informacion desde query", data);

        // Asegúrate de que data es un array y tiene al menos un elemento
        if (Array.isArray(data) && data.length > 0 && data[0].cantidad !== undefined) {
            const cantidad = data[0].cantidad;
            console.log("Cantidad de logins:", cantidad);

            if (cantidad > 2) {
                alert('¡Alerta! Hay más indicios de login de lo normal');

                // Bloquear al usuario
                const username = data[0].username; // Ajusta esto según el formato de tus datos
                await bloquearUsuario(username);
            }
        } else {
            console.error('Error: el formato de los datos no es el esperado o el campo cantidad está ausente.');
        }
    } catch (error) {
        console.error('Error al obtener el conteo de logins falsos:', error);
    }
};

const bloquearUsuario = async (username) => {
    try {
        await fetch('http://localhost:3001/persona/bloquear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });
        console.log(`Usuario ${username} ha sido bloqueado.`);
    } catch (error) {
        console.error('Error al bloquear el usuario:', error);
    }
};

export default { checkHistorialLoginMinuto };
