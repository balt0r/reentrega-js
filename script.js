let usuario;
const logeo = [];

const cargarDatos = () => {
    let cargarNombre = prompt('Ingrese su nombre');
    let cargarApellido = prompt('Ingrese su apellido');

    usuario = `${cargarNombre} ${cargarApellido}`;  
    logeo.push(usuario);
};

let menu = parseInt(prompt('¿Qué desea hacer?\n1 - Registrarse\n2 - Usar calculadora\n3 - Salir'));

while (menu !== 3) {
    switch (menu) {
        case 1:
            cargarDatos();
            alert('Bienvenido ' + usuario); 
            break;
        case 2:
            let operador = prompt('¿Qué operación desea hacer?\n1 - Sumar\n2 - Restar\n3 - Multiplicar\n4 - Dividir');
            let numero1 = Number(prompt('Ingrese el primer número'));
            let numero2 = Number(prompt('Ingrese el segundo número'));
            let total;

            if (operador == 1) {
                total = numero1 + numero2;
                alert('El resultado de la suma es: ' + total);
            } else if (operador == 2) {
                total = numero1 - numero2;
                alert('El resultado de la resta es: ' + total);
            } else if (operador == 3) {
                total = numero1 * numero2;
                alert('El resultado de la multiplicación es: ' + total);
            } else if (operador == 4) {
                total = numero1 / numero2;
                alert('El resultado de la división es: ' + total);
            } else {
                alert('Opción de operación incorrecta');
            }
            break;
        default:
            alert('No ha ingresado una opción correcta');
            break;
    }

    menu = parseInt(prompt('¿Qué desea hacer?\n1 - Registrarse\n2 - Usar calculadora\n3 - Salir')); 
}

alert('Gracias por usar la aplicación'); 





