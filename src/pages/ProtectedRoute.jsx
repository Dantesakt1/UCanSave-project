import { Navigate } from 'react-router-dom';

// 1. children: La página que intentas ver (ej: AdminAnimales)
// 2. requireAdmin: true si es solo para jefes, false si es para cualquier usuario logueado
function ProtectedRoute({ children, requireAdmin }) {
    
    // 1. Leemos el usuario del localStorage
    const usuarioGuardado = localStorage.getItem("usuario");
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    // CASO 1: No hay nadie logueado -> manda al login
    if (!usuario) {
        return <Navigate to="/login-registro" replace />;
    }

    // La ruta pide Admin, pero el usuario NO es Admin -> No deja entrar
    if (requireAdmin && usuario.rol !== 'ADMIN') {
        alert("⛔ Acceso denegado: No tienes permisos de administrador.");
        return <Navigate to="/" replace />;
    }

    // Todo correcto -> Se puede acceder a la pagina
    return children;
}

export default ProtectedRoute;