import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminAnimales() {
  const [animales, setAnimales] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [animalEditando, setAnimalEditando] = useState(null);
  const [nuevoAnimal, setNuevoAnimal] = useState({
    nombre: '',
    especie: '',
    peligro: '',
    rescate: '',
    img: ''
  });

  useEffect(() => {
    const animalesGuardados = localStorage.getItem("listaAnimales");
    let animalesParaCargar = [];

    if (animalesGuardados && JSON.parse(animalesGuardados).length > 0) {
      animalesParaCargar = JSON.parse(animalesGuardados);
    } else if (window.listaAnimalesInicial) {
      // Si no hay nada en localStorage, usa la lista inicial y guárdala.
      animalesParaCargar = window.listaAnimalesInicial;
      localStorage.setItem("listaAnimales", JSON.stringify(animalesParaCargar));
    }
    
    setAnimales(animalesParaCargar);

    // Cargar el script que define `listaAnimalesInicial` si no está presente
    const scriptSrc = '/js/productoAnimal.js';
    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
        const sc = document.createElement('script');
        sc.src = scriptSrc;
        sc.async = true;
        sc.onload = () => {
            // Re-evaluar en caso de que el script cargue después del primer chequeo
            if (JSON.parse(localStorage.getItem("listaAnimales") || "[]").length === 0) {
                const animalesIniciales = window.listaAnimalesInicial || [];
                localStorage.setItem("listaAnimales", JSON.stringify(animalesIniciales));
                setAnimales(animalesIniciales);
            }
        };
        document.body.appendChild(sc);
    }
  }, [])

  // Función central para guardar en estado y localStorage
  const guardarAnimales = (nuevosAnimales) => {
    localStorage.setItem("listaAnimales", JSON.stringify(nuevosAnimales));
    setAnimales(nuevosAnimales);
  };

  const handleSubmitAgregar = (e) => {
    e.preventDefault();
    // Usamos Date.now() para un ID único y simple
    const animalConId = { ...nuevoAnimal, id: Date.now() };
    const nuevosAnimales = [...animales, animalConId];
    guardarAnimales(nuevosAnimales);
    setModalAgregar(false);
    setNuevoAnimal({ nombre: '', especie: '', peligro: '', rescate: '', img: '' });
  };

  const handleSubmitEditar = (e) => {
    e.preventDefault();
    const nuevosAnimales = animales.map((animal) => 
      animal.id === animalEditando.animal.id ? animalEditando.animal : animal
    );
    guardarAnimales(nuevosAnimales);
    setModalEditar(false);
    setAnimalEditando(null);
  };

  const abrirModalEditar = (animal) => {
    setAnimalEditando({ animal: {...animal} });
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
          <h2>Admin</h2>
          <ul>
            <li><Link to="/menu-admin">Inicio</Link></li>
            <li><Link to="/admin-animales">Animales</Link></li>
            <li><Link to="/admin-usuarios">Usuarios</Link></li>
          </ul>
          <hr />
          <ul>
            <li><Link to="/">Cerrar Sesión</Link></li>
          </ul>
        </nav>
      </header>

      <main className="contenido">
        <br />
        <br />
        <br />
        <h1>¡Animales!</h1>
        <p>Aquí puedes administrar los animales para apadrinamiento.</p>

        <button className="btn-agregar" onClick={() => setModalAgregar(true)}>Agregar Animal</button>

        <table id="tablaAnimales">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {animales.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.nombre}</td>
                <td>{animal.especie}</td>
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