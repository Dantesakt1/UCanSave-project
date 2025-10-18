var animales = [
    new Animal(1, "Minga", 5000, "img/Lama guanicoe.jpeg", "Lama guanicoe", "Ungulado andino clave en los ecosistemas de altura."),
    new Animal(2, "Rumi", 5000, "img/Athene.jpg", "Athene cunicularia", "Búho terrestre que habita en madrigueras y es activo de día."),
    new Animal(3, "Lycan", 5000, "img/Lycalopex.jpg", "Lycalopex griseus", "Cánido pequeño que ayuda a controlar plagas de roedores."),
    new Animal(4, "Huilo", 5000, "img/Puma concolor.jpg", "Puma concolor", "Gran felino sudamericano, depredador tope en la cadena trófica."),
    new Animal(5, "Terra", 5000, "img/Parabuteo.jpg", "Parabuteo unicinctus", "Ave rapaz social, poco común entre halcones, suele cazar en grupo."),
    new Animal(6, "Luna", 5000, "img/Phocoena.jpeg", "Phocoena sinus", "La marsopa más pequeña del mundo, endémica del golfo de California."),
    new Animal(7, "Nieve", 5000, "img/Beluga.jpg", "Delphinapterus leucas", "Cetáceo blanco del Ártico, muy social y comunicativo."),
    new Animal(8, "Spike", 5000, "img/Narval.jpg", "Monodon monoceros", "Ballena dentada famosa por su largo colmillo en espiral."),
    new Animal(9, "Chilly", 5000, "img/Pingüino de Humboldt.webp", "Spheniscus humboldti", "Pingüino costero del norte de Chile y Perú.")
];

localStorage.setItem("animales", JSON.stringify(animales));

function agregarAnimal(id) {
    console.log("Selecciono:" + id);
    const data = JSON.parse(localStorage.getItem("animales"));

    console.log(data[id - 1]);
    console.log(data[id - 1]["nombre"]);

    // Crear nuevo producto para el carrito
    var animalCarro = new ProductoAnimal()
    animalCarro.id = data[id - 1]["id"]
    animalCarro.nombre = data[id - 1]["nombre"]
    animalCarro.precio = data[id - 1]["precio"]
    animalCarro.cantidad = 1
    animalCarro.total = data[id - 1]["precio"]
    animalCarro.imagen = data[id - 1]["imagen"]

    let nombre_animal = data[id - 1]["nombre"];

    // contador arriba del carrito
    var valor = parseInt(document.getElementById("pie").innerHTML);
    valor = valor + 1;
    document.getElementById("pie").innerHTML = valor;

    let items = 0;
    let total = 0;

    var carrito = JSON.parse(localStorage.getItem("carrito"));

    if (!carrito) {
        console.log("no existe");
        carrito = [animalCarro];
        items = 1;
        total = animalCarro.precio;
        localStorage.setItem("carrito", JSON.stringify(carrito))
        console.log("Apadrinamiento agregado")
    } else {
        let existe = false;
        carrito.forEach((item, idx) => {
            if (item.id == animalCarro.id) {
                carrito[idx].cantidad += 1;
                carrito[idx].total = carrito[idx].precio * carrito[idx].cantidad;
                existe = true;
            }
        });

        if (!existe) {
            carrito.push(animalCarro)
        }

        carrito.forEach(i => {
            total += i.total;
        })
        items = carrito.length
        localStorage.setItem("carrito", JSON.stringify(carrito))
        console.log("Apadrinamiento agregado")
    }

    document.getElementById("items").innerHTML = items;
    document.getElementById("total").innerHTML = total;
}

function renderCatalogo(){
    const animales = JSON.parse(localStorage.getItem("animales")) || [];
    const container = document.querySelector('.contenedor');
    if (!container) return;
    
    container.innerHTML = '';
    animales.forEach(animal => {
        const div = document.createElement('div');
        div.className = 'ficha';
        div.innerHTML = `
            <img class="animal" src="${animal.imagen}" alt="${animal.especie}" width="200" height="150"/>
            <h3>${animal.nombre}</h3>
            <hr/>
            <p>Especie: ${animal.especie} <br/> <br/> ${animal.descripcion}</p>
            <p>⚠️ En peligro: ${animal.peligro || 'Información no disponible'}</p>
            <p>${animal.historia || ''}</p>
            <input type="button" value="Agregar" onclick="agregarAnimal(${animal.id})"/>
        `;
        container.appendChild(div);
    });
}