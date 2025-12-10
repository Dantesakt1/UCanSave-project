import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/usuarios.css'; 
import { getUsuarios, saveUsuario, updateUsuario, deleteUsuario } from '../api_rest';

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [passwordEdicion, setPasswordEdicion] = useState(''); 

  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    apellido: '',
    email: '',
    passwordHash: ''
  });

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

  const handleSubmitAgregar = async (e) => {
    e.preventDefault();
    
    const usuarioParaEnviar = {
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        passwordHash: nuevoUsuario.passwordHash, 
        fechaRegistro: null 
    };

    try {
        await saveUsuario(usuarioParaEnviar);
        alert("Usuario creado exitosamente");
        setModalAgregar(false);
        setNuevoUsuario({ nombre: '', apellido: '', email: '', passwordHash: '' });
        cargarUsuarios();
    } catch (error) {
        console.error(error);
        alert("Error al guardar. Posiblemente el email ya existe.");
    }
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
        try {
            await deleteUsuario(id);
            cargarUsuarios();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar usuario.");
        }
    }
  };


  const abrirModalEditar = (usuario) => {
      setUsuarioEditando({...usuario}); 
      setPasswordEdicion(''); 
      setModalEditar(true);
  };

  const handleSubmitEditar = async (e) => {
      e.preventDefault();

      const usuarioActualizado = {
          ...usuarioEditando
      };

      if (passwordEdicion.trim() !== '') {
          usuarioActualizado.passwordHash = passwordEdicion;
      } else {

      }
      
      if(passwordEdicion) {
          usuarioActualizado.passwordHash = passwordEdicion; 
      }

      try {
          await updateUsuario(usuarioEditando.idUsuario, usuarioActualizado);
          alert("Usuario actualizado correctamente");
          setModalEditar(false);
          setUsuarioEditando(null);
          setPasswordEdicion('');
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
            <div className="logo-admin">
                <h2>Admin Panel</h2>
            </div>
          <ul>
            <li><Link to="/menu-admin">Inicio</Link></li>
            <li><Link to="/admin-animales">Animales</Link></li>
            <li><Link to="/admin-usuarios" className="active">Usuarios</Link></li>
          </ul>
          <hr />
          <ul>
            <li><Link to="/">Volver al Sitio</Link></li>
            <li><Link to="/login-registro" onClick={() => localStorage.removeItem("usuario")}>Cerrar Sesión</Link></li>
          </ul>
        </nav>
      </header>

      <main className="contenido-admin" style={{ marginLeft: '250px', padding: '20px' }}>
        <h1>Gestión de Usuarios</h1>
        <button className="btn-agregar" onClick={() => setModalAgregar(true)} style={{marginBottom: '20px'}}>
            + Agregar Nuevo Usuario
        </button>

        <table className="tabla-admin">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
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
                <td>{usuario.fechaRegistro ? new Date(usuario.fechaRegistro).toLocaleDateString() : '-'}</td>
                <td>
                  <button className="btn-editar" onClick={() => abrirModalEditar(usuario)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => eliminarUsuario(usuario.idUsuario)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- MODAL AGREGAR --- */}
        {modalAgregar && (
          <div className="modal-overlay">
            <div className="modal-box">
                <span className="cerrar-modal" onClick={() => setModalAgregar(false)}>&times;</span>
                <h2>Nuevo Usuario</h2>
                <form onSubmit={handleSubmitAgregar}>
                    <input type="text" placeholder="Nombre" required 
                        value={nuevoUsuario.nombre} onChange={e => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})} />
                    
                    <input type="text" placeholder="Apellido" required 
                        value={nuevoUsuario.apellido} onChange={e => setNuevoUsuario({...nuevoUsuario, apellido: e.target.value})} />
                    
                    <input type="email" placeholder="Email" required 
                        value={nuevoUsuario.email} onChange={e => setNuevoUsuario({...nuevoUsuario, email: e.target.value})} />
                    
                    <input type="password" placeholder="Contraseña" required 
                        value={nuevoUsuario.passwordHash} onChange={e => setNuevoUsuario({...nuevoUsuario, passwordHash: e.target.value})} />
                    
                    <div className="modal-actions">
                        <button type="button" onClick={() => setModalAgregar(false)}>Cancelar</button>
                        <button type="submit" className="btn-confirmar">Guardar</button>
                    </div>
                </form>
            </div>
          </div>
        )}

        {/* --- MODAL EDITAR --- */}
        {modalEditar && usuarioEditando && (
          <div className="modal-overlay">
             <div className="modal-box">
                <span className="cerrar-modal" onClick={() => setModalEditar(false)}>&times;</span>
                <h2>Editar Usuario</h2>
                <form onSubmit={handleSubmitEditar}>
                  <label>Nombre:</label>
                  <input type="text" required value={usuarioEditando.nombre}
                    onChange={(e) => setUsuarioEditando({...usuarioEditando, nombre: e.target.value})} />

                  <label>Apellido:</label>
                  <input type="text" required value={usuarioEditando.apellido}
                    onChange={(e) => setUsuarioEditando({...usuarioEditando, apellido: e.target.value})} />

                  <label>Email:</label>
                  <input type="email" required value={usuarioEditando.email}
                    onChange={(e) => setUsuarioEditando({...usuarioEditando, email: e.target.value})} />

                  <label>Contraseña (Déjalo vacío para no cambiarla):</label>
                  <input type="text" 
                    placeholder="Escribe para cambiar la contraseña"
                    value={passwordEdicion}
                    onChange={(e) => setPasswordEdicion(e.target.value)} />

                  <div className="modal-actions">
                      <button type="button" onClick={() => setModalEditar(false)}>Cancelar</button>
                      <button type="submit" className="btn-confirmar">Actualizar</button>
                  </div>
                </form>
             </div>
          </div>
        )}
      </main>
    </>
  );
}

export default AdminUsuarios;