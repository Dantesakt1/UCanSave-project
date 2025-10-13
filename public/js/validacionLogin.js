document.addEventListener("DOMContentLoaded", () => {
    // Selección de elementos del formulario de login
    const loginForm = document.querySelector(".inicio-sesion form");
    const loginEmail = loginForm.querySelector("input[type='text']");
    const loginPassword = loginForm.querySelector("input[type='password']");
    const loginButton = loginForm.querySelector("input[type='button']");

    // Selección de elementos del formulario de registro
    const registerForm = document.querySelector(".registro form");
    const registerEmail = registerForm.querySelector("input[type='text']");
    const registerPassword = registerForm.querySelector("input[placeholder='Crea una contraseña']");
    const confirmPassword = registerForm.querySelector("input[placeholder='Confirma tu contraseña']");
    const registerButton = registerForm.querySelector("input[type='button']");

    // Función para validar correos electrónicos
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validación del formulario de login
    loginButton.addEventListener("click", () => {
        let valid = true;

        // Validar correo
        if (!validateEmail(loginEmail.value)) {
            alert("Por favor, ingresa un correo válido en el formulario de login.");
            valid = false;
        }

        // Validar contraseña
        if (loginPassword.value.trim() === "") {
            alert("La contraseña no puede estar vacía en el formulario de login.");
            valid = false;
        }

        if (valid) {
            alert("Inicio de sesión exitoso.");
        }
    });

    // Validación del formulario de registro
    registerButton.addEventListener("click", () => {
        let valid = true;

        // Validar correo
        if (!validateEmail(registerEmail.value)) {
            alert("Por favor, ingresa un correo válido en el formulario de registro.");
            valid = false;
        }

        // Validar contraseña
        if (registerPassword.value.trim() === "") {
            alert("La contraseña no puede estar vacía en el formulario de registro.");
            valid = false;
        }

        // Validar confirmación de contraseña
        if (confirmPassword.value !== registerPassword.value) {
            alert("Las contraseñas no coinciden en el formulario de registro.");
            valid = false;
        }

        if (valid) {
            alert("Registro exitoso.");
        }
    });



    loginButton.addEventListener("click", () => {
        const email = document.querySelector(".inicio-sesion input[type='text']").value;
        const password = document.querySelector(".inicio-sesion input[type='password']").value;

        // Credenciales de administrador (puedes reemplazar con datos dinámicos)
        const adminEmail = "admin@ucansave.com";
        const adminPassword = "admin123";

        if (email === adminEmail && password === adminPassword) {
            // Redirigir al menú de administrador
            window.location.href = "menu_admin.html";
        } else {
            alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
        }
    });
});