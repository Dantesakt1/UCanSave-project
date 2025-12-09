import React from 'react';
import { Link } from 'react-router-dom';

function PagoExitoso() {
    return (
        <main>
            <div className="resultado-pago-container">
                <div className="icono-exito">
                    ✓
                </div>
                <h1 style={{ color: '#44b699' }}>¡Pago Exitoso!</h1>
                <p>Tu apadrinamiento ha sido procesado correctamente. Hemos enviado un comprobante a tu correo.</p>
                <p>¡Gracias por ayudarnos a salvar especies!</p>
                <Link to="/" className="btn-volver">Volver al Inicio</Link>
            </div>
        </main>
    );
}

export default PagoExitoso;