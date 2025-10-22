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
          <Route path='/noticias' element={<Noticias/>}/>
          <Route path='/noticia/1' element={<Noticia_1/>}/>
          <Route path='/noticia/2' element={<Noticia_2/>}/>
          <Route path='/login-registro' element={<LoginRegister/>}/>
        </Routes>
      </Router>

      <Footer />
    </>
  )
}

export default App
