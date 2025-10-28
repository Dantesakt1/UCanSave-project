import React from 'react';
// Importa SidebarAdmin desde la misma carpeta 'pages'
import SidebarAdmin from './SidebarAdmin'; 
// Importa el CSS aquí o asegúrate que esté en App.jsx
import '../css/menu_adm.css'; 

function MenuAdmin() {
    return (
        // Contenedor principal para el layout
        <div> 
            <SidebarAdmin /> {/* Renderiza la barra lateral fija */}

            {/* Contenido principal usa la clase 'contenido' de tu CSS */}
            {/* El margin-left: 250px se aplicará automáticamente desde menu_adm.css */}
            <main className="contenido"> 
                {/* Contenido específico de esta página */}
                <div className="botones-menu"> 
                    <br />
                    <br />
                    <br />
                    <h1>¡Hola Administrador!</h1>
                    <p>¿Qué deseas hacer hoy?</p>
                    {/* [Imagen de gráfico simple de estadísticas] */}
                    <img 
                        src="/img/graficosdeexcel42.webp" // Asegúrate que esta imagen esté en public/img
                        alt="Gráfico de estadísticas simple" 
                        width="600" 
                        height="400" 
                        style={{ maxWidth: '100%', height: 'auto', marginTop: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}/>
                </div>
            </main>
        </div>
    );
}

export default MenuAdmin;