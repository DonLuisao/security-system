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
            const targetPath = 'src/main/resources/static/panel/paneles.html';
            
            if (protocol === 'http:' || protocol === 'https:') {
                window.location.href = window.location.origin + '/' + targetPath;
                return;
            }

            // Caso file://
            if (protocol === 'file:') {
                const pathname = decodeURI(window.location.pathname);
                const srcIdx = pathname.indexOf('/src/');
                
                if (srcIdx !== -1) {
                    const root = pathname.substring(0, srcIdx);
                    const candidate = 'file://' + root + '/' + targetPath;
                    window.location.href = candidate;
                    return;
                }

                // Fallback para file://
                window.location.href = targetPath;
                return;
            }

            // fallback general
            window.location.href = targetPath;
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
