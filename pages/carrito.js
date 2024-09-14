let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function cargarProductos() {
    fetch('../productos.json')
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
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
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

document.getElementById('volverInicio').addEventListener('click', () => {
    window.location.href = '../index.html';
});

function actualizarContadorCarrito() {
    const contadorCarrito = document.getElementById('cantidadProductos');
    contadorCarrito.innerText = carrito.length;
}

document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.getElementById('checkout-button');
    const personalInfoForm = document.getElementById('personal-info-form');
    const personalInfoFormElement = document.getElementById('personal-info');

    function showPersonalInfoForm() {
        personalInfoForm.style.display = 'block';
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;


        alert('Compra completada con éxito!');
        
        personalInfoForm.style.display = 'none';
        personalInfoFormElement.reset();
    }

    checkoutButton.addEventListener('click', showPersonalInfoForm);

    personalInfoFormElement.addEventListener('submit', handleFormSubmit);
});


function agregarAlCarrito(idProducto, productos) {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
        const productoEnCarrito = carrito.find(p => p.id === idProducto);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
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

function calcularTotal() {
    const total = carrito.reduce((acum, producto) => acum + producto.precio * producto.cantidad, 0);
    const contenedorTotal = document.getElementById('total');
    contenedorTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('carritoProductos');
    
    if (!contenedorCarrito) {
        console.error('No se encontró el contenedor del carrito');
        return;
    }

    contenedorCarrito.innerHTML = ''; 

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        carrito.forEach(producto => {
            contenedorCarrito.innerHTML += `
                <div class="producto-carrito">
                    <p>${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}</p>
                    <button onclick="aumentarCantidad(${producto.id})">+</button>
                    <button onclick="disminuirCantidad(${producto.id})">-</button>
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </div>
            `;
        });
    }
}

function aumentarCantidad(idProducto) {
    const producto = carrito.find(p => p.id === idProducto);
    if (producto) {
        producto.cantidad++;
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
        mostrarCarrito(); 
        calcularTotal();
    }
}

function disminuirCantidad(idProducto) {
    const producto = carrito.find(p => p.id === idProducto);
    if (producto && producto.cantidad > 1) {
        producto.cantidad--;
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
        mostrarCarrito(); 
        calcularTotal();
    }
}

function eliminarProducto(idProducto) {
    carrito = carrito.filter(producto => producto.id !== idProducto);
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    mostrarCarrito(); 
    actualizarContadorCarrito(); 
    calcularTotal();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem('carrito'); 
    mostrarCarrito(); 
    actualizarContadorCarrito(); 
    calcularTotal();
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito(); 
    calcularTotal(); 
    cargarProductos();
    mostrarCarrito(); 
});

document.getElementById('abrirCarrito').addEventListener('click', () => {
    document.getElementById('carritoPanel').style.display = 'block';
});

document.getElementById('cerrarCarrito').addEventListener('click', () => {
    document.getElementById('carritoPanel').style.display = 'none';
});

document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);
