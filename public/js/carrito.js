// Cargar el carrito desde localStorage o inicializarlo vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para mostrar el carrito en la tabla
function mostrarCarrito() {
    const tabla = document.getElementById("detalle");
    tabla.innerHTML = ""; // Limpia la tabla

    if (carrito.length === 0) {
        tabla.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let contenido = `
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Imagen</th>
                    <th>Operaciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    carrito.forEach((item, index) => {
        contenido += `
            <tr>
                <td>${item.id}</td>
                <td>${item.nombre}</td>
                <td>$${item.precio}</td>
                <td>
                    <button class="btn-cantidad" onclick="disminuirCantidad(${index})">-</button>
                    ${item.cantidad}
                    <button class="btn-cantidad" onclick="aumentarCantidad(${index})">+</button>
                </td>
                <td>$${item.total}</td>
                <td><img src="${item.imagen}" alt="${item.nombre}"></td>
                <td>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    contenido += `
            </tbody>
        </table>
        <br>
        <button class="btn-comprar" onclick="comprarCarrito()">Comprar</button>
    `;

    tabla.innerHTML = contenido;
}

// Función para aumentar la cantidad de un animal en el carrito
function aumentarCantidad(index) {
    carrito[index].cantidad += 1;
    carrito[index].total = carrito[index].cantidad * carrito[index].precio;
    guardarCarrito();
    mostrarCarrito();
}

// Función para disminuir la cantidad de un animal en el carrito
function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
        carrito[index].total = carrito[index].cantidad * carrito[index].precio;
        guardarCarrito();
        mostrarCarrito();
    } else {
        eliminarDelCarrito(index); // Si la cantidad es 1, eliminar el animal
    }
}

// Función para eliminar un animal del carrito
function eliminarDelCarrito(index) {
    if (confirm("¿Desea eliminar este animal del carrito?")) {
        carrito.splice(index, 1);
        guardarCarrito();
        mostrarCarrito();
    }
}

// Función para comprar el carrito
function comprarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. No hay nada para comprar.");
        return;
    }

    window.location.href = '/checkout';

}

// Inicializar la página mostrando el carrito
document.addEventListener("DOMContentLoaded", mostrarCarrito);