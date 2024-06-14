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
            }
        } else {
            console.error('Error: el formato de los datos no es el esperado o el campo cantidad está ausente.');
        }
    } catch (error) {
        console.error('Error al obtener el conteo de logins falsos:', error);
    }
};

export default {checkHistorialLoginMinuto};
