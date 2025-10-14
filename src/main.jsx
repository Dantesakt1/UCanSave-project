import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './css/estilo.css'
import './css/animales.css'
import './css/apadrinamiento.css'
import './css/carrito.css'
import './css/formulario.css'
import './css/login_reg.css'
import './css/menu_adm.css'
import './css/usuarios.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
