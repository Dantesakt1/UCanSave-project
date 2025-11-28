import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import '../css/carrito.css';

const Carrito = () => {
    // 1. ESTADO: El carrito empieza como un array vacío
    const [carrito, setCarrito] = useState([]);
    const navigate = useNavigate();

    // 2. CARGAR: Al iniciar, leemos el localStorage
    useEffect(() => {
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoGuardado);
    }, []);

    // --- FUNCIONES DE CONTROL (Lógica simple) ---

    // Función auxiliar para guardar en Estado y LocalStorage a la vez
    const guardarEstado = (nuevoCarrito) => {
        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    };

    const aumentarCantidad = (index) => {
        // Copiamos el carrito para no editar el estado directamente
        const nuevoCarrito = [...carrito];
        const item = nuevoCarrito[index];

        item.cantidad = (item.cantidad || 1) + 1;
        // Actualizamos el subtotal de ese item (Precio * Cantidad)
        item.total = item.precio * item.cantidad;

        guardarEstado(nuevoCarrito);
    };

    const disminuirCantidad = (index) => {
        const nuevoCarrito = [...carrito];
        const item = nuevoCarrito[index];

        if (item.cantidad > 1) {
            item.cantidad -= 1;
            item.total = item.precio * item.cantidad;
            guardarEstado(nuevoCarrito);
        } else {
            // Si la cantidad es 1 y resta, preguntamos si quiere borrarlo
            eliminarDelCarrito(index);
        }
    };

    const eliminarDelCarrito = (index) => {
        if (window.confirm("¿Estás seguro de eliminar este animal?")) {
            const nuevoCarrito = [...carrito];
            // Borramos 1 elemento en la posición 'index'
            nuevoCarrito.splice(index, 1);
            guardarEstado(nuevoCarrito);
        }
    };

    const calcularTotalGeneral = () => {
        let total = 0;
        // Bucle for clásico para sumar
        for (let i = 0; i < carrito.length; i++) {
            total += (parseFloat(carrito[i].precio) * (carrito[i].cantidad || 1));
        }
        return total;
    };

    const procesarCompra = () => {
        // 1. Validar si el carrito está vacío
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        // 2. Validar si hay usuario logueado
        const usuario = localStorage.getItem("usuario");
        if (!usuario) {
            alert("Para apadrinar, necesitas iniciar sesión o registrarte.");
            navigate("/login-registro"); // Te manda al login
            return;
        }

        // 3. Si todo ok, vamos al Checkout
        navigate("/checkout");
    };

    return (
        <main>
            <section>
                <h1>Carrito de compras</h1>
                <hr/>
                
                {/* Contenedor de la tabla (usamos el ID 'detalle' para que tu CSS funcione igual) */}
                <div id="detalle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    {carrito.length === 0 ? (
                        <div style={{textAlign: 'center', padding: '40px'}}>
                            <p>El carrito está vacío.</p>
                            <a href="/apadrinamiento" className="btn-comprar" style={{marginTop: '20px', display:'inline-block', width: 'auto'}}>
                                Volver a la galería
                            </a>
                        </div>
                    ) : (
                        <>
                            {/* TABLA DE PRODUCTOS */}
                            <table>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Total</th>
                                        <th>Imagen</th>
                                        <th>Operaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Renderizamos cada fila con .map */}
                                    {carrito.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.idAnimal}</td>
                                            <td>{item.nombre}</td>
                                            <td>${parseInt(item.precio).toLocaleString('es-CL')}</td>
                                            <td>
                                                <button className="btn-cantidad" onClick={() => disminuirCantidad(index)}>-</button>
                                                <span style={{margin: '0 10px'}}>{item.cantidad || 1}</span>
                                                <button className="btn-cantidad" onClick={() => aumentarCantidad(index)}>+</button>
                                            </td>
                                            {/* Calculamos el total de la fila al vuelo */}
                                            <td>${(parseInt(item.precio) * (item.cantidad || 1)).toLocaleString('es-CL')}</td>
                                            <td>
                                                <img src={item.imagen || "/img/sin-imagen.jpg"} alt={item.nombre} />
                                            </td>
                                            <td>
                                                <button className="btn-eliminar" onClick={() => eliminarDelCarrito(index)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* TOTAL Y BOTÓN PAGAR */}
                            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                                <h2 style={{color: '#2c7a7b'}}>
                                    Total a Pagar: ${calcularTotalGeneral().toLocaleString('es-CL')}
                                </h2>
                                <br />
                                <button className="btn-comprar" onClick={procesarCompra}>
                                    Comprar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Carrito;