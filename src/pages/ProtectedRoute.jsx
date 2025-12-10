import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin }) {
    
    // se ve el usuario guardado en el localstorage
    const usuarioGuardado = localStorage.getItem("usuario");
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    // nadie logueado manda al login
    if (!usuario) {
        return <Navigate to="/login-registro" replace />;
    }

    // no es admin no deja entrar
    if (requireAdmin && usuario.rol !== 'ADMIN') {
        alert("⛔ Acceso denegado: No tienes permisos de administrador.");
        return <Navigate to="/" replace />;
    }

    // todo correcto se puede acceder a la pagina
    return children;
}

export default ProtectedRoute;