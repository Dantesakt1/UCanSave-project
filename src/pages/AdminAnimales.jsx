import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/menu_adm.css'; 
import '../css/animales.css'; 

import '../css/animales.css';

function AdminAnimales() {
  const [animales, setAnimales] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [animalEditando, setAnimalEditando] = useState(null);
  
  // --- AÑADIDO 'categoria' AL ESTADO INICIAL ---
  const [nuevoAnimal, setNuevoAnimal] = useState({
    nombre: '',
    especie: '',
    peligro: '',
    rescate: '',
    img: '',
    precio: 5000,
    categoria: 'terrestre' // <-- AÑADIDO
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false); 

  useEffect(() => {
    const animalesGuardados = localStorage.getItem("listaAnimales");
    let animalesParaCargar = [];
    if (animalesGuardados && JSON.parse(animalesGuardados).length > 0) {
      animalesParaCargar = JSON.parse(animalesGuardados);
    } else if (window.listaAnimalesInicial) {
      animalesParaCargar = window.listaAnimalesInicial;
      localStorage.setItem("listaAnimales", JSON.stringify(animalesParaCargar));
    }
    setAnimales(animalesParaCargar);
    setIsDataLoaded(true); 

    const scriptSrc = '/js/productoAnimal.js'; 
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
        const sc = document.createElement('script');
        sc.src = scriptSrc;
        sc.async = true;
        sc.onload = () => {
            if (JSON.parse(localStorage.getItem("listaAnimales") || "[]").length === 0) {
                const animalesIniciales = window.listaAnimalesInicial || [];
                localStorage.setItem("listaAnimales", JSON.stringify(animalesIniciales));
                setAnimales(animalesIniciales);
            }
        };
        document.body.appendChild(sc);
    }
    
    return () => {
         const sc = document.querySelector(`script[src="${scriptSrc}"]`);
         if (sc) {
             document.body.removeChild(sc);
         }
    };
  }, []); 

  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem("listaAnimales", JSON.stringify(animales));
    }
  }, [animales, isDataLoaded]);

  const guardarAnimales = (nuevosAnimales) => {
    setAnimales(nuevosAnimales);
  };

  const handleSubmitAgregar = (e) => {
    e.preventDefault();
    const animalConId = { 
      ...nuevoAnimal, 
      id: Date.now(),
      precio: parseFloat(nuevoAnimal.precio) || 5000 
    };
    const nuevosAnimales = [...animales, animalConId];
    guardarAnimales(nuevosAnimales);
    setModalAgregar(false);
    // Limpiar estado
    setNuevoAnimal({ nombre: '', especie: '', peligro: '', rescate: '', img: '', precio: 5000, categoria: 'terrestre' });
  };

  const handleSubmitEditar = (e) => {
    e.preventDefault();
    const animalActualizado = {
      ...animalEditando.animal,
      precio: parseFloat(animalEditando.animal.precio) || 5000
    };
    const nuevosAnimales = animales.map((animal) => 
      animal.id === animalEditando.animal.id ? animalActualizado : animal
    );
    guardarAnimales(nuevosAnimales);
    setModalEditar(false);
    setAnimalEditando(null);
  };

  const abrirModalEditar = (animal) => {
    setAnimalEditando({ animal: {
        ...animal,
        precio: animal.precio || 5000,
        categoria: animal.categoria || 'terrestre' // <-- AÑADIDO
    }});
    setModalEditar(true);
  };

  const eliminarAnimal = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este animal?")) {
      const nuevosAnimales = animales.filter(animal => animal.id !== id);
      guardarAnimales(nuevosAnimales);
    }
  };

  return (
    <>
          <header>
        <nav className="sidebar">
            <br />
            <br />
          <h2></h2>
          <ul>
            <li><Link to="/menu-admin">Inicio</Link></li>
            <li><Link to="/admin-animales">Animales</Link></li>
            <li><Link to="/admin-usuarios">Usuarios</Link></li>
          </ul>
          <hr />
          <ul>
            <li><Link to="/menu">Cerrar Sesión</Link></li>
          </ul>
        </nav>
      </header>
      <main className="contenido">
        <br /> <br /> <br />
        <h1>¡Animales!</h1>
        <p>Aquí puedes administrar los animales para apadrinamiento.</p>
        <button className="btn-agregar" onClick={() => setModalAgregar(true)}>Agregar Animal</button>

        <table id="tablaAnimales">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Precio</th>
              {/* --- AÑADIDO: Columna Categoría --- */}
              <th>Categoría</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {animales.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.nombre}</td>
                <td>{animal.especie}</td>
                <td>${(animal.precio || 5000).toLocaleString('es-CL')}</td> 
                {/* --- AÑADIDO: Celda Categoría --- */}
                <td>{animal.categoria}</td>
                <td><img src={animal.img} width={100} alt={animal.nombre} /></td>
                <td>
                  <button className="btn-editar" onClick={() => abrirModalEditar(animal)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminarAnimal(animal.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL PARA AGREGAR */}
        {modalAgregar && (
          <div className="modal" style={{display: 'block'}}>
            <div className="modal-contenido">
              <span className="cerrar" onClick={() => setModalAgregar(false)}>&times;</span>
              <h2>Agregar Animal</h2>
              <form onSubmit={handleSubmitAgregar}>
                <label>Nombre:</label>
                <input type="text" required value={nuevoAnimal.nombre} onChange={(e) => setNuevoAnimal({...nuevoAnimal, nombre: e.target.value})} />
                <label>Especie:</label>
                <input type="text" required value={nuevoAnimal.especie} onChange={(e) => setNuevoAnimal({...nuevoAnimal, especie: e.target.value})} />
                
                {/* --- AÑADIDO: Select de Categoría --- */}
                <label>Categoría:</label>
                <select required value={nuevoAnimal.categoria} onChange={(e) => setNuevoAnimal({...nuevoAnimal, categoria: e.target.value})}>
                    <option value="terrestre">Terrestre</option>
                    <option value="marino">Marino</option>
                    <option value="aereo">Aéreo</option>
                </select>

                <label>Precio:</label>
                <input type="number" required min="0" value={nuevoAnimal.precio} onChange={(e) => setNuevoAnimal({...nuevoAnimal, precio: e.target.value})} />
                <label>Peligro:</label>
                <textarea required value={nuevoAnimal.peligro} onChange={(e) => setNuevoAnimal({...nuevoAnimal, peligro: e.target.value})}></textarea>
                <label>Rescate:</label>
                <textarea required value={nuevoAnimal.rescate} onChange={(e) => setNuevoAnimal({...nuevoAnimal, rescate: e.target.value})}></textarea>
                <label>Imagen (URL):</label>
                <input type="text" required value={nuevoAnimal.img} onChange={(e) => setNuevoAnimal({...nuevoAnimal, img: e.target.value})} />
                <button type="button" onClick={() => setModalAgregar(false)}>Cancelar</button>
                <button type="submit">Guardar</button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL PARA EDITAR */}
        {modalEditar && animalEditando && (
          <div className="modal" style={{display: 'block'}}>
             <div className="modal-contenido">
               <span className="cerrar" onClick={() => setModalEditar(false)}>&times;</span>
               <h2>Editar Animal</h2>
               <form onSubmit={handleSubmitEditar}>
                 <label>Nombre:</label>
                 <input type="text" required value={animalEditando.animal.nombre} onChange={(e) => setAnimalEditando({...animalEditando, animal: {...animalEditando.animal, nombre: e.target.value}})} />
                 <label>Especie:</label>
                 <input type="text" required value={animalEditando.animal.especie} onChange={(e) => setAnimalEditando({...animalEditando, animal: {...animalEditando.animal, especie: e.target.value}})} />
                 
                 {/* --- AÑADIDO: Select de Categoría --- */}
                 <label>Categoría:</label>
                 <select required value={animalEditando.animal.categoria} onChange={(e) => setAnimalEditando({...animalEditando, animal: {...animalEditando.animal, categoria: e.target.value}})}>
                     <option value="terrestre">Terrestre</option>
                     <option value="marino">Marino</option>
                     <option value="aereo">Aéreo</option>
                 </select>

                 <label>Precio:</label>
                 <input type="number" required min="0" value={animalEditando.animal.precio} onChange={(e) => setAnimalEditando({...animalEditando, animal: {...animalEditando.animal, precio: e.target.value}})} />
                 <label>Peligro:</label>
                 <textarea required value={animalEditando.animal.peligro} onChange={(e) => setAnimalEditando({...animalEditando, animal: {...animalEditando.animal, peligro: e.target.value}})}></textarea>
                 <label>Rescate:</label>
                 <textarea required value={animalEditando.animal.rescate} onChange={(e) => setAnimalEditando({...animalEditando, animal: {...animalEditando.animal, rescate: e.target.value}})}></textarea>
                 <label>Imagen (URL):</label>
                 <input type="text" required value={animalEditando.animal.img} onChange={(e) => setAnimalEditando({...animalEditando, animal: {...animalEditando.animal, img: e.target.value}})} />
                 
                 <button type="button" onClick={() => setModalEditar(false)}>Cancelar</button>
                 <button type="submit">Guardar</button>
               </form>
             </div>
          </div>
        )}
      </main>
    </>
  );
}

export default AdminAnimales;

