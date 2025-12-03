import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/estilo.css'; // Asegúrate de haber pegado el CSS aquí
import { getApadrinamientosByUsuarioId } from '../api_rest';

function MisApadrinamientos() {
    const [historial, setHistorial] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

        if (!usuarioGuardado) {
            navigate('/login-registro');
            return;
        }

        const cargarHistorial = async () => {
            try {
                const datos = await getApadrinamientosByUsuarioId(usuarioGuardado.idUsuario);
                setHistorial(datos);
            } catch (error) {
                console.error("Error cargando historial:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarHistorial();
    }, [navigate]);

    return (
        <main>
            {/* Contenedor principal con margen superior para el Navbar */}
            <div className="contenedor-historial">
                <div className="encabezado-pagina" style={{textAlign: 'center', marginBottom: '30px'}}>
                    <h1 style={{color: '#333'}}>Mis Apadrinamientos</h1>
                    <p style={{color: '#666'}}>Historial de tus aportes a la fundación U Can Save.</p>
                </div>

                {cargando ? (
                    <div style={{textAlign: 'center', padding: '50px'}}>
                        <p>Cargando información...</p>
                    </div>
                ) : historial.length === 0 ? (
                    <div className="mensaje-vacio">
                        <h3>🕊️ Aún no has realizado apadrinamientos.</h3>
                        <p>¡Tu ayuda es vital para nosotros!</p>
                        <br />
                        <a href="/apadrinamiento" className="btn-apadrina">Ir a la Galería</a>
                    </div>
                ) : (
                    <div style={{overflowX: 'auto'}}> {/* Permite scroll horizontal en celular */}
                        <table className="tabla-bonita">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Animal Apadrinado</th>
                                    <th>Monto</th>
                                    <th>Estado</th>
                                    <th>ID Transacción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historial.map((item) => (
                                    <tr key={item.idApadrinamiento}>
                                        <td>
                                            {new Date(item.fechaApadrinamiento).toLocaleDateString()}
                                        </td>
                                        <td style={{fontWeight: 'bold', color: '#555'}}>
                                            {item.animal ? item.animal.nombreAnimal : 'Animal eliminado'}
                                        </td>
                                        <td>
                                            ${item.montoPagado.toLocaleString('es-CL')}
                                        </td>
                                        <td>
                                            <span className={`badge ${
                                                item.estadoApadrinamiento?.nombreEstado === 'Activo' 
                                                ? 'badge-activo' 
                                                : 'badge-inactivo'
                                            }`}>
                                                {item.estadoApadrinamiento ? item.estadoApadrinamiento.nombreEstado : 'Desconocido'}
                                            </span>
                                        </td>
                                        <td style={{fontSize: '0.85em', color: '#888'}}>
                                            {item.idTransaccionPago}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}

export default MisApadrinamientos;