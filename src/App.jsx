import { useState } from 'react'
import './App.css'

import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import Menu from './pages/Menu'

import Apadrinamiento from './pages/Apadrinamiento'
import Formulario from './pages/Formulario'
import Carrito from './pages/Carrito'
import Noticias from './pages/Noticias'
import Noticia_2 from './pages/Noticia_2'
import Noticia_1 from './pages/Noticia_1'
import LoginRegister from './pages/LoginRegister'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import MenuAdmin from './pages/MenuAdmin'
import AdminAnimales from './pages/AdminAnimales'
import AdminUsuarios from './pages/AdminUsuarios'
import Checkout from './pages/checkout'
import PagoExitoso from './pages/PagoExitoso'
import PagoFallido from './pages/PagoFallido'
import MisApadrinamientos from './pages/MisApadrinamientos'
import './css/pagos.css';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* RUTAS PUBLICAS  */}
          <Route path='/' element={<Menu />} />
          <Route path='/noticias' element={<Noticias />} />
          <Route path='/noticia/1' element={<Noticia_1 />} />
          <Route path='/noticia/2' element={<Noticia_2 />} />
          <Route path='/login-registro' element={<LoginRegister />} />
          <Route path='/formulario' element={<Formulario />} />
          <Route path='/apadrinamiento' element={<Apadrinamiento />} />

          {/* RUTAS DONDE SE NECESITA LOGIN */}
          <Route path='/carrito' element={
            <ProtectedRoute>
              <Carrito />
            </ProtectedRoute>
          } />
          
          <Route path='/checkout' element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />

          <Route path='/mis-apadrinamientos' element={
            <ProtectedRoute>
              <MisApadrinamientos />
            </ProtectedRoute>
          } />

          <Route path='/pago-exitoso' element={
            <ProtectedRoute>
              <PagoExitoso />
            </ProtectedRoute>
          } />

          {/* RUTAS DE ADMIN */}
          <Route path='/menu-admin' element={
            <ProtectedRoute requireAdmin={true}>
              <MenuAdmin />
            </ProtectedRoute>
          } />

          <Route path='/admin-animales' element={
            <ProtectedRoute requireAdmin={true}>
              <AdminAnimales />
            </ProtectedRoute>
          } />

          <Route path='/admin-usuarios' element={
            <ProtectedRoute requireAdmin={true}>
              <AdminUsuarios />
            </ProtectedRoute>
          } />

        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App;