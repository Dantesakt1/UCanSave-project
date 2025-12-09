import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/estilo.css';
import { saveDireccion, saveMetodoPago, saveApadrinamiento, getComunas } from '../api_rest';

function Checkout() {
    const navigate = useNavigate();

    // --- ESTADOS ---
    const [usuario, setUsuario] = useState(null);
    const [carrito, setCarrito] = useState([]);

    // Inputs Dirección
    const [calle, setCalle] = useState("");
    const [depto, setDepto] = useState("");
    const [comunaId, setComunaId] = useState(1);
    const [listaComunas, setListaComunas] = useState([]);

    // Inputs Tarjeta
    const [numTarjeta, setNumTarjeta] = useState("");
    const [tipoTarjeta, setTipoTarjeta] = useState("Visa");
    const [mesExp, setMesExp] = useState("");
    const [anoExp, setAnoExp] = useState("");
    const [cvv, setCvv] = useState("");

    const [respuesta, setRespuesta] = useState("");
    const [procesando, setProcesando] = useState(false);

    // Cargar datos
    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem("usuario"));
        const cartStorage = JSON.parse(localStorage.getItem("carrito")) || [];

        if (!userStorage) {
            navigate('/login-registro');
            return;
        }
        if (cartStorage.length === 0) {
            navigate('/apadrinamiento');
            return;
        }
        setUsuario(userStorage);
        setCarrito(cartStorage);

        const cargarComunas = async () => {
            try {
                const data = await getComunas();
                setListaComunas(data);
            } catch (error) {
                console.error("Error cargando comunas");
            }
        };
        cargarComunas();
    }, []);

    const calcularTotal = () => {
        return carrito.reduce((acc, item) => acc + (parseFloat(item.precio) * (item.cantidad || 1)), 0);
    };

    // --- LÓGICA DE PAGO ---
    const procesarPago = async (e) => {
        e.preventDefault();
        setRespuesta("");

        const errores = [];
        if (!calle.trim()) errores.push("La calle es obligatoria.");
        if (numTarjeta.length < 16) errores.push("Tarjeta inválida.");
        if (!mesExp || !anoExp || !cvv) errores.push("Faltan datos de la tarjeta.");

        if (errores.length > 0) {
            setRespuesta(errores.join(" "));
            return;
        }

        setProcesando(true);

        try {
            // 1. Guardar Dirección
            const direccionDTO = {
                calleNumero: calle,
                deptoCasa: depto,
                esDireccionFacturacion: true,
                usuario: { idUsuario: usuario.idUsuario },
                comuna: { idComuna: parseInt(comunaId) }
            };
            const dirGuardada = await saveDireccion(direccionDTO);

            // 2. Guardar Tarjeta
            const tarjetaDTO = {
                tokenGateway: "tok_" + Math.random().toString(36).substr(2),
                tipoTarjeta: tipoTarjeta,
                ultimosCuatroDigitos: numTarjeta.slice(-4),
                expiracionMes: parseInt(mesExp),
                expiracionAno: parseInt(anoExp),
                usuario: { idUsuario: usuario.idUsuario }
            };
            const metodoGuardado = await saveMetodoPago(tarjetaDTO);

            // 3. Guardar Apadrinamientos
            for (const item of carrito) {
                const cantidad = item.cantidad || 1;
                for (let i = 0; i < cantidad; i++) {
                    const apadrinamientoDTO = {
                        montoPagado: item.precio,
                        fechaApadrinamiento: new Date().toISOString(),
                        idTransaccionPago: "tr_" + Date.now(),
                        usuario: { idUsuario: usuario.idUsuario },
                        animal: { idAnimal: item.idAnimal },
                        metodoPago: { idMetodoPago: metodoGuardado.idMetodoPago },
                        direccionFacturacion: { idDireccion: dirGuardada.idDireccion },
                        estadoApadrinamiento: { idEstadoApadrinamiento: 1 }
                    };
                    await saveApadrinamiento(apadrinamientoDTO);
                }
            }

            localStorage.removeItem("carrito");
            navigate("/pago-exitoso");

        } catch (error) {
            console.error(error);
            setRespuesta("Error al procesar el pago. Intenta nuevamente.");
            setProcesando(false);
        }
    };

    return (
        <main className="checkout-main">
            <div className="checkout-container">

                {/* --- LADO IZQUIERDO: FORMULARIO --- */}
                <div className="checkout-form-col">
                    <h2 className="checkout-title">Datos de Facturación</h2>

                    <form onSubmit={procesarPago}>
                        {/* Sección Dirección */}
                        <h4 className="checkout-label">Dirección</h4>
                        <div className="checkout-row">
                            <input
                                type="text" placeholder="Calle y Número"
                                className="checkout-input" style={{ flex: 2 }}
                                value={calle} onChange={(e) => setCalle(e.target.value)}
                            />
                            <input
                                type="text" placeholder="Depto (Opcional)"
                                className="checkout-input" style={{ flex: 1 }}
                                value={depto} onChange={(e) => setDepto(e.target.value)}
                            />
                            <select
                                className="checkout-input"
                                style={{ flex: 1 }}
                                value={comunaId}
                                onChange={(e) => setComunaId(e.target.value)}
                            >
                                {listaComunas.map((comuna) => (
                                    <option key={comuna.idComuna} value={comuna.idComuna}>
                                        {comuna.nombreComuna}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sección Tarjeta */}
                        <h4 className="checkout-label" style={{ marginTop: '20px' }}>Método de Pago</h4>

                        <input
                            type="text" placeholder="Número de Tarjeta (16 dígitos)"
                            className="checkout-input full-width"
                            maxLength="16"
                            value={numTarjeta} onChange={(e) => setNumTarjeta(e.target.value)}
                        />

                        <div className="checkout-row">
                            <select
                                className="checkout-input" style={{ flex: 2 }}
                                value={tipoTarjeta} onChange={(e) => setTipoTarjeta(e.target.value)}
                            >
                                <option value="Visa">Visa</option>
                                <option value="Mastercard">Mastercard</option>
                            </select>

                            <input
                                type="number" placeholder="MM"
                                className="checkout-input" style={{ flex: 1 }}
                                value={mesExp} onChange={(e) => setMesExp(e.target.value)}
                            />
                            <input
                                type="number" placeholder="AAAA"
                                className="checkout-input" style={{ flex: 1 }}
                                value={anoExp} onChange={(e) => setAnoExp(e.target.value)}
                            />
                            <input
                                type="text" placeholder="CVV" maxLength="3"
                                className="checkout-input" style={{ flex: 1 }}
                                value={cvv} onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>

                        {respuesta && <div className="error-message">{respuesta}</div>}

                        <button type="submit" className="btn-pagar" disabled={procesando}>
                            {procesando ? "Procesando..." : `Pagar $${calcularTotal().toLocaleString('es-CL')}`}
                        </button>
                    </form>
                </div>

                {/* --- LADO DERECHO: RESUMEN --- */}
                <div className="checkout-summary-col">
                    <h3 className="checkout-summary-title">Resumen</h3>
                    <div>
                        {carrito.map((item, idx) => (
                            <div key={idx} className="checkout-item">
                                <span>{item.cantidad} x {item.nombre}</span>
                                <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                            </div>
                        ))}
                    </div>
                    <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #ddd' }} />
                    <div className="checkout-total-row">
                        <span>Total</span>
                        <span>${calcularTotal().toLocaleString('es-CL')}</span>
                    </div>
                </div>

            </div>
        </main>
    );
}

export default Checkout;