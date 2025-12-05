import React, { useState, useEffect } from "react"; 
import '../css/apadrinamiento.css'; 
import '../css/estilo.css'; 
import { getAnimales } from "../api_rest"; 

const Apadrinamiento = () => {

    const [animales, setAnimales] = useState([]); 
    const [filtroActivo, setFiltroActivo] = useState('todos'); 
    const [carrito, setCarrito] = useState([]); 

    // --- CARGAR DATOS ---
    useEffect(() => {
        const cargarAnimales = async () => {
            try {
                const datos = await getAnimales();
                setAnimales(datos);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        cargarAnimales();

        const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoGuardado);
    }, []);

    // --- AGREGAR AL CARRITO ---
    const agregarAlCarrito = (animal) => {
        let nuevoCarrito = [...carrito];
        const index = nuevoCarrito.findIndex(item => item.idAnimal === animal.idAnimal);

        if (index !== -1) {
            // si ya existe, aumentamos cantidad
            nuevoCarrito[index].cantidad = (nuevoCarrito[index].cantidad || 1) + 1;
        } else {
            // si es nuevo, lo agregamos adaptando los nombres para que coincidan con tu carrito viejo
            nuevoCarrito.push({
                idAnimal: animal.idAnimal,
                nombre: animal.nombreAnimal,
                precio: animal.costoApadrinamiento,
                imagen: animal.urlImagen,
                cantidad: 1
            });
        }
        
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
        alert(`¡${animal.nombreAnimal} agregado!`);
    };

    // --- CÁLCULOS ---
    const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
    const totalPrecio = carrito.reduce((acc, item) => acc + (parseFloat(item.precio) * (item.cantidad || 1)), 0);

    // --- FILTRADO ---
    const animalesFiltrados = animales.filter(animal => {
        if (filtroActivo === 'todos') return true;
        const categoriaNombre = animal.especie?.categoria?.nombreCategoria || ""; 
        return categoriaNombre.toLowerCase().includes(filtroActivo.toLowerCase());
    });

    return (
        <main>
            <section className="galeria">
                <h2>Apadrina algún animal !</h2>
                
                <div className="filtros-categoria" style={{ textAlign: 'center', margin: '20px 0' }}>
                    {['todos', 'terrestre', 'marino', 'aereo'].map(filtro => (
                        <button key={filtro} className={`btn-filtro ${filtroActivo === filtro ? 'activo' : ''}`}
                            onClick={() => setFiltroActivo(filtro)}>
                            {filtro.charAt(0).toUpperCase() + filtro.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="contenedor-animales"> 
                    {animalesFiltrados.length > 0 ? (
                        animalesFiltrados.map((animal) => (
                            <div className="ficha" key={animal.idAnimal}>
                                
                                <img 
                                    className="animal" 
                                    src={animal.urlImagen || "/img/sin-imagen.jpg"} 
                                    alt={animal.nombreAnimal}
                                />
                                
                                <h3>{animal.nombreAnimal}</h3>
                                <hr/>
                                
                                <p>Especie: {animal.especie ? animal.especie.nombreCientifico : "Desconocida"}</p>
                                
                                <p>⚠️ En peligro: {animal.especie ? animal.especie.amenazasPrincipales : "Sin datos"}</p>
                                
                                <p style={{minHeight: '40px'}}>{animal.historiaRescate}</p>
                                
                                <p className="precio-ficha">
                                    <b>Apadrinamiento: ${parseInt(animal.costoApadrinamiento).toLocaleString('es-CL')} CLP</b>
                                </p> 
                                
                                <input 
                                    type="button" 
                                    value="Agregar" 
                                    onClick={() => agregarAlCarrito(animal)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No hay animales en esta categoría.</p>
                    )}
                </div>
            </section>

            <section className="carrito">
                <h3>Resumen</h3>
                Items: <label id="items">{totalItems}</label> Total: <span id="total" style={{fontWeight:'bold'}}>${totalPrecio.toLocaleString('es-CL')}</span>
                {totalItems > 0 && <div style={{marginTop:'10px'}}><a href="/carrito" className="btn-apadrina">Pagar</a></div>}
            </section>
        </main>
    );
}

export default Apadrinamiento;