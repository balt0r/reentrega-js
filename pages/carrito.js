let carrito = [];

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

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('cantidadProductos');
    contadorCarrito.innerText = carrito.length;
}

function agregarAlCarrito(idProducto, productos) {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
        carrito.push(producto);
        actualizarContadorCarrito(); 
        calcularTotal(); 
    } else {
        console.error('Producto no encontrado:', idProducto);
    }
}

function mostrarCarrito() {
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    actualizarContadorCarrito(); 
    calcularTotal(); 
}

function calcularTotal() {
    const total = carrito.reduce((acum, producto) => acum + producto.precio, 0);
    const contenedorTotal = document.getElementById('total');
    contenedorTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

function realizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de realizar la compra.");
        return;
    }

    alert("¡Compra realizada con éxito! Gracias por tu compra.");

    carrito = [];
    actualizarContadorCarrito(); 
    calcularTotal(); 
}

document.getElementById('vaciarCarrito').addEventListener('click', () => {
    carrito = [];
    actualizarContadorCarrito(); 
    calcularTotal(); 
});

document.getElementById('realizarCompra').addEventListener('click', realizarCompra);

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito(); 
    cargarProductos();
});
