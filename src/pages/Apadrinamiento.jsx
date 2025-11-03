import { useEffect } from "react";


import '../css/apadrinamiento.css'

const Apadrinamiento = () => {

    useEffect(() => {
        const scripts = [
            '/js/animal.js',
            '/js/productoAnimal.js',
            '/js/script.js'
        ]

        const scriptPromises = scripts.map(src => {
            return new Promise((resolve, reject) => {
                // Si el script ya está en la página, no lo cargues de nuevo.
                if (document.querySelector(`script[src="${src}"]`)) {
                    return resolve();
                }
                const sc = document.createElement('script');
                sc.src = src;
                sc.async = false; // Cargar en orden para evitar errores de dependencias
                sc.onload = resolve;
                sc.onerror = reject;
                document.body.appendChild(sc);
            });
        });

        Promise.all(scriptPromises).then(() => {
            // 1. Intenta cargar los animales desde localStorage
            const animalesGuardados = localStorage.getItem("listaAnimales");
            let animalesParaRenderizar;

            if (animalesGuardados && JSON.parse(animalesGuardados).length > 0) {
                // Si hay datos en localStorage y no está vacío, úsalos.
                animalesParaRenderizar = JSON.parse(animalesGuardados);
            } else {
                // Si no, usa la lista inicial del script productoAnimal.js (que ya se cargó)
                // y guárdala en localStorage para la próxima vez.
                animalesParaRenderizar = window.listaAnimalesInicial || [];
                localStorage.setItem('listaAnimales', JSON.stringify(animalesParaRenderizar));
            }

            // 2. Llama a la función global de tu script para que dibuje las fichas
            if (window.renderCatalogo) {
                window.renderCatalogo(animalesParaRenderizar);
            }
        }).catch(error => console.error("Error al cargar los scripts:", error));

    }, [])

    return (
        <main>
            <section className="galeria">
                <h2>Apadrina algún animal !</h2>
                <div className="vista" id="catalogo-animales"></div>
            </section>

            <section className="carrito">
                Carrito: <label id="pie">0</label>
                <br/>
                Items: <span id="items">0</span>
                <br/>
                Total: $<span id="total">0</span>
            </section>
        </main>
    )
}
export default Apadrinamiento;