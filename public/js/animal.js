export class Animal {
    id;
    nombre;
    precio;
    imagen;
    especie;
    descripcion;

    constructor(id, nombre, precio, imagen, especie, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.especie = especie;
        this.descripcion = descripcion;
    }
}