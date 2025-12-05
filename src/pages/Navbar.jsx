import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../css/estilo.css';

function Navbar() {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    // 1. Al cargar el Navbar, buscamos si hay usuario en localStorage
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    // 2. Función para Cerrar Sesión
    const handleLogout = () => {
        localStorage.removeItem("usuario"); 
        setUsuario(null); 
        navigate('/login-registro'); 
        window.location.reload(); 
    };

    return (
        <header>
            <nav className="navbar">
                <div className="contenedor-nav">

                    <div className="nav-logo" id="logo">
                        <img src="img/logo.png" alt="logo" />
                        <h1>U Can Save</h1>
                    </div>

                    {/* nav links */}
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <a href="/" className="nav-link">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a href="#escena" className="nav-link">Sobre nosotros</a>
                        </li>
                        <li className="nav-item">
                            <a href="/carrito" className="nav-link">Carrito</a>
                        </li>
                        <li className="nav-item">
                            <a href="/noticias" className="nav-link">Noticias</a>
                        </li>
                        <li className="nav-item">
                            <a href="/formulario" className="nav-link">Formulario</a>
                        </li>

                        {usuario && (
                            <li className="nav-item">
                                <a href="/mis-apadrinamientos" className="nav-link" style={{ color: '#2c7a7b', fontWeight: 'bold' }}>
                                    Mis Apadrinamientos
                                </a>
                            </li>
                        )}

                        {/* 3. MENU ADMIN: Solo se muestra si el rol es ADMIN */}
                        {usuario && usuario.rol === "ADMIN" && (
                            <li className="nav-item">
                                <a href="/menu-admin" className="nav-link" style={{ color: '#e63946', fontWeight: 'bold' }}>Admin</a>
                            </li>
                        )}
                    </ul>

                    {/* BOTONES */}
                    <div className="nav-btn">
                        <a href="/apadrinamiento" className="btn-apadrina">Apadrina</a>

                        {usuario ? (
                            // Mostramos saludo y botón salir
                            <div className="usuario-info">
                                <span className="saludo">Hola, {usuario.nombre}</span>
                                <button onClick={handleLogout} className="btn-logout">
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            // Mostramos Login
                            <a href="/login-registro" className="btn-login_register">Login / Registro</a>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;