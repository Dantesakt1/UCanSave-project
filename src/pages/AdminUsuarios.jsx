import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/usuarios.css'; // Asegúrate de que este CSS exista
// IMPORTAMOS LAS FUNCIONES DEL API
import { getUsuarios, saveUsuario, updateUsuario, deleteUsuario } from '../api_rest';

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  
  // ESTADO PARA EDICIÓN
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  // ESTADO PARA NUEVO USUARIO (Estructura idéntica a tu Java)
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    passwordHash: ''
  });

  // --- 1. CARGAR USUARIOS (GET) ---
  const cargarUsuarios = async () => {
    try {
        const datos = await getUsuarios();
        setUsuarios(datos);
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // --- 2. AGREGAR USUARIO (POST) ---
  const handleSubmitAgregar = async (e) => {
    e.preventDefault();
    
    // Preparar objeto para Java
    const usuarioParaEnviar = {
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        passwordHash: nuevoUsuario.passwordHash,
        fechaRegistro: new Date().toISOString() // Enviamos la fecha actual automática
    };

    try {
        await saveUsuario(usuarioParaEnviar);
        alert("Usuario creado exitosamente");
        setModalAgregar(false);
        setNuevoUsuario({ nombre: '', apellido: '', email: '', passwordHash: '' }); // Limpiar
        cargarUsuarios(); // Recargar tabla
    } catch (error) {
        console.error(error);
        alert("Error al guardar. Posiblemente el email ya existe.");
    }
  };

  // --- 3. ELIMINAR USUARIO (DELETE) ---
  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario de la BD?")) {
        try {
            await deleteUsuario(id);
            cargarUsuarios();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar usuario.");
        }
    }
  };

  // --- 4. PREPARAR EDICIÓN ---
  const abrirModalEditar = (usuario) => {
      setUsuarioEditando(usuario);
      setModalEditar(true);
  };

  // --- 5. GUARDAR EDICIÓN (PUT) ---
  const handleSubmitEditar = async (e) => {
      e.preventDefault();
      try {
          await updateUsuario(usuarioEditando.idUsuario, usuarioEditando);
          alert("Usuario actualizado correctamente");
          setModalEditar(false);
          setUsuarioEditando(null);
          cargarUsuarios();
      } catch (error) {
          console.error(error);
          alert("Error al actualizar.");
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
          <ul>
            <li><Link to="/menu">Cerrar Sesión</Link></li>
          </ul>
        </nav>
      </header>

      <main className="contenido">
        <br /> <br /> <br />
        <h1>Gestión de Usuarios (Base de Datos)</h1>
        <p>Aquí puedes administrar a los usuarios registrados en el sistema.</p>

        <button onClick={() => setModalAgregar(true)}>Agregar Usuario</button>

        <table id="tablaUsuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.idUsuario}>
                <td>{usuario.idUsuario}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.email}</td>
                {/* Formateamos la fecha un poco para que se vea bien */}
                <td>{usuario.fechaRegistro ? new Date(usuario.fechaRegistro).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button onClick={() => abrirModalEditar(usuario)}>Editar</button>
                  <button onClick={() => eliminarUsuario(usuario.idUsuario)}>Eliminar</button>
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
                <h2>Agregar Usuario</h2>
                <form onSubmit={handleSubmitAgregar}>
                
                <label>Nombre:</label>
                <input type="text" required value={nuevoUsuario.nombre}
                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})} />
                
                <label>Apellido:</label>
                <input type="text" required value={nuevoUsuario.apellido}
                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, apellido: e.target.value})} />

                <label>Correo:</label>
                <input type="email" required value={nuevoUsuario.email}
                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, email: e.target.value})} />

                <label>Contraseña:</label>
                <input type="password" required value={nuevoUsuario.passwordHash}
                    onChange={(e) => setNuevoUsuario({...nuevoUsuario, passwordHash: e.target.value})} />

                <button type="button" onClick={() => setModalAgregar(false)}>Cancelar</button>
                <button type="submit">Guardar</button>
                </form>
            </div>
          </div>
        )}

        {/* --- MODAL EDITAR --- */}
        {modalEditar && usuarioEditando && (
          <div className="modal" style={{display: 'block'}}>
             <div className="modal-contenido">
                <span className="cerrar" onClick={() => setModalEditar(false)}>&times;</span>
                <h2>Editar Usuario</h2>
                <form onSubmit={handleSubmitEditar}>
                  
                  <label>Nombre:</label>
                  <input type="text" required value={usuarioEditando.nombre}
                    onChange={(e) => setUsuarioEditando({...usuarioEditando, nombre: e.target.value})} />

                  <label>Apellido:</label>
                  <input type="text" required value={usuarioEditando.apellido}
                    onChange={(e) => setUsuarioEditando({...usuarioEditando, apellido: e.target.value})} />

                  <label>Correo:</label>
                  <input type="email" required value={usuarioEditando.email}
                    onChange={(e) => setUsuarioEditando({...usuarioEditando, email: e.target.value})} />

                  <label>Contraseña (Nueva):</label>
                  <input type="text" required value={usuarioEditando.passwordHash}
                    onChange={(e) => setUsuarioEditando({...usuarioEditando, passwordHash: e.target.value})} />

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

export default AdminUsuarios;