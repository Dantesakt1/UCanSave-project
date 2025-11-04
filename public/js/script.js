// NO HAY LISTA DE ANIMALES AQUÍ. La fuente de datos es localStorage y React.

function agregarAnimal(id) {
    console.log("Agregando al carrito el animal con ID:" + id);
    // Leemos la lista correcta desde localStorage
    const data = JSON.parse(localStorage.getItem("listaAnimales"));
    if (!data) {
        console.error("No se encontró la lista de animales en localStorage.");
        return;
    }

    // Buscamos el animal por su ID
    const animalSeleccionado = data.find(animal => animal.id === id);
    if (!animalSeleccionado) {
        console.error("No se encontró el animal con ID " + id);
        return;
    }

    // Usar el precio del animal guardado (o 5000 si no existe)
    const precioAnimal = animalSeleccionado.precio || 5000; 

    // Creamos el producto para el carrito.
    const animalCarro = {
        id: animalSeleccionado.id,
        nombre: animalSeleccionado.nombre,
        precio: precioAnimal,
        cantidad: 1,
        total: precioAnimal,
        imagen: animalSeleccionado.img
    };

    // --- Lógica del carrito ---
    var valor = parseInt(document.getElementById("pie").innerHTML) || 0;
    valor = valor + 1;
    document.getElementById("pie").innerHTML = valor;

    let items = 0;
    let total = 0;
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let existe = false;
    carrito.forEach((item, idx) => {
        if (item.id == animalCarro.id) {
            carrito[idx].cantidad += 1;
            carrito[idx].total = carrito[idx].precio * carrito[idx].cantidad;
            existe = true;
        }
    });

    if (!existe) {
        carrito.push(animalCarro);
    }

    carrito.forEach(i => {
        total += i.total;
    });
    items = carrito.length;

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("Apadrinamiento agregado/actualizado en el carrito.");

    const itemsSpan = document.getElementById("items");
    const totalSpan = document.getElementById("total");
    if (itemsSpan) itemsSpan.innerHTML = items;
    if (totalSpan) totalSpan.innerHTML = total;
}

// --- FUNCIÓN RENDERCATALOGO MODIFICADA ---
// Acepta los animales (filtrados o no) que React le envía.
function renderCatalogo(animales) {
    
    // Busca el contenedor (ID 'catalogo-animales' o clase 'vista')
    // (Se usa 'let' para que no dé error al reasignar)
    let container = document.getElementById('catalogo-animales'); 
    if (!container) {
        container = document.querySelector('.vista'); 
        if (!container) {
             console.error('El contenedor con id "catalogo-animales" o clase "vista" no fue encontrado.');
             return;
        }
    }
    
    container.innerHTML = ''; // Limpia el contenido viejo

    // Verifica la lista recibida
    if (!animales || animales.length === 0) {
        container.innerHTML = '<p style="text-align: center; font-size: 1.2em;">No hay animales que coincidan con esta categoría.</p>';
        return;
    }

    // Renderiza solo los animales filtrados que recibió
    animales.forEach(animal => {
        const div = document.createElement('div');
        div.className = 'ficha'; 
        const precioFormateado = (animal.precio || 5000).toLocaleString('es-CL');
        
        div.innerHTML = `
            <img class="animal" src="${animal.img}" alt="${animal.nombre}"/>
            <h3>${animal.nombre}</h3>
            <hr/>
            <p>Especie: ${animal.especie}</p>
            <p>⚠️ En peligro: ${animal.peligro}</p>
            <p>${animal.rescate}</p>
            <p class="precio-ficha"><b>Apadrinamiento: $${precioFormateado} CLP</b></p> 
            <input type="button" value="Agregar" onclick="agregarAnimal(${animal.id})"/>
        `;
        container.appendChild(div);
    });
}

// Hacemos las funciones globales para que React pueda llamarlas
window.renderCatalogo = renderCatalogo;
window.agregarAnimal = agregarAnimal;