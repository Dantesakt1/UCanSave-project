import { useState, useEffect } from "react";
import '../css/carrito.css'

const Carrito = () => {

    useEffect(() => {
        const script = '/js/carrito.js'
        
        if (!document.querySelector(`script[src="${script}"]`)) {
            console.log("Cargando carrito.js")
            const sc = document.createElement('script')
            sc.src = script
            sc.async = true
            sc.onload = () => {
                console.log("carrito.js cargado")
                // Llamar a mostrarCarrito si existe
                if(window.mostrarCarrito){
                    window.mostrarCarrito()
                }
            }
            document.body.appendChild(sc)
        } else {
            // Si ya está cargado, simplemente llamar a mostrarCarrito
            if(window.mostrarCarrito){
                window.mostrarCarrito()
            }
        }
    }, [])

    return (
        <main>
            <section>
                <h1>Carrito de compras</h1>
                <hr/>
                <div id="detalle"></div>
            </section>
        </main>
    )
}

export default Carrito;