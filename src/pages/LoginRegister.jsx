import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login_reg.css'; 
import '../css/estilo.css'; 

function LoginRegister() {
    // --- 1. ESTADO DE VISTAS Y FORMULARIOS ---
    const [isRegisterView, setIsRegisterView] = useState(false);
    
    // Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    // Registro
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Mensajes de feedback
    const [message, setMessage] = useState({ type: '', text: '' });

    const navigate = useNavigate();

    // --- 2. LÓGICA DE CARGA DE SCRIPTS (Patrón del profesor) ---
    useEffect(() => {
        // Scripts que replicarían el patrón de carga
        const scripts = []; 
        // Si necesitas agregar algún script global (no de validación) que el profesor requiera:
        // scripts.push('/js/algunaUtilidad.js'); 

        scripts.forEach(src =>{
            if (!document.querySelector(`script[src="${src}"]`)) {
                console.log(`Cargando script: ${src}`);
                const sc = document.createElement('script');
                sc.src = src;
                sc.async = true;
                document.body.appendChild(sc);
            }
        });
        
        return () => {
            scripts.forEach(src => {
                 const sc = document.querySelector(`script[src="${src}"]`);
                 if (sc) {
                     document.body.removeChild(sc);
                 }
            });
        };
    }, []); 


    // --- 3. FUNCIONES DE UTILIDAD (Validación y Mensajes) ---
    function validateEmail(email) {
        // Validación general de formato de correo (e.g., algo@dominio.com)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        // --- Validación de dominios específicos (Nuevo Requisito) ---
        const allowedDomains = ['gmail.com', 'duoc.cl', 'ucansave.com'];
        const domain = email.split('@').pop().toLowerCase();

        return allowedDomains.includes(domain);
    }
    
    const displayMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 4000); 
    };
    
    // Estilo para el mensaje de feedback
    const messageStyle = {
        padding: '10px',
        borderRadius: '5px',
        margin: '15px auto', 
        width: '90%',
        maxWidth: '430px',
        textAlign: 'center',
        backgroundColor: message.type === 'error' ? '#e63946' : '#44b699',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    };


    // --- 4. HANDLERS DE FORMULARIOS ---
    
    const handleLogin = (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' }); 
        
        // 1. Validaciones básicas (Contraseña no vacía)
        if (loginPassword.trim() === "") {
            return displayMessage('error', 'La contraseña no puede estar vacía.');
        }

        // 2. Validación de Correo (Dominio)
        if (!validateEmail(loginEmail)) {
            return displayMessage('error', 'Por favor, ingresa un correo válido (@gmail, @duoc o @ucansave).');
        }

        // 3. Lógica de Autenticación (Admin vs. Usuario Normal)
        const adminEmail = "admin@ucansave.com";
        const adminPassword = "admin123";

        // Caso 1: ADMIN (Credenciales Fijas)
        if (loginEmail === adminEmail && loginPassword === adminPassword) {
            displayMessage('success', 'Inicio de sesión (ADMIN) exitoso. Redirigiendo...');
            setTimeout(() => navigate('/menu_admin'), 500); 
        } 
        // Caso 2: USUARIO NORMAL (Cualquier cuenta con dominio válido)
        else if (validateEmail(loginEmail)) {
             // En un sistema real, aquí se verificarían las credenciales contra la base de datos.
             // Para este ejercicio, cualquier cuenta con dominio válido es "exitosa".
            displayMessage('success', 'Inicio de sesión exitoso. Bienvenido!');
            setTimeout(() => navigate('/'), 500); // Redirige al menú principal
        }
        // Caso 3: Fallo de Credenciales (Contraseña incorrecta para el admin o user desconocido)
        else {
            displayMessage('error', 'Credenciales o usuario no reconocido. Inténtalo de nuevo.');
        }
    };
    
    const handleRegister = (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        // Validaciones
        if (!validateEmail(registerEmail)) {
            return displayMessage('error', 'Ingresa un correo válido (@gmail, @duoc o @ucansave).');
        }
        if (registerPassword.trim() === "" || registerPassword.length < 6) {
             return displayMessage('error', 'La contraseña debe tener al menos 6 caracteres.');
        }
        if (confirmPassword !== registerPassword) {
            return displayMessage('error', 'Las contraseñas no coinciden.');
        }
        
        // Lógica de Registro (simulación)
        displayMessage('success', '¡Registro exitoso! Ya puedes iniciar sesión.');
        
        // Limpiar campos y cambiar a la vista de Login
        setRegisterEmail('');
        setRegisterPassword('');
        setConfirmPassword('');
        setIsRegisterView(false); // Vuelve al login después del registro
    };


    // --- 5. RENDERIZADO ---
    
    const loginStyle = { display: isRegisterView ? 'none' : 'block' };
    const registerStyle = { display: !isRegisterView ? 'none' : 'block' };


    return (
        <main style={{ padding: '80px 0 40px 0', minHeight: 'calc(100vh - 100px)' }}> 

             {/* Mensajes de Error/Éxito */}
            {message.text && (
                <div style={messageStyle}>
                    {message.text}
                </div>
            )}
            
            <div className="contenedor"> 
                
                {/* --- Formulario de inicio de sesión --- */}
                <div className="formulario inicio-sesion" style={loginStyle}> 
                    <header>Login</header>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="text" 
                            placeholder="Ingresa tu correo" 
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Ingresa tu contraseña"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <a href="#">¿Olvidaste tu contraseña?</a>
                        <input type="submit" className="boton" value="Ingresar" /> 
                    </form>
                    <div className="texto-registro">
                        <span>¿No tienes una cuenta?
                            {/* CAMBIO: onClick para cambiar el estado */}
                            <label onClick={() => setIsRegisterView(true)}>Regístrate</label>
                        </span>
                    </div>
                </div>

                {/* --- Formulario de registro --- */}
                <div className="formulario registro" style={registerStyle}>
                    <header>Registrarse</header>
                    <form onSubmit={handleRegister}>
                        <input 
                            type="text" 
                            placeholder="Ingresa tu correo"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Crea una contraseña"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Confirma tu contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <input type="submit" className="boton" value="Registrar" />
                    </form>
                    <div className="texto-registro">
                        <span>¿Ya tienes una cuenta?
                            {/* CAMBIO: onClick para cambiar el estado */}
                            <label onClick={() => setIsRegisterView(false)}>Inicia sesión</label>
                        </span>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginRegister;
