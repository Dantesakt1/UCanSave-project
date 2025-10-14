import { useEffect } from "react";

import '../css/estilo.css';

const Menu = () => {
    useEffect(() => {
        // Cargar jQuery
        if (!document.querySelector("script[src='https://code.jquery.com/jquery-1.11.0.min.js']")) {
            const jq = document.createElement("script");
            jq.src = "https://code.jquery.com/jquery-1.11.0.min.js";
            jq.async = false;
            document.body.appendChild(jq);
            console.log("jQuery cargado...");
            
            // Después de cargar jQuery, cargar los demás scripts
            jq.onload = () => {
                // Cargar jQuery Migrate
                const jqMigrate = document.createElement("script");
                jqMigrate.src = "https://code.jquery.com/jquery-migrate-1.2.1.min.js";
                jqMigrate.async = false;
                document.body.appendChild(jqMigrate);
                
                // Después de Migrate, cargar Slick
                jqMigrate.onload = () => {
                    const slick = document.createElement("script");
                    slick.src = "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
                    slick.async = false;
                    document.body.appendChild(slick);
                    
                    // Después de Slick, cargar script.js
                    slick.onload = () => {
                        if (!document.querySelector("script[src='/js/script.js']")) {
                            const sc = document.createElement("script");
                            sc.src = "/js/script.js";
                            sc.type = "module";
                            sc.async = true;
                            document.body.appendChild(sc);
                            console.log("script.js cargado...");
                            
                            // Inicializar Slick cuando todo esté listo
                            sc.onload = () => {
                                if (window.jQuery) {
                                    window.jQuery('.single-item').slick({
                                        dots: true,
                                        arrows: true,
                                        autoplay: true,
                                        autoplaySpeed: 3000
                                    });
                                }
                            };
                        }
                    };
                };
            };
        } else {
            console.log("Scripts ya cargados");
        }

        // Cargar CSS de Slick
        if (!document.querySelector("link[href*='slick.css']")) {
            const slickCss = document.createElement("link");
            slickCss.rel = "stylesheet";
            slickCss.href = "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css";
            document.head.appendChild(slickCss);
            
            const slickTheme = document.createElement("link");
            slickTheme.rel = "stylesheet";
            slickTheme.href = "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css";
            document.head.appendChild(slickTheme);
        }
        
    }, []);// Array vacío para que solo se ejecute una vez

    return (
        <main>
            {/* Carrusel de Slick */}
            <div className="single-item">
                <div><img src="img/imagen-menu.jpg" alt="Slide 1" /></div>
                <div><img src="img/imagen-menu2.jpg" alt="Slide 2" /></div>
                <div><img src="img/imagen-menu3.jpg" alt="Slide 3" /></div>
                <div><img src="img/imagen-menu4.jpg" alt="Slide 4" /></div>
                <div><img src="img/imagen-menu5.jpg" alt="Slide 5" /></div>
            </div>

            {/* Sección "Sobre Nosotros" */}
            <div id="escena">
                <div id="zona-izquierda">
                    <ul className="lista">
                        {/* Historia */}
                        <li className="item">
                            <input type="radio" id="radio_historia" name="carrusel_basico" defaultChecked />
                            <label htmlFor="radio_historia" className="etiqueta">Historia</label>
                            <div className="contenido">
                                <div className="icono">
                                    <img src="img/animal-1.png" alt="Historia" />
                                </div>
                                <h1>Sobre nosotros</h1>
                                <p>
                                    U Can Save comenzó como una simple idea entre dos ingenieros informáticos,
                                    que decidimos que nuestras habilidades podían tener un impacto más allá del mundo
                                    digital.
                                </p>
                            </div>
                        </li>

                        {/* Santuarios */}
                        <li className="item">
                            <input type="radio" id="radio_santuarios" name="carrusel_basico" />
                            <label htmlFor="radio_santuarios" className="etiqueta">Santuarios</label>
                            <div className="contenido">
                                <div className="icono">
                                    <img src="img/santuario.jpg" alt="Santuarios" />
                                </div>
                                <h1>Santuarios verificados</h1>
                                <p>
                                    Registramos y verificamos santuarios que muestran sus animales más vulnerables,
                                    dando visibilidad a quienes trabajan en primera línea por la conservación.
                                </p>
                            </div>
                        </li>

                        {/* Apadrinamiento */}
                        <li className="item">
                            <input type="radio" id="radio_apadrinamiento" name="carrusel_basico" />
                            <label htmlFor="radio_apadrinamiento" className="etiqueta">Apadrinamiento</label>
                            <div className="contenido">
                                <div className="icono">
                                    <img src="img/animal-2.jpg" alt="Apadrinamiento directo" />
                                </div>
                                <h1>Apadrinamiento directo</h1>
                                <p>
                                    Las personas pueden apadrinar un animal específico o hacer donaciones generales,
                                    estableciendo un vínculo personal con cada especie y apoyando directamente su cuidado.
                                </p>
                            </div>
                        </li>

                        {/* Alianzas */}
                        <li className="item">
                            <input type="radio" id="radio_alianzas" name="carrusel_basico" />
                            <label htmlFor="radio_alianzas" className="etiqueta">Alianzas</label>
                            <div className="contenido">
                                <div className="icono">
                                    <img src="img/alianzas.jpg" alt="Alianzas estrategicas" />
                                </div>
                                <h1>Alianzas estratégicas</h1>
                                <p>
                                    Trabajamos con fundaciones establecidas optimizando sus sistemas de ayuda,
                                    creando redes colaborativas que maximizan el impacto de cada recurso donado.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="borde-medio"></div>
                <div id="zona-derecha"></div>
            </div>
        </main>
    );
}

export default Menu;