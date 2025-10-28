import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importa el CSS específico. Si está en src/css:
import '../css/menu_adm.css'; 

function SidebarAdmin() {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Cerrando sesión...");
        navigate('/'); // Redirige al menú principal
    };

    return (
        <header> 
            <nav className="sidebar"> 
                <br />
                <br /> 
                {/* Asume que la imagen está en public/img */}
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

// Recuerda añadir la clase .logout-button a tu menu_adm.css

export default SidebarAdmin;
