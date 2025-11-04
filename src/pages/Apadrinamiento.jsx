import React, { useState, useEffect } from "react"; 
import '../css/apadrinamiento.css'; // Tu CSS de apadrinamiento
import '../css/estilo.css'; // Estilos generales (para botones, etc.)

const Apadrinamiento = () => {

    const [filtroActivo, setFiltroActivo] = useState('todos');
    const [animales, setAnimales] = useState([]);

    // 1. useEffect para CARGAR DATOS y SCRIPTS (al montar)
    useEffect(() => {
        // --- LÍNEAS ELIMINADAS ---
        // const data = JSON.parse(localStorage.getItem("listaAnimales")) || [];
        // setAnimales(data); 
        // (Las movimos abajo para que se ejecuten DESPUÉS de cargar los scripts)

        const scripts = [
            '/js/animal.js',
            '/js/productoAnimal.js',
            '/js/script.js'
        ];

        // Carga secuencial (para asegurar que productoAnimal.js cargue antes que script.js)
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
            
            // --- LÓGICA DE CARGA DE DATOS (CORREGIDA) ---
            // Esto se ejecuta DESPUÉS de que 'productoAnimal.js' (que define window.listaAnimalesInicial)
            // y 'script.js' (que define renderCatalogo) han cargado.
            
            if (typeof window.renderCatalogo === 'function') {
                
                let animalesParaCargar = [];
                const animalesGuardados = localStorage.getItem("listaAnimales");

                if (animalesGuardados && JSON.parse(animalesGuardados).length > 0) {
                    // 1. Usar datos de localStorage si existen
                    console.log("Apadrinamiento: Cargando desde localStorage.");
                    animalesParaCargar = JSON.parse(animalesGuardados);
                } 
                else if (window.listaAnimalesInicial) {
                    // 2. Si no, usar los datos iniciales del script (productoAnimal.js) y guardarlos
                    console.log("Apadrinamiento: localStorage vacío, usando listaAnimalesInicial y guardando.");
                    animalesParaCargar = window.listaAnimalesInicial;
                    localStorage.setItem("listaAnimales", JSON.stringify(animalesParaCargar));
                }
                
                // 3. Actualizar el estado de React (esto disparará el 2do useEffect)
                setAnimales(animalesParaCargar); 
                
                // (Opcional: llamar a renderCatalogo aquí también, aunque el 2do useEffect lo hará)
                // window.renderCatalogo(animalesParaCargar); // (La llamada inicial)
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
        if (typeof window.renderCatalogo !== 'function') {
            return; // Espera a que script.js cargue
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
                
                {/* --- Botones de Filtro --- */}
                <div className="filtros-categoria" style={{ textAlign: 'center', margin: '20px 0' }}>
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
                {/* Estilos (los moví a 'apadrinamiento.css' en mi mente, pero los dejo aquí por si acaso) */}
                <style>{`
                    .btn-filtro {
                        background-color: #f0f0f0; color: #333; border: 1px solid #ddd;
                        padding: 10px 20px; margin: 0 5px; border-radius: 25px;
                        cursor: pointer; transition: all 0.3s ease;
                        font-family: 'SFCompactRoundedBold', Arial, sans-serif;
                        font-size: 14px; font-weight: bold;
                    }
                    .btn-filtro:hover { background-color: #ddd; }
                    .btn-filtro.activo {
                        background-color: #44b699; color: white; border-color: #44b699;
                    }
                `}</style>

                {/* Contenedor donde script.js renderizará los animales */}
                <div id="catalogo-animales" className="vista"> 
                    <p>Cargando animales para apadrinar...</p> 
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

