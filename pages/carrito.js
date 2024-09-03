const productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 },
];

let carrito = [];

function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos');
    productos.forEach((producto) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="boton-agregar" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        contenedorProductos.appendChild(productoDiv);
    });
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);
    mostrarCarrito();
}

function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('carrito');
    contenedorCarrito.innerHTML = ''; 
    carrito.forEach((producto, index) => {
        const itemCarrito = document.createElement('div');
        itemCarrito.classList.add('carrito-item');
        itemCarrito.innerHTML = `
            <h4>${producto.nombre}</h4>
            <p>Precio: $${producto.precio}</p>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        contenedorCarrito.appendChild(itemCarrito);
    });
    calcularTotal();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1); 
    mostrarCarrito(); 
}

function calcularTotal() {
    const total = carrito.reduce((acum, producto) => acum + producto.precio, 0);
    const contenedorTotal = document.getElementById('total');
    contenedorTotal.innerHTML = `Total: $${total}`;
}

document.getElementById('vaciarCarrito').addEventListener('click', () => {
    carrito = [];
    mostrarCarrito();
});

mostrarProductos();
