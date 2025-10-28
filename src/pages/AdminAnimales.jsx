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
    descripcion: '',
    precio: '',
    imagen: ''
  });

  useEffect(() => {
    const animalesGuardados = JSON.parse(localStorage.getItem("animales")) || [];
    setAnimales(animalesGuardados);
  }, []);

  const guardarAnimales = (nuevosAnimales) => {
    localStorage.setItem("animales", JSON.stringify(nuevosAnimales));
    setAnimales(nuevosAnimales);
  };

  const handleSubmitAgregar = (e) => {
    e.preventDefault();
    const nuevoId = animales.length > 0 ? animales[animales.length - 1].id + 1 : 1;
    const animalConId = { ...nuevoAnimal, id: nuevoId };
    const nuevosAnimales = [...animales, animalConId];
    guardarAnimales(nuevosAnimales);
    setModalAgregar(false);
    setNuevoAnimal({ nombre: '', especie: '', descripcion: '', precio: '', imagen: '' });
  };

  const handleSubmitEditar = (e) => {
    e.preventDefault();
    const nuevosAnimales = animales.map((animal, idx) => 
      idx === animalEditando.index ? { ...animalEditando.animal } : animal
    );
    guardarAnimales(nuevosAnimales);
    setModalEditar(false);
    setAnimalEditando(null);
  };

  const abrirModalEditar = (animal, index) => {
    setAnimalEditando({ animal: {...animal}, index });
    setModalEditar(true);
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
                    <br />
            <br />
            <br />
        <h1>¡Animales!</h1>
        <p>Aquí puedes administrar los animales</p>

        <button onClick={() => setModalAgregar(true)}>Agregar Animal</button>

        <table id="tablaAnimales">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {animales.map((animal, index) => (
              <tr key={animal.id}>
                <td>{animal.nombre}</td>
                <td>{animal.especie}</td>
                <td>{animal.descripcion}</td>
                <td>${animal.precio}</td>
                <td><img src={animal.imagen} width={100} alt={animal.nombre} /></td>
                <td>
                  <button onClick={() => abrirModalEditar(animal, index)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalAgregar && (
          <div className="modal" style={{display: 'block'}}>
            <h2>Agregar Animal</h2>
            <form onSubmit={handleSubmitAgregar}>
              <label>Nombre:</label>
              <input 
                type="text" 
                required 
                value={nuevoAnimal.nombre}
                onChange={(e) => setNuevoAnimal({...nuevoAnimal, nombre: e.target.value})}
              /><br/>
              <label>Especie:</label>
              <input 
                type="text" 
                required
                value={nuevoAnimal.especie}
                onChange={(e) => setNuevoAnimal({...nuevoAnimal, especie: e.target.value})}
              /><br/>
              <label>Descripción:</label>
              <textarea 
                required
                value={nuevoAnimal.descripcion}
                onChange={(e) => setNuevoAnimal({...nuevoAnimal, descripcion: e.target.value})}
              ></textarea><br/>
              <label>Precio:</label>
              <input 
                type="number" 
                required
                value={nuevoAnimal.precio}
                onChange={(e) => setNuevoAnimal({...nuevoAnimal, precio: e.target.value})}
              /><br/>
              <label>Imagen (URL):</label>
              <input 
                type="text" 
                required
                value={nuevoAnimal.imagen}
                onChange={(e) => setNuevoAnimal({...nuevoAnimal, imagen: e.target.value})}
              /><br/>
              <button type="button" onClick={() => setModalAgregar(false)}>Cancelar</button>
              <button type="submit">Guardar</button>
            </form>
          </div>
        )}

        {modalEditar && animalEditando && (
          <div className="modal" style={{display: 'block'}}>
            <h2>Editar Animal</h2>
            <form onSubmit={handleSubmitEditar}>
              <label>Nombre:</label>
              <input 
                type="text" 
                required
                value={animalEditando.animal.nombre}
                onChange={(e) => setAnimalEditando({
                  ...animalEditando,
                  animal: {...animalEditando.animal, nombre: e.target.value}
                })}
              /><br/>
              <label>Especie:</label>
              <input 
                type="text" 
                required
                value={animalEditando.animal.especie}
                onChange={(e) => setAnimalEditando({
                  ...animalEditando,
                  animal: {...animalEditando.animal, especie: e.target.value}
                })}
              /><br/>
              <label>Descripción:</label>
              <textarea 
                required
                value={animalEditando.animal.descripcion}
                onChange={(e) => setAnimalEditando({
                  ...animalEditando,
                  animal: {...animalEditando.animal, descripcion: e.target.value}
                })}
              ></textarea><br/>
              <label>Precio:</label>
              <input 
                type="number" 
                required
                value={animalEditando.animal.precio}
                onChange={(e) => setAnimalEditando({
                  ...animalEditando,
                  animal: {...animalEditando.animal, precio: e.target.value}
                })}
              /><br/>
              <label>Imagen (URL):</label>
              <input 
                type="text" 
                required
                value={animalEditando.animal.imagen}
                onChange={(e) => setAnimalEditando({
                  ...animalEditando,
                  animal: {...animalEditando.animal, imagen: e.target.value}
                })}
              /><br/>
              <button type="button" onClick={() => setModalEditar(false)}>Cancelar</button>
              <button type="submit">Guardar</button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}

export default AdminAnimales;