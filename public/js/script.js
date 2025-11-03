// NO HAY LISTA DE ANIMALES AQUÍ. La fuente de datos es localStorage.

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

    // Creamos el producto para el carrito.
    // NOTA: No tienes un precio en tus datos, así que lo pongo en 5000 como antes.
    const animalCarro = {
        id: animalSeleccionado.id,
        nombre: animalSeleccionado.nombre,
        precio: 5000, // Precio fijo o agrégalo a tus datos
        cantidad: 1,
        total: 5000,
        imagen: animalSeleccionado.img
    };

    // --- Lógica del carrito (esta parte parece estar bien) ---
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

    document.getElementById("items").innerHTML = items;
    document.getElementById("total").innerHTML = total;
}

// Esta es la función clave. Ahora SÍ usa los datos que recibe.
function renderCatalogo(animales) {
    // Busca el contenedor correcto por su ID
    const container = document.getElementById('catalogo-animales');
    if (!container) {
        console.error('El contenedor con id "catalogo-animales" no fue encontrado.');
        return;
    }
    
    container.innerHTML = ''; // Limpia el contenido viejo

    if (!animales || animales.length === 0) {
        container.innerHTML = '<p>No hay animales disponibles para apadrinar en este momento.</p>';
        return;
    }

    animales.forEach(animal => {
        const div = document.createElement('div');
        div.className = 'ficha'; // La clase CSS para la tarjeta
        div.innerHTML = `
            <img class="animal" src="${animal.img}" alt="${animal.nombre}"/>
            <h3>${animal.nombre}</h3>
            <hr/>
            <p>Especie: ${animal.especie}</p>
            <p>⚠️ En peligro: ${animal.peligro}</p>
            <p>${animal.rescate}</p>
            <input type="button" value="Agregar" onclick="agregarAnimal(${animal.id})"/>
        `;
        container.appendChild(div);
    });
}

// Hacemos las funciones globales para que React pueda llamarlas
window.renderCatalogo = renderCatalogo;
window.agregarAnimal = agregarAnimal;