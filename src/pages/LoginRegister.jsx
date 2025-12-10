import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login_reg.css'; 
import '../css/estilo.css'; 
import { loginUsuario, registrarUsuario } from '../api_rest';

function LoginRegister() {
    const [isRegisterView, setIsRegisterView] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: '', text: '' });

    // login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    // registro
    const [registerNombre, setRegisterNombre] = useState(''); 
    const [registerApellido, setRegisterApellido] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return false;
        const allowedDomains = ['gmail.com','gmail.cl', 'duocuc.cl', 'ucansave.com', 'hotmail.com'];
        const domain = email.split('@').pop().toLowerCase();
        return allowedDomains.includes(domain);
    }
    
    const displayMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 4000); 
    };

    // LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' }); 

        if (loginPassword.trim() === "") return displayMessage('error', 'Ingresa tu contraseña.');

        try {
            // login REAL al servidor 
            const response = await loginUsuario({ 
                email: loginEmail, 
                password: loginPassword 
            });

            // si es el correo del admin para darle permisos en el menú
            const esAdmin = loginEmail === "admin@ucansave.com"; 

            // guardamos los datos
            const usuarioData = {
                nombre: response.nombre,
                email: loginEmail,
                // si es el correo del admin le da el rol de admin sino user
                rol: esAdmin ? "ADMIN" : "USER" 
            };
            
            localStorage.setItem("usuario", JSON.stringify(usuarioData));

            displayMessage('success', `¡Bienvenido ${esAdmin ? '': ''} ${response.nombre}!`);
            
            if (esAdmin) {
                setTimeout(() => navigate('/menu-admin'), 1000); // admin va al panel
            } else {
                setTimeout(() => navigate('/'), 1000); // usuario normal va al inicio
            }

        } catch (error) {
            console.error(error);
            displayMessage('error', 'Credenciales incorrectas o usuario no existe.');
        }
    };
    
    // registro
    const handleRegister = async (e) => {
        e.preventDefault();

        if (!registerNombre.trim() || !registerApellido.trim()) return displayMessage('error', 'Faltan datos personales.');
        if (!validateEmail(registerEmail)) return displayMessage('error', 'Correo inválido (@gmail.com/cl, @duoc.com, @ucansave.com).');
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
            await registrarUsuario(nuevoUsuario);
            displayMessage('success', '¡Registro exitoso! Ya puedes iniciar sesión.');
            
            setRegisterNombre(''); setRegisterApellido(''); setRegisterEmail(''); setRegisterPassword(''); setConfirmPassword('');
            setIsRegisterView(false); 
        } catch (error) {
            console.error(error);
            displayMessage('error', 'No se pudo registrar. El correo ya está en uso.');
        }
    };
    
    // ESTILOS
    const mainStyle = { 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
        minHeight: '85vh', paddingTop: '80px', backgroundColor: '#fff' 
    };

    const textButtonStyle = {
        background: 'none', border: 'none', padding: '0 5px',
        color: '#009579', fontWeight: 'bold', fontSize: '17px',
        cursor: 'pointer', textDecoration: 'underline'
    };

    return (
        <main style={mainStyle}> 
            
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
                
                {/* LOGIN */}
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

                {/* REGISTRO */}
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