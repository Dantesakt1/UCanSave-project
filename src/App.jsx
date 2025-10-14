import { useState } from 'react'
import './App.css'

import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import Menu from './pages/Menu'

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'


function App() {

  return (
    <>
      <Navbar />

      <Router>
        <Routes>
          {/* Rutas y componentes aquí */}
          <Route path='/' element={<Menu />} />
        </Routes>
      </Router>

      <Footer />
    </>
  )
}

export default App
