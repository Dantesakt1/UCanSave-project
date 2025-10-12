import '../css/estilo.css'

function Navbar() {
    return (

        <header>
            <nav className="navbar">
                <div className="contenedor-nav">

                    <div className="nav-logo" id="logo">
                        <img src="img/logo.png" alt="logo"/>
                            <h1>U Can Save</h1>
                    </div>

                   {/* nav links */}
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <a href="" className="nav-link">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a href="#escena" className="nav-link">Sobre nosotros</a>
                        </li>
                        <li className="nav-item">
                            <a href="carrito.html" className="nav-link">Carrito</a>
                        </li>
                        <li className="nav-item">
                            <a href="noticias.html" className="nav-link">Noticias</a>
                        </li>
                        <li className="nav-item">
                            <a href="formulario.html" className="nav-link">Formulario</a>
                        </li>
                    </ul>

                    {/* BOTON */}
                    <div className="nav-btn">
                        <a href="apadrinamiento.html" className="btn-apadrina">Apadrina</a>
                        <a href="login_register.html" className="btn-login_register">Login / Registro</a>
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Navbar