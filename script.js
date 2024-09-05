document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        if (username === "admin" && password === "1234") {
            document.getElementById('loginMessage').textContent = "Inicio de sesión exitoso!";
        } else {
            throw new Error("Usuario o contraseña incorrectos.");
        }
    } catch (error) {
        document.getElementById('loginMessage').textContent = error.message;
    } finally {
        console.log('Proceso de logeo finalizado.');
    }
});

const pantalla = document.getElementById('pantalla');
const botones = document.querySelectorAll('.btn');
let operacion = '';

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.textContent;
        try {
            if (valor === '=') {
                if (operacion === '') throw new Error('Operación vacía');
                pantalla.value = eval(operacion);
                operacion = pantalla.value;
            } else if (valor === 'C') {
                operacion = '';
                pantalla.value = '';
            } else {
                operacion += valor;
                pantalla.value = operacion;
            }
        } catch (error) {
            pantalla.value = error.message;
        } finally {
            console.log('Operación calculada o limpiada.');
        }
    });
});

document.getElementById('verTienda').addEventListener('click', () => {
    try {
        window.location.href = 'pages/tienda.html';
    } catch (error) {
        console.error("Error al intentar redirigir a la tienda: ", error);
    } finally {
        console.log('Intento de redirigir a la tienda completado.');
    }
});
