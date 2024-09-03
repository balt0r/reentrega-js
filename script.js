
document.getElementById('registro').style.display = 'none';
document.getElementById('calculadora').style.display = 'none';
const registrarUsuario = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    if (nombre && apellido) {
        const usuario = `${nombre} ${apellido}`;
        localStorage.setItem('usuario', usuario);
        document.getElementById('resultado').textContent = `Bienvenido ${usuario}`;
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
    } else {
        document.getElementById('resultado').textContent = 'Por favor, complete ambos campos.';
    }
};

const realizarCalculo = () => {
    const numero1 = Number(document.getElementById('numero1').value);
    const numero2 = Number(document.getElementById('numero2').value);
    const operador = document.getElementById('operador').value;
    let total;

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
            total = numero1 / numero2;
            document.getElementById('resultado').textContent = `El resultado de la división es: ${total}`;
            break;
        default:
            document.getElementById('resultado').textContent = 'Operación no válida.';
            break;
    }
};

document.getElementById('registrarse').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('registro').style.display = 'block';
});

document.getElementById('guardarUsuario').addEventListener('click', registrarUsuario);

document.getElementById('usarCalculadora').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('calculadora').style.display = 'block';
});

document.getElementById('calcular').addEventListener('click', realizarCalculo);

const botones = document.getElementsByClassName('volver');

for (const boton of botones) {
    boton.addEventListener('click', () => {
        document.getElementById('menu').style.display = 'block';
        document.getElementById('registro').style.display = 'none';
        document.getElementById('calculadora').style.display = 'none';
        document.getElementById('resultado').textContent = 'Gracias por usar la aplicación.';
    });
}

window.onload = () => {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
        document.getElementById('resultado').textContent = `Bienvenido de nuevo ${usuario}`;
    }
};







