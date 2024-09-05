// Incluye SweetAlert2 desde un CDN en tu HTML, no uses import en el archivo JS si no usas módulos ES6
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>

let carrito = [];

// Función para cargar productos desde el archivo JSON
function cargarProductos() {
    fetch('/productos.json')
        .then(response => response.json())
        .then(data => {
            mostrarProductos(data);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

// Función para mostrar productos en el DOM
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = ''; 
    productos.forEach((producto) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="boton-agregar" data-id="${producto.id}">Agregar al Carrito</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });

    const botonesAgregar = document.querySelectorAll('.boton-agregar');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const idProducto = parseInt(event.target.getAttribute('data-id'));
            agregarAlCarrito(idProducto, productos);
        });
    });
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('cantidadProductos');
    contadorCarrito.innerText = carrito.length;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto, productos) {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
        carrito.push(producto);
        actualizarContadorCarrito(); 
        calcularTotal(); 
        Swal.fire({
            title: 'Producto agregado',
            text: 'El producto se ha agregado al carrito con éxito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } else {
        console.error('Producto no encontrado:', idProducto);
        Swal.fire({
            title: 'Error',
            text: 'No se pudo encontrar el producto.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Función para calcular el total de la compra
function calcularTotal() {
    const total = carrito.reduce((acum, producto) => acum + producto.precio, 0);
    const contenedorTotal = document.getElementById('total');
    contenedorTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Función para realizar la compra
function realizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'Carrito vacío',
            text: 'El carrito está vacío. Agrega productos antes de realizar la compra.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    Swal.fire({
        title: 'Compra realizada',
        text: '¡Compra realizada con éxito! Gracias por tu compra.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        carrito = [];
        actualizarContadorCarrito(); 
        calcularTotal(); 
    });
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarContadorCarrito(); 
    calcularTotal(); 
}

// Asociar eventos a los botones
document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);
document.getElementById('realizarCompra').addEventListener('click', realizarCompra);

// Inicializar el carrito al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito(); 
    cargarProductos();
});
