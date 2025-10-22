
import { Link } from 'react-router-dom'; // Importar Link para la navegación
import '../css/estilo.css'; // Importa tus estilos base

function Noticias() {
    return (
        <main>
            {/* Contenedor para aplicar padding y compensación del Navbar */}
            <div className="encabezado-pagina">
                <h1>Conservación en Chile: Noticias Destacadas</h1>
                <p>Descubre los avances en la protección de la fauna nativa chilena con el apoyo de U Can Save.</p>
            </div>

            <section className="contenedor-noticias">

                {/* NOTICIA 1: Zorro Chilote */}
                <article className="tarjeta-noticia">
                    <img src="img/zorrochilote.jpg" 
                         alt="Zorro Chilote en Bosque Nativo" 
                         className="noticia-imagen" 
                         onError={(e) => { e.target.onerror = null; e.target.src="img/zorrochilote.jpg" }}/>
                    
                    <div className="noticia-contenido">
                        <div>
                            <h2>Nuevo Monitoreo Salva a Familia de Zorros Chilotes</h2>
                            <p>Una reciente inversión en cámaras trampa en la Isla de Chiloé, financiada por U Can Save, permitió detectar a tiempo una amenaza a una familia de zorros de Darwin...</p>
                            <p className="noticia-meta">Publicado el 21 de Octubre, 2025 | Categoría: Fauna Endémica</p>
                        </div>
                        {/* USAR LINK para navegar a la ruta '/noticias/1' */}
                        <Link to="/noticia/1" className="btn-apadrina" style={{ width: '150px', textAlign: 'center' }}>Leer Más</Link>
                    </div>
                </article>

                {/* NOTICIA 2: Santuario Marino de Huinay */}
                <article className="tarjeta-noticia">
                    <img src="img/huinay-16_735-400.jpg" 
                         alt="Santuario Marino Huinay" 
                         className="noticia-imagen" 
                         onError={(e) => { e.target.onerror = null; e.target.src=".img/huinay-16_735-400.jpg"  }}/>
                    
                    <div className="noticia-contenido">
                        <div>
                            <h2>Protegiendo la Patagonia: Extensión en el Santuario de Huinay</h2>
                            <p>La colaboración con santuarios en la Región de Los Lagos ha permitido a U Can Save expandir la zona de amortiguación en Huinay. Esta extensión busca proteger las áreas de alimentación del Delfín Chileno...</p>
                            <p className="noticia-meta">Publicado el 1 de Octubre, 2025 | Categoría: Conservación Marina Chilena</p>
                        </div>
                        {/* USAR LINK para navegar a la ruta '/noticias/2' */}
                        <Link to="/noticia/2" className="btn-apadrina" style={{ width: '150px', textAlign: 'center' }}>Leer Más</Link>
                    </div>
                </article>

            </section>
        </main>
    );
}

export default Noticias;