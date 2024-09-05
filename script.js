document.addEventListener('DOMContentLoaded', (event) => {
    const loginContainer = document.getElementById('loginContainer');
    const calculadoraContainer = document.getElementById('calculadoraContainer');
    const mostrarLogeoBtn = document.getElementById('mostrarLogeo');
    const mostrarCalculadoraBtn = document.getElementById('mostrarCalculadora');

    mostrarLogeoBtn.addEventListener('click', () => {
        loginContainer.classList.toggle('oculto');
    });

    mostrarCalculadoraBtn.addEventListener('click', () => {
        calculadoraContainer.classList.toggle('oculto');
    });

    // Funcionalidad de Logeo
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

    // Funcionalidad de Calculadora
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
});

document.addEventListener('DOMContentLoaded', (event) => {
    const verTiendaBtn = document.getElementById('verTienda');
    
    if (verTiendaBtn) {
        verTiendaBtn.addEventListener('click', () => {
            // Redireccionar a la página de la tienda
            window.location.href = 'pages/tienda.html'; // Ajusta la ruta si es necesario
        });
    } else {
        console.error('El botón para ver la tienda no se encontró.');
    }
});

