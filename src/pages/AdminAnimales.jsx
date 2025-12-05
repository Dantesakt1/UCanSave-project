import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/menu_adm.css'; 
import '../css/animales.css'; 
import { getAnimales, saveAnimal, deleteAnimal, updateAnimal } from '../api_rest';

function AdminAnimales() {
  const [animales, setAnimales] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false); // modal apagado x defecto
  
  // variables para un nuevo animal
  const [nuevoAnimal, setNuevoAnimal] = useState({
    nombreAnimal: '',
    historiaRescate: '',
    costoApadrinamiento: 5000,
    urlImagen: '',
    idEspecie: 1
  });

  // Estado para EDITAR animal (tiene que tener ID)
  const [animalEditando, setAnimalEditando] = useState(null);

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
    const animalDTO = {
        nombreAnimal: nuevoAnimal.nombreAnimal,
        historiaRescate: nuevoAnimal.historiaRescate,
        costoApadrinamiento: parseFloat(nuevoAnimal.costoApadrinamiento),
        urlImagen: nuevoAnimal.urlImagen,
        especie: { idEspecie: parseInt(nuevoAnimal.idEspecie) }
    };

    try {
        await saveAnimal(animalDTO);
        alert("¡Animal creado!");
        setModalAgregar(false);
        setNuevoAnimal({ nombreAnimal: '', historiaRescate: '', costoApadrinamiento: 5000, urlImagen: '', idEspecie: 1 });
        cargarDatos(); 
    } catch (error) {
        console.error(error);
        alert("Error al guardar.");
    }
  };

  const abrirModalEditar = (animal) => {
      setAnimalEditando({
          idAnimal: animal.idAnimal, 
          nombreAnimal: animal.nombreAnimal,
          historiaRescate: animal.historiaRescate,
          costoApadrinamiento: animal.costoApadrinamiento,
          urlImagen: animal.urlImagen,
          idEspecie: animal.especie ? animal.especie.idEspecie : 1 
      });
      setModalEditar(true);
  };

  // --- (PUT) ---
  const handleSubmitEditar = async (e) => {
      e.preventDefault();
      
      const animalDTO = {
          idAnimal: animalEditando.idAnimal,
          nombreAnimal: animalEditando.nombreAnimal,
          historiaRescate: animalEditando.historiaRescate,
          costoApadrinamiento: parseFloat(animalEditando.costoApadrinamiento),
          urlImagen: animalEditando.urlImagen,
          especie: { idEspecie: parseInt(animalEditando.idEspecie) }
      };

      try {
          await updateAnimal(animalDTO.idAnimal, animalDTO);
          alert("¡Animal actualizado correctamente!");
          setModalEditar(false);
          setAnimalEditando(null);
          cargarDatos();
      } catch (error) {
          console.error(error);
          alert("Error al actualizar.");
      }
  };

  // --- ELIMINAR ---
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que quieres borrar este animal?")) {
        try {
            await deleteAnimal(id);
            cargarDatos();
        } catch (error) {
            console.log(error);
            alert("Error al eliminar.");
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
                <td>{animal.especie?.nombreComun || "Sin Especie"}</td>
                <td>${(animal.costoApadrinamiento || 0).toLocaleString()}</td>
                <td>
                  <button className="btn-editar" onClick={() => abrirModalEditar(animal)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleEliminar(animal.idAnimal)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- MODAL AGREGAR --- */}
        {modalAgregar && (
          <div className="modal" style={{display: 'block'}}>
            <div className="modal-contenido">
              <span className="cerrar" onClick={() => setModalAgregar(false)}>&times;</span>
              <h2>Nuevo Animal</h2>
              <form onSubmit={handleSubmitAgregar}>
                <label>Nombre:</label>
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

                <label>ID Especie:</label>
                <input type="number" value={nuevoAnimal.idEspecie} required
                    onChange={(e) => setNuevoAnimal({...nuevoAnimal, idEspecie: e.target.value})} />

                <button type="submit">Guardar</button>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL EDITAR  --- */}
        {modalEditar && animalEditando && (
          <div className="modal" style={{display: 'block'}}>
            <div className="modal-contenido">
              <span className="cerrar" onClick={() => setModalEditar(false)}>&times;</span>
              <h2>Editar Animal</h2>
              <form onSubmit={handleSubmitEditar}>
                <label>Nombre:</label>
                <input type="text" value={animalEditando.nombreAnimal} required
                    onChange={(e) => setAnimalEditando({...animalEditando, nombreAnimal: e.target.value})} />
                
                <label>Historia:</label>
                <input type="text" value={animalEditando.historiaRescate} required
                    onChange={(e) => setAnimalEditando({...animalEditando, historiaRescate: e.target.value})} />

                <label>Costo ($):</label>
                <input type="number" value={animalEditando.costoApadrinamiento} required
                    onChange={(e) => setAnimalEditando({...animalEditando, costoApadrinamiento: e.target.value})} />

                <label>URL Imagen:</label>
                <input type="text" value={animalEditando.urlImagen} required
                    onChange={(e) => setAnimalEditando({...animalEditando, urlImagen: e.target.value})} />

                <label>ID Especie:</label>
                <input type="number" value={animalEditando.idEspecie} required
                    onChange={(e) => setAnimalEditando({...animalEditando, idEspecie: e.target.value})} />

                <button type="button" onClick={() => setModalEditar(false)}>Cancelar</button>
                <button type="submit">Actualizar</button>
              </form>
            </div>
          </div>
        )}

      </main>
    </>
  );
}

export default AdminAnimales;