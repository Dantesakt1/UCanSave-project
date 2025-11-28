import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login_reg.css'; 
import '../css/estilo.css'; 
import { saveUsuario, getUsuarios } from '../api_rest';

function LoginRegister() {
    const [isRegisterView, setIsRegisterView] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: '', text: '' });

    // Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    // Registro
    const [registerNombre, setRegisterNombre] = useState(''); 
    const [registerApellido, setRegisterApellido] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return false;
        const allowedDomains = ['gmail.com', 'duocuc.cl', 'ucansave.com'];
        const domain = email.split('@').pop().toLowerCase();
        return allowedDomains.includes(domain);
    }
    
    const displayMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 4000); 
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' }); 

        if (loginPassword.trim() === "") return displayMessage('error', 'Ingresa tu contraseña.');

        if (loginEmail === "admin@ucansave.com" && loginPassword === "admin123") {
            localStorage.setItem("usuario", JSON.stringify({ nombre: "Admin", rol: "ADMIN" }));
            displayMessage('success', 'Bienvenido admin');
            setTimeout(() => navigate('/menu-admin'), 1000); 
            return;
        }

        try {
            // LOGIN SIMULADO (Traer todos y buscar)
            const usuariosBD = await getUsuarios();
            const usuarioEncontrado = usuariosBD.find(u => u.email === loginEmail && u.passwordHash === loginPassword);

            if (usuarioEncontrado) {
                localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
                displayMessage('success', `¡Hola ${usuarioEncontrado.nombre}!`);
                setTimeout(() => navigate('/'), 1000);
            } else {
                displayMessage('error', 'Credenciales incorrectas.');
            }
        } catch (error) {
            console.error(error);
            displayMessage('error', 'Error de conexión con el servidor.');
        }
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!registerNombre.trim() || !registerApellido.trim()) return displayMessage('error', 'Faltan datos personales.');
        if (!validateEmail(registerEmail)) return displayMessage('error', 'Correo inválido (@gmail, @duoc, @ucansave).');
        if (registerPassword.length < 6) return displayMessage('error', 'Contraseña muy corta (mín 6).');
        if (confirmPassword !== registerPassword) return displayMessage('error', 'Las contraseñas no coinciden.');

        const nuevoUsuario = {
            nombre: registerNombre,
            apellido: registerApellido,
            email: registerEmail,
            passwordHash: registerPassword, 
            fechaRegistro: null 
        };

        try {
            await saveUsuario(nuevoUsuario);
            displayMessage('success', '¡Registro exitoso! Por favor inicia sesión.');
            
            // Limpiar y cambiar a Login
            setRegisterNombre(''); setRegisterApellido(''); setRegisterEmail(''); setRegisterPassword(''); setConfirmPassword('');
            setIsRegisterView(false);
        } catch (error) {
            console.error(error);
            displayMessage('error', 'No se pudo registrar. Quizás el correo ya existe.');
        }
    };
    
    // centrado flexbox (soluciona el problema de clics bloqueados)
    const mainStyle = { 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        minHeight: '85vh', paddingTop: '80px', backgroundColor: '#fff' 
    };

    // Estilo para que el boton parezca un link
    const textButtonStyle = {
        background: 'none', border: 'none', padding: '0 5px',
        color: '#009579', fontWeight: 'bold', fontSize: '17px',
        cursor: 'pointer', textDecoration: 'underline'
    };

    return (
        <main style={mainStyle}> 
            
            {/* Mensaje Flotante */}
            {message.text && (
                <div style={{
                    position: 'absolute', top: '90px', zIndex: 100,
                    padding: '10px 20px', borderRadius: '5px', color: 'white', fontWeight: 'bold',
                    backgroundColor: message.type === 'error' ? '#e63946' : '#009579'
                }}>
                    {message.text}
                </div>
            )}
            
            <div className="contenedor"> 
                
                {/* --- LOGIN --- */}
                {!isRegisterView && (
                    <div className="formulario inicio-sesion"> 
                        <header>Login</header>
                        <form onSubmit={handleLogin}>
                            <input type="text" placeholder="Correo electrónico" 
                                value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                            <input type="password" placeholder="Contraseña" 
                                value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                            
                            <a href="#">¿Olvidaste tu contraseña?</a>
                            <input type="submit" className="boton" value="Ingresar" /> 
                        </form>
                        
                        <div className="texto-registro">
                            <span>¿No tienes una cuenta? </span>
                            <button type="button" style={textButtonStyle} onClick={() => setIsRegisterView(true)}>
                                Regístrate
                            </button>
                        </div>
                    </div>
                )}

                {/* --- REGISTRO --- */}
                {isRegisterView && (
                    <div className="formulario registro">
                        <header>Registrarse</header>
                        <form onSubmit={handleRegister}>
                            <input type="text" placeholder="Nombre" 
                                value={registerNombre} onChange={(e) => setRegisterNombre(e.target.value)} />
                            <input type="text" placeholder="Apellido" 
                                value={registerApellido} onChange={(e) => setRegisterApellido(e.target.value)} />
                            <input type="text" placeholder="Correo electrónico"
                                value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                            <input type="password" placeholder="Crea una contraseña"
                                value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                            <input type="password" placeholder="Confirma tu contraseña"
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            
                            <input type="submit" className="boton" value="Registrar" />
                        </form>

                        <div className="texto-registro">
                            <span>¿Ya tienes una cuenta? </span>
                            <button type="button" style={textButtonStyle} onClick={() => setIsRegisterView(false)}>
                                Inicia sesión
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default LoginRegister;