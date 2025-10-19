import { useState } from 'react'
import './App.css'

import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import Menu from './pages/Menu'

import Apadrinamiento from './pages/Apadrinamiento'
import Formulario from './pages/Formulario'
import Carrito from './pages/Carrito'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'



function App() {

  return (
    <>
      <Navbar />

      <Router>
        <Routes>
          {/* Rutas y componentes aquí */}
          <Route path='/' element={<Menu />} />
          <Route path='/apadrinamiento' element={<Apadrinamiento/>} />
          <Route path='/formulario' element={<Formulario/>} />
          <Route path='/carrito' element={<Carrito/>}/>
        </Routes>
      </Router>

      <Footer />
    </>
  )
}

export default App
