const VALID_USER = 'Persona1';
const VALID_PASS = 'Password1234';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form.container') || document.querySelector('form');
    if (!form) return;

    const usernameInput = form.querySelector('input[name="username"]');
    const passwordInput = form.querySelector('input[name="password"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const user = (usernameInput && usernameInput.value.trim()) || '';
        const pass = (passwordInput && passwordInput.value) || '';

        const prev = form.querySelector('.login-message');
        if (prev) prev.remove();

        if (user === VALID_USER && pass === VALID_PASS) {
            sessionStorage.setItem('authUser', user);
            
            // Redirigir a paneles.html que está en la carpeta panel
            window.location.href = 'panel/paneles.html';
            return;
        }

        const msg = document.createElement('p');
        msg.className = 'login-message';
        msg.style.color = 'red';
        msg.style.marginTop = '10px';
        msg.textContent = 'Usuario o contraseña incorrectos.';
        form.appendChild(msg);
    });
});
