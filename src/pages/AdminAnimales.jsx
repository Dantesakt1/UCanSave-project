import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/menu_adm.css'; 
import '../css/animales.css'; 
import { getAnimales, saveAnimal, deleteAnimal } from '../api_rest';

function AdminAnimales() {
  const [animales, setAnimales] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  
  // ESTADO EXACTO COMO JAVA LO PIDE
  const [nuevoAnimal, setNuevoAnimal] = useState({
    nombreAnimal: '',
    historiaRescate: '',
    costoApadrinamiento: 5000,
    urlImagen: '',
    idEspecie: 1
  });

  const cargarDatos = async () => {
      try {
          const datos = await getAnimales();
          setAnimales(datos);
      } catch (error) {
          console.error("Error cargando animales:", error);
      }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleSubmitAgregar = async (e) => {
    e.preventDefault();
    
    // PREPARANDO EL PAQUETE PARA JAVA
    const animalDTO = {
        nombreAnimal: nuevoAnimal.nombreAnimal,
        historiaRescate: nuevoAnimal.historiaRescate,
        costoApadrinamiento: parseFloat(nuevoAnimal.costoApadrinamiento), // Asegura que sea número
        urlImagen: nuevoAnimal.urlImagen,
        especie: {
            idEspecie: parseInt(nuevoAnimal.idEspecie) // IMPORTANTE: Objeto anidado
        }
    };

    // CHIVATO: Muestra en la consola (F12) qué estamos enviando
    console.log("Enviando a Java:", animalDTO);

    try {
        await saveAnimal(animalDTO);
        alert("¡Éxito! Animal guardado.");
        setModalAgregar(false);
        // Limpiamos el formulario
        setNuevoAnimal({ 
            nombreAnimal: '', 
            historiaRescate: '', 
            costoApadrinamiento: 5000, 
            urlImagen: '', 
            idEspecie: 1 
        });
        cargarDatos(); 
    } catch (error) {
        console.error("Error al guardar:", error);
        // Si el error tiene respuesta del servidor, muéstrala
        if (error.response) {
            alert(`Error del Servidor: ${error.response.status} - Revisa la consola.`);
            console.log("Detalle del error:", error.response.data);
        } else {
            alert("Error de conexión. ¿Está prendido el backend?");
        }
    }
  };

const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar de verdad?")) {
        try {
            await deleteAnimal(id);
            cargarDatos();
        } catch (error) {
            console.log(error); 
            alert("Error al eliminar");
        }
    }
  };

  return (
    <>
      <header>
        <nav className="sidebar">
            <br /><br />
          <ul>
            <li><Link to="/menu-admin">Inicio</Link></li>
            <li><Link to="/admin-animales">Animales</Link></li>
            <li><Link to="/admin-usuarios">Usuarios</Link></li>
          </ul>
          <hr />
          <ul><li><Link to="/menu">Cerrar Sesión</Link></li></ul>
        </nav>
      </header>

      <main className="contenido">
        <br /> <br /> <br />
        <h1>Gestión de Animales</h1>
        <button className="btn-agregar" onClick={() => setModalAgregar(true)}>Agregar Animal</button>

        <table id="tablaAnimales">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Costo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {animales.map((animal) => (
              <tr key={animal.idAnimal}>
                <td>{animal.idAnimal}</td>
                <td>{animal.nombreAnimal}</td>
                {/* Protección por si la especie viene nula */}
                <td>{animal.especie?.nombreComun || "Sin Especie"}</td>
                <td>${(animal.costoApadrinamiento || 0).toLocaleString()}</td>
                <td>
                  <button className="btn-eliminar" onClick={() => handleEliminar(animal.idAnimal)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalAgregar && (
          <div className="modal" style={{display: 'block'}}>
            <div className="modal-contenido">
              <span className="cerrar" onClick={() => setModalAgregar(false)}>&times;</span>
              <h2>Nuevo Animal</h2>
              <form onSubmit={handleSubmitAgregar}>
                
                <label>Nombre Animal:</label>
                <input type="text" value={nuevoAnimal.nombreAnimal} required
                    onChange={(e) => setNuevoAnimal({...nuevoAnimal, nombreAnimal: e.target.value})} />
                
                <label>Historia:</label>
                <input type="text" value={nuevoAnimal.historiaRescate} required
                    onChange={(e) => setNuevoAnimal({...nuevoAnimal, historiaRescate: e.target.value})} />

                <label>Costo ($):</label>
                <input type="number" value={nuevoAnimal.costoApadrinamiento} required
                    onChange={(e) => setNuevoAnimal({...nuevoAnimal, costoApadrinamiento: e.target.value})} />

                <label>URL Imagen:</label>
                <input type="text" value={nuevoAnimal.urlImagen} required
                    onChange={(e) => setNuevoAnimal({...nuevoAnimal, urlImagen: e.target.value})} />

                <label>ID Especie (1 al 9):</label>
                <input type="number" value={nuevoAnimal.idEspecie} min="1" max="9" required
                    onChange={(e) => setNuevoAnimal({...nuevoAnimal, idEspecie: e.target.value})} />

                <button type="submit">Guardar en BD</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default AdminAnimales;