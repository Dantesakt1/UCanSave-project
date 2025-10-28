import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminUsuarios() {
  const datosDePrueba = [
    { id: 1, rut: "11.111.111-1", nombre: "Juan Pérez", correo: "juanperez@mail.com", contraseña: "1234", repetirContraseña: "1234" },
    { id: 2, rut: "22.222.222-2", nombre: "María López", correo: "marialopez@mail.com", contraseña: "abcd", repetirContraseña: "abcd" },
    { id: 3, rut: "33.333.333-3", nombre: "Carlos Díaz", correo: "carlosdiaz@mail.com", contraseña: "5678", repetirContraseña: "5678" },
    { id: 4, rut: "44.444.444-4", nombre: "Ana Torres", correo: "anatorres@mail.com", contraseña: "efgh", repetirContraseña: "efgh" },
    { id: 5, rut: "55.555.555-5", nombre: "Luis Gómez", correo: "luisgomez@mail.com", contraseña: "91011", repetirContraseña: "91011" }
  ];

  const [usuarios, setUsuarios] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    rut: '',
    nombre: '',
    correo: '',
    contraseña: '',
    repetirContraseña: ''
  });

  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || datosDePrueba;
    setUsuarios(usuariosGuardados);
  }, []);

  const guardarUsuarios = (nuevosUsuarios) => {
    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
    setUsuarios(nuevosUsuarios);
  };

  const handleSubmitAgregar = (e) => {
    e.preventDefault();
    const nuevoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
    const usuarioConId = { ...nuevoUsuario, id: nuevoId };
    const nuevosUsuarios = [...usuarios, usuarioConId];
    guardarUsuarios(nuevosUsuarios);
    setModalAgregar(false);
    setNuevoUsuario({ rut: '', nombre: '', correo: '', contraseña: '', repetirContraseña: '' });
  };

  const handleSubmitEditar = (e) => {
    e.preventDefault();
    const nuevosUsuarios = usuarios.map((usuario) => 
      usuario.id === usuarioEditando.id ? usuarioEditando : usuario
    );
    guardarUsuarios(nuevosUsuarios);
    setModalEditar(false);
    setUsuarioEditando(null);
  };

  const eliminarUsuario = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      const nuevosUsuarios = usuarios.filter(usuario => usuario.id !== id);
      guardarUsuarios(nuevosUsuarios);
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
        <br />
        <br />
        <br />
        <h1>Gestión de Usuarios</h1>
        <p>Aquí puedes administrar a los usuarios</p>

        <button onClick={() => setModalAgregar(true)}>Agregar Usuario</button>

        <table id="tablaUsuarios">
          <thead>
            <tr>
              <th>RUT</th>
              <th>Nombre Completo</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.rut}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>
                  <button onClick={() => {
                    setUsuarioEditando(usuario);
                    setModalEditar(true);
                  }}>Editar</button>
                  <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalAgregar && (
          <div className="modal" style={{display: 'block'}}>
            <h2>Agregar Usuario</h2>
            <form onSubmit={handleSubmitAgregar}>
              <label>RUT:</label>
              <input 
                type="text" 
                required
                value={nuevoUsuario.rut}
                onChange={(e) => setNuevoUsuario({...nuevoUsuario, rut: e.target.value})}
              /><br/>
              <label>Nombre Completo:</label>
              <input 
                type="text" 
                required
                value={nuevoUsuario.nombre}
                onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
              /><br/>
              <label>Correo:</label>
              <input 
                type="email" 
                required
                value={nuevoUsuario.correo}
                onChange={(e) => setNuevoUsuario({...nuevoUsuario, correo: e.target.value})}
              /><br/>
              <label>Contraseña:</label>
              <input 
                type="password" 
                required
                value={nuevoUsuario.contraseña}
                onChange={(e) => setNuevoUsuario({...nuevoUsuario, contraseña: e.target.value})}
              /><br/>
              <label>Repetir Contraseña:</label>
              <input 
                type="password" 
                required
                value={nuevoUsuario.repetirContraseña}
                onChange={(e) => setNuevoUsuario({...nuevoUsuario, repetirContraseña: e.target.value})}
              /><br/>
              <button type="button" onClick={() => setModalAgregar(false)}>Cancelar</button>
              <button type="submit">Guardar</button>
            </form>
          </div>
        )}

        {modalEditar && usuarioEditando && (
          <div className="modal" style={{display: 'block'}}>
            <h2>Editar Usuario</h2>
            <form onSubmit={handleSubmitEditar}>
              <label>RUT:</label>
              <input 
                type="text" 
                required
                value={usuarioEditando.rut}
                onChange={(e) => setUsuarioEditando({...usuarioEditando, rut: e.target.value})}
              /><br/>
              <label>Nombre Completo:</label>
              <input 
                type="text" 
                required
                value={usuarioEditando.nombre}
                onChange={(e) => setUsuarioEditando({...usuarioEditando, nombre: e.target.value})}
              /><br/>
              <label>Correo:</label>
              <input 
                type="email" 
                required
                value={usuarioEditando.correo}
                onChange={(e) => setUsuarioEditando({...usuarioEditando, correo: e.target.value})}
              /><br/>
              <label>Contraseña:</label>
              <input 
                type="password" 
                required
                value={usuarioEditando.contraseña}
                onChange={(e) => setUsuarioEditando({...usuarioEditando, contraseña: e.target.value})}
              /><br/>
              <label>Repetir Contraseña:</label>
              <input 
                type="password" 
                required
                value={usuarioEditando.repetirContraseña}
                onChange={(e) => setUsuarioEditando({...usuarioEditando, repetirContraseña: e.target.value})}
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

export default AdminUsuarios;