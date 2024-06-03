let inactivityTimeout;
let elapsedTime = 0;

function resetInactivityTimeout() {
    clearTimeout(inactivityTimeout);
    elapsedTime = 0;
    inactivityTimeout = setTimeout(() => {
        alert("La página se reinició por inactividad. Por favor, vuelva a iniciar sesión.");
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/';
    }, 1800000); // 30 minutos
}


function startAutoLogout() {
    // Reiniciar el temporizador en cada interacción del usuario
    document.addEventListener('mousemove', resetInactivityTimeout);
    document.addEventListener('keydown', resetInactivityTimeout);
    document.addEventListener('scroll', resetInactivityTimeout);

    // Iniciar el temporizador cuando se carga la página
    resetInactivityTimeout();
}

function stopAutoLogout() {
    // Detener el temporizador y eliminar los event listeners
    clearTimeout(inactivityTimeout);
    document.removeEventListener('mousemove', resetInactivityTimeout);
    document.removeEventListener('keydown', resetInactivityTimeout);
    document.removeEventListener('scroll', resetInactivityTimeout);
}

export default { startAutoLogout, stopAutoLogout };
