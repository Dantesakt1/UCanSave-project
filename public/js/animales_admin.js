// Cargar animales desde localStorage o inicializar con un array vacío
let animales = JSON.parse(localStorage.getItem("animales")) || [];

// Función para guardar animales en localStorage
function guardarAnimales() {
    localStorage.setItem("animales", JSON.stringify(animales));
}

// Función para mostrar los animales en la tabla
function mostrarAnimalesAdmin() {
    const tabla = document.querySelector("#tablaAnimales tbody");
    tabla.innerHTML = ""; // Limpia la tabla

    animales.forEach((animal, index) => {
        const fila = `
            <tr>
                <td>${animal.nombre}</td>
                <td>${animal.especie}</td>
                <td>${animal.descripcion}</td>
                <td>$${animal.precio}</td>
                <td><img src="${animal.imagen}" width="100"></td>
                <td>
                    <button onclick="abrirModalEditar(${index})">Editar</button>
                    <button onclick="eliminarAnimal(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// Función para abrir un modal
function abrirModal(idModal) {
    document.getElementById(idModal).style.display = "block";
}

// Función para cerrar un modal
function cerrarModal(idModal) {
    document.getElementById(idModal).style.display = "none";
}

// Función para agregar un nuevo animal
document.getElementById("formAgregar").addEventListener("submit", function (e) {
    e.preventDefault();
    const nuevoAnimal = {
        id: animales.length > 0 ? animales[animales.length - 1].id + 1 : 1,
        nombre: document.getElementById("nombre").value,
        especie: document.getElementById("especie").value,
        descripcion: document.getElementById("descripcion").value,
        precio: parseFloat(document.getElementById("precio").value),
        imagen: document.getElementById("imagen").value
    };
    animales.push(nuevoAnimal);
    guardarAnimales(); // Guardar en localStorage
    cerrarModal("modalAgregar");
    mostrarAnimalesAdmin();
});

// Función para abrir el modal de edición con los datos del animal
function abrirModalEditar(index) {
    const animal = animales[index];
    document.getElementById("editarId").value = index;
    document.getElementById("editarNombre").value = animal.nombre;
    document.getElementById("editarEspecie").value = animal.especie;
    document.getElementById("editarDescripcion").value = animal.descripcion;
    document.getElementById("editarPrecio").value = animal.precio;
    document.getElementById("editarImagen").value = animal.imagen;
    abrirModal("modalEditar");
}

// Función para guardar los cambios al editar un animal
document.getElementById("formEditar").addEventListener("submit", function (e) {
    e.preventDefault();
    const index = document.getElementById("editarId").value;
    animales[index] = {
        id: animales[index].id,
        nombre: document.getElementById("editarNombre").value,
        especie: document.getElementById("editarEspecie").value,
        descripcion: document.getElementById("editarDescripcion").value,
        precio: parseFloat(document.getElementById("editarPrecio").value),
        imagen: document.getElementById("editarImagen").value
    };
    guardarAnimales(); // Guardar en localStorage
    cerrarModal("modalEditar");
    mostrarAnimalesAdmin();
});

// Función para eliminar un animal
function eliminarAnimal(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este animal?")) {
        animales.splice(index, 1);
        guardarAnimales(); // Guardar en localStorage
        mostrarAnimalesAdmin();
    }
}

// Exponer las funciones necesarias al ámbito global
window.abrirModalEditar = abrirModalEditar;
window.eliminarAnimal = eliminarAnimal;

// Mostrar los animales al cargar la página
mostrarAnimalesAdmin();