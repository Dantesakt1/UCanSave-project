// Datos de ejemplo
const datosDePrueba = [
    { id: 1, rut: "11.111.111-1", nombre: "Juan Pérez", correo: "juanperez@mail.com", contraseña: "1234", repetirContraseña: "1234" },
    { id: 2, rut: "22.222.222-2", nombre: "María López", correo: "marialopez@mail.com", contraseña: "abcd", repetirContraseña: "abcd" },
    { id: 3, rut: "33.333.333-3", nombre: "Carlos Díaz", correo: "carlosdiaz@mail.com", contraseña: "5678", repetirContraseña: "5678" },
    { id: 4, rut: "44.444.444-4", nombre: "Ana Torres", correo: "anatorres@mail.com", contraseña: "efgh", repetirContraseña: "efgh" },
    { id: 5, rut: "55.555.555-5", nombre: "Luis Gómez", correo: "luisgomez@mail.com", contraseña: "91011", repetirContraseña: "91011" }
];

// Función para cargar usuarios desde localStorage
function cargarUsuarios() {
    const usuariosGuardados = localStorage.getItem("usuarios");
    if (usuariosGuardados) {
        return JSON.parse(usuariosGuardados); // Si hay datos en localStorage, los devuelve
    } else {
        // Si no hay datos, guarda los datos de prueba en localStorage
        localStorage.setItem("usuarios", JSON.stringify(datosDePrueba));
        return datosDePrueba;
    }
}

// Función para guardar usuarios en localStorage
function guardarUsuarios() {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Inicializar usuarios desde localStorage o datos de prueba
let usuarios = cargarUsuarios();

// Función para mostrar los usuarios en la tabla
function mostrarUsuarios() {
    const tabla = document.querySelector("#tablaUsuarios tbody");
    tabla.innerHTML = ""; // Limpia la tabla

    usuarios.forEach((usuario, index) => {
        const fila = `
            <tr>
                <td>${usuario.rut}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>
                    <button onclick="abrirModalEditar(${index})">Editar</button>
                    <button onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// Función para abrir un modal
function abrirModal(idModal) {
    document.getElementById(idModal).classList.add('active');
    document.getElementById('fondoOscuro').classList.add('active');
}

// Función para cerrar un modal
function cerrarModal(idModal) {
    document.getElementById(idModal).classList.remove('active');
    document.getElementById('fondoOscuro').classList.remove('active');
}

// Función para agregar un nuevo usuario
document.getElementById("formAgregarUsuario").addEventListener("submit", function (e) {
    e.preventDefault();
    const nuevoUsuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1, // Genera un nuevo ID
        rut: document.getElementById("rut").value,
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        contraseña: document.getElementById("contraseña").value,
        repetirContraseña: document.getElementById("repetirContraseña").value
    };
    usuarios.push(nuevoUsuario);
    guardarUsuarios(); // Guardar en localStorage
    cerrarModal("modalAgregarUsuario");
    mostrarUsuarios();
});

// Función para abrir el modal de edición con los datos del usuario
function abrirModalEditar(index) {
    const usuario = usuarios[index];
    document.getElementById("editarId").value = index;
    document.getElementById("editarRut").value = usuario.rut;
    document.getElementById("editarNombre").value = usuario.nombre;
    document.getElementById("editarCorreo").value = usuario.correo;
    document.getElementById("editarContraseña").value = usuario.contraseña;
    document.getElementById("editarRepetirContraseña").value = usuario.repetirContraseña;
    abrirModal("modalEditarUsuario");
}

// Función para guardar los cambios al editar un usuario
document.getElementById("formEditarUsuario").addEventListener("submit", function (e) {
    e.preventDefault();
    const index = document.getElementById("editarId").value;
    usuarios[index] = {
        id: usuarios[index].id,
        rut: document.getElementById("editarRut").value,
        nombre: document.getElementById("editarNombre").value,
        correo: document.getElementById("editarCorreo").value,
        contraseña: document.getElementById("editarContraseña").value,
        repetirContraseña: document.getElementById("editarRepetirContraseña").value
    };
    guardarUsuarios(); // Guardar en localStorage
    cerrarModal("modalEditarUsuario");
    mostrarUsuarios();
});

// Función para eliminar un usuario
function eliminarUsuario(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        usuarios.splice(index, 1);
        guardarUsuarios(); // Guardar en localStorage
        mostrarUsuarios();
    }
}

// Mostrar los usuarios al cargar la página
mostrarUsuarios();