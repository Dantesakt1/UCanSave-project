export class ProductoAnimal {
    id;
    nombre;
    precio;
    cantidad;
    total;
    imagen;


    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 1;
        this.total = precio;
        this.imagen = imagen;
    }
}
