
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

            const protocol = window.location.protocol;
            if (protocol === 'http:' || protocol === 'https:') {
                window.location.href = window.location.origin + '/index.html';
                return;
            }

            // Caso file:// — intenta redirigir a resources/static/index.html dentro del proyecto
            if (protocol === 'file:') {
                const pathname = decodeURI(window.location.pathname);
                const srcIdx = pathname.indexOf('/src/');
                if (srcIdx !== -1) {
                    const root = pathname.substring(0, srcIdx);
                    const candidate = 'file://' + root + '/src/main/resources/static/index.html';
                    window.location.href = candidate;
                    return;
                }

                // fallback: index.html en la misma carpeta que inicio.html
                window.location.href = 'index.html';
                return;
            }

            // fallback general
            window.location.href = 'index.html';
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