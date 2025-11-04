
import React, { useState, useEffect } from "react"; 
import '../css/apadrinamiento.css'; // Tu CSS de apadrinamiento
import '../css/estilo.css'; // Estilos generales (para botones, etc.)

const Apadrinamiento = () => {

    // --- AÑADIDO: Estado para el filtro y los animales ---
    const [filtroActivo, setFiltroActivo] = useState('todos');
    const [animales, setAnimales] = useState([]);

    // 1. useEffect para CARGAR DATOS y SCRIPTS (al montar)
    useEffect(() => {
        // Cargar datos de localStorage al estado de React
        const data = JSON.parse(localStorage.getItem("listaAnimales")) || [];
        setAnimales(data);
    

        // Cargar scripts externos (tu lógica)
        const scripts = [
            '/js/animal.js',
            '/js/productoAnimal.js',
            '/js/script.js'
        ];

        // Carga secuencial para asegurar que script.js se ejecute al final
        const loadScriptSequentially = async () => {
            for (const src of scripts) {
                if (document.querySelector(`script[src="${src}"]`)) {
                    continue; 
                }
                try {
                    await new Promise((resolve, reject) => {
                        const sc = document.createElement('script');
                        sc.src = src;
                        sc.defer = true; 
                        sc.onload = resolve;
                        sc.onerror = () => reject(new Error(`Fallo al cargar ${src}`));
                        document.body.appendChild(sc);
                    });
                } catch (error) {
                    console.error("Fallo la carga secuencial:", error);
                    break;
                }
            }
            
            // Cuando todos los scripts cargaron, llamar a renderCatalogo por primera vez
            if (typeof window.renderCatalogo === 'function') {
                const animalesCargados = JSON.parse(localStorage.getItem("listaAnimales")) || [];
                window.renderCatalogo(animalesCargados); // Renderizar 'todos' al inicio
            }
        };

        loadScriptSequentially();

        // Función de limpieza
        return () => {
            scripts.forEach(src => {
                const sc = document.querySelector(`script[src="${src}"]`);
                if (sc && sc.parentNode === document.body) {
                    document.body.removeChild(sc);
                }
            });
        };
    }, []); // Array vacío, se ejecuta solo una vez al montar

    // 2. useEffect para RE-RENDERIZAR al cambiar el filtro
    useEffect(() => {
        // Si renderCatalogo no existe (aún cargando), no hacer nada
        if (typeof window.renderCatalogo !== 'function') {
            return;
        }

        let animalesFiltrados = [];
        if (filtroActivo === 'todos') {
            animalesFiltrados = animales;
        } else {
            animalesFiltrados = animales.filter(animal => animal.categoria === filtroActivo);
        }
        
        // Llamar a la función global renderCatalogo con la lista filtrada
        window.renderCatalogo(animalesFiltrados);

    }, [filtroActivo, animales]); // Se ejecuta si 'filtroActivo' o 'animales' cambian

    return (
        <main>
            <section className="galeria">
                <h2>Apadrina algún animal !</h2>
                
                {/* --- AÑADIDO: Botones de Filtro --- */}
                <div className="filtros-categoria" style={{ textAlign: 'center', margin: '20px 0' }}>
                    {/* Usamos el estilo 'btn-apadrina' de tu CSS global */}
                    <button 
                        className={`btn-filtro ${filtroActivo === 'todos' ? 'activo' : ''}`}
                        onClick={() => setFiltroActivo('todos')}>
                        Todos
                    </button>
                    <button 
                        className={`btn-filtro ${filtroActivo === 'terrestre' ? 'activo' : ''}`}
                        onClick={() => setFiltroActivo('terrestre')}>
                        Terrestres
                    </button>
                    <button 
                        className={`btn-filtro ${filtroActivo === 'marino' ? 'activo' : ''}`}
                        onClick={() => setFiltroActivo('marino')}>
                        Marinos
                    </button>
                    <button 
                        className={`btn-filtro ${filtroActivo === 'aereo' ? 'activo' : ''}`}
                        onClick={() => setFiltroActivo('aereo')}>
                        Aéreos
                    </button>
                </div>
                {/* Estilos para los filtros (puedes moverlos a apadrinamiento.css) */}
                <style>{`
                    .btn-filtro {
                        background-color: #f0f0f0;
                        color: #333;
                        border: 1px solid #ddd;
                        padding: 10px 20px;
                        margin: 0 5px;
                        border-radius: 25px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        font-family: 'SFCompactRoundedBold', Arial, sans-serif;
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .btn-filtro:hover {
                        background-color: #ddd;
                    }
                    .btn-filtro.activo {
                        /* Estilo del botón activo (usa el color de .btn-apadrina) */
                        background-color: #44b699;
                        color: white;
                        border-color: #44b699;
                    }
                `}</style>

                {/* Contenedor donde script.js renderizará los animales */}
                {/* CORREGIDO: Usamos 'vista' (como en tu JSX original) y 'catalogo-animales' (ID) 
                    para asegurar que script.js lo encuentre */}
                <div id="catalogo-animales" className="vista"> 
                    <p>Cargando animales para apadrinar...</p> 
                    {/* El contenido se llenará con renderCatalogo */}
                </div>
            </section>

            <section className="carrito">
                Carrito: <label id="pie">0</label> <br/>
                Items: <span id="items">0</span> <br/>
                Total: $<span id="total">0</span>
            </section>
        </main>
    );
}
export default Apadrinamiento;

