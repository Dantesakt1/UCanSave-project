import React from 'react';
import SidebarAdmin from './SidebarAdmin'; 
import '../css/menu_adm.css'; 

function MenuAdmin() {
    return (
        <div> 
            <SidebarAdmin /> {/* Renderiza la barra lateral */}

            <main className="contenido"> 
                <div className="botones-menu"> 
                    <br />
                    <br />
                    <br />
                    <h1>¡Hola Administrador!</h1>
                    <p>¿Qué deseas hacer hoy?</p>
                    <img 
                        src="/img/graficosdeexcel42.webp"
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