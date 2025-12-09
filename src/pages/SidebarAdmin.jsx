import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/menu_adm.css'; 

function SidebarAdmin() {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Cerrando sesión...");
        navigate('/'); 
    };

    return (
        <header> 
            <nav className="sidebar"> 
                <br />
                <br /> 
                <h2></h2>
                <ul>
                    <li><Link to="/menu-admin">Inicio</Link></li>
                    <li><Link to="/admin-animales">Animales</Link></li>
                    <li><Link to="/admin-usuarios">Usuarios</Link></li>
                </ul>
                <hr />
                <ul>
                    <li>
                        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default SidebarAdmin;
