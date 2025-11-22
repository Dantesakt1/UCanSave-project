import React, { useState } from 'react';
// CORRECCIÓN: Importar useNavigate y Link que eran necesarios
import { useNavigate, Link } from 'react-router-dom';

// CORRECCIÓN: Solo una definición de la función
function Checkout() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        correo: '',
        calle: '',
        region: 'Metropolitana de Santiago',
        comuna: 'Cerrillos',
        numeroTarjeta: '',
        expiracion: '',
        cvc: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmitPago = (e) => {
        e.preventDefault();

        // Lógica de simulación de pago
        console.log("Procesando pago con CVC:", formData.cvc);

        if (formData.cvc === '666') {
            // Pago Fallido
            console.log("Pago Rechazado.");
            navigate('/pago-fallido');
        } else if (formData.cvc.length === 3) {
            // Pago Exitoso
            console.log("Pago Aprobado.");

            localStorage.removeItem("carrito");

            // Actualizar contadores del carrito (si existen en el layout)
            const pieLabel = document.getElementById("pie");
            const itemsSpan = document.getElementById("items");
            const totalSpan = document.getElementById("total");

            if (pieLabel) pieLabel.innerHTML = "0";
            if (itemsSpan) itemsSpan.innerHTML = "0";
            if (totalSpan) totalSpan.innerHTML = "0";

            navigate('/pago-exitoso');
        } else {
            alert("El CVC debe tener 3 dígitos.");
        }
    };

    return (
        <main>
            <div className="checkout-container">
                <h1>Finalizar Apadrinamiento (Checkout)</h1>
                <p>Completa tus datos para finalizar el pago. Estás apadrinando la conservación.</p>

                <form className="checkout-form" onSubmit={handleSubmitPago}>

                    <h2>Información del Cliente</h2>

                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellidos">Apellidos</label>
                        <input type="text" id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="correo">Correo Electrónico</label>
                        <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required />
                    </div>

                    <h2>Dirección de Entrega (para tu certificado)</h2>

                    <div className="form-group full-width">
                        <label htmlFor="calle">Calle y Número</label>
                        <input type="text" id="calle" name="calle" value={formData.calle} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="region">Región</label>
                        <select id="region" name="region" value={formData.region} onChange={handleChange}>
                            <option value="Metropolitana de Santiago">Metropolitana de Santiago</option>
                            <option value="Valparaíso">Valparaíso</option>
                            <option value="Biobío">Biobío</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comuna">Comuna</label>
                        <input type="text" id="comuna" name="comuna" value={formData.comuna} onChange={handleChange} required />
                    </div>

                    <h2>Datos de Pago</h2>

                    <div className="form-group full-width">
                        <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
                        <input type="text" id="numeroTarjeta" name="numeroTarjeta" value={formData.numeroTarjeta} onChange={handleChange} placeholder="**** **** **** ****" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="expiracion">Expiración (MM/AA)</label>
                        <input type="text" id="expiracion" name="expiracion" value={formData.expiracion} onChange={handleChange} placeholder="MM/AA" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cvc">CVC</label>
                        <input type="text" id="cvc" name="cvc" value={formData.cvc} onChange={handleChange} placeholder="123" required />
                    </div>

                    <button type="submit" className="btn-pagar">
                        Pagar Ahora
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Checkout;