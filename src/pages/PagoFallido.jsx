import React from 'react';
import { Link } from 'react-router-dom';

function PagoFallido() {
    return (
        <main>
            <div className="resultado-pago-container">
                <div className="icono-fallido">
                    ✗ {/* Símbolo de X */}
                </div>
                <h1 style={{ color: '#e63946' }}>Pago Fallido</h1>
                <p>Hubo un error al procesar tu pago. La transacción fue rechazada por el banco.</p>
                <p>Por favor, verifica tus datos e inténtalo nuevamente.</p>
                <Link to="/checkout" className="btn-reintentar">Volver a Intentar el Pago</Link>
            </div>
        </main>
    );
}

export default PagoFallido;