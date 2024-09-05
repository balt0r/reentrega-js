document.getElementById('registro').style.display = 'none';
document.getElementById('calculadora').style.display = 'none';

// Función para registrar usuario
const registrarUsuario = () => {
    try {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        if (nombre && apellido) {
            const usuario = `${nombre} ${apellido}`;
            localStorage.setItem('usuario', usuario);
            document.getElementById('resultado').textContent = `Bienvenido ${usuario}`;
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
        } else {
            throw new Error('Por favor, complete ambos campos.');
        }
    } catch (error) {
        document.getElementById('resultado').textContent = error.message;
    } finally {
        console.log('Intento de registro completado');
    }
};

// Función para realizar cálculos
const realizarCalculo = () => {
    try {
        const numero1 = Number(document.getElementById('numero1').value);
        const numero2 = Number(document.getElementById('numero2').value);
        const operador = document.getElementById('operador').value;
        let total;

        if (isNaN(numero1) || isNaN(numero2)) {
            throw new Error('Por favor, ingrese números válidos.');
        }

        switch (operador) {
            case '1':
                total = numero1 + numero2;
                document.getElementById('resultado').textContent = `El resultado de la suma es: ${total}`;
                break;
            case '2':
                total = numero1 - numero2;
                document.getElementById('resultado').textContent = `El resultado de la resta es: ${total}`;
                break;
            case '3':
                total = numero1 * numero2;
                document.getElementById('resultado').textContent = `El resultado de la multiplicación es: ${total}`;
                break;
            case '4':
                if (numero2 === 0) {
                    throw new Error('No se puede dividir por cero.');
                }
                total = numero1 / numero2;
                document.getElementById('resultado').textContent = `El resultado de la división es: ${total}`;
                break;
            default:
                throw new Error('Operación no válida.');
        }
    } catch (error) {
        document.getElementById('resultado').textContent = error.message;
    } finally {
        console.log('Intento de cálculo completado');
    }
};

// Configuración de eventos
document.getElementById('registrarse').addEventListener('click', () => {
    try {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('registro').style.display = 'block';
    } catch (error) {
        console.error(`Error al mostrar el registro: ${error.message}`);
    }
});

document.getElementById('guardarUsuario').addEventListener('click', registrarUsuario);

document.getElementById('usarCalculadora').addEventListener('click', () => {
    try {
        document.getElementById('menu').style.display = 'none';
        document.getElementById('calculadora').style.display = 'block';
    } catch (error) {
        console.error(`Error al mostrar la calculadora: ${error.message}`);
    }
});

document.getElementById('calcular').addEventListener('click', realizarCalculo);

const botones = document.getElementsByClassName('volver');

for (const boton of botones) {
    boton.addEventListener('click', () => {
        try {
            document.getElementById('menu').style.display = 'block';
            document.getElementById('registro').style.display = 'none';
            document.getElementById('calculadora').style.display = 'none';
            document.getElementById('resultado').textContent = 'Gracias por usar la aplicación.';
        } catch (error) {
            console.error(`Error al volver al menú: ${error.message}`);
        }
    });
}

window.onload = () => {
    try {
        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            document.getElementById('resultado').textContent = `Bienvenido de nuevo ${usuario}`;
        }
    } catch (error) {
        console.error(`Error al cargar el usuario: ${error.message}`);
    } finally {
        console.log('Carga de la ventana completada');
    }
};






