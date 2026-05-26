// ============================================
// AUTH — SPORT PLUS
// Funciones de autenticación: login, registro, logout
// Se conectará a Flask API: https://divisive-utopia-lilly.ngrok-free.dev/api
// ============================================

// ——— LOGIN ———
// Envía login y contraseña a la API y guarda los datos de usuario si es correcto
async function login(email, password) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ login: email, password })
        });
        const datos = await res.json();

        if (res.ok) {
            localStorage.setItem("token", "token-falso-abp-123");
            localStorage.setItem("rol", datos.usuario.rol.id == 1 ? "ADMIN" : "USER"); // == acepta "1" y 1
            localStorage.setItem("nombre", datos.usuario.nombre);
            return { ok: true }; // la redirección la maneja login.html
        } else {
            return { ok: false, mensaje: datos.error || "Credenciales incorrectas" };
        }
    } catch (err) {
        console.error("Error login:", err);
        return { ok: false, mensaje: "Error de conexión con el servidor" };
    }
}

// ——— REGISTRO ———
// Crea una cuenta nueva con nombre, email y contraseña
async function registro(nombre, email, password) {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/registro`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ nombre, email, password })
        });
        const datos = await res.json();

        if (res.ok) {
            localStorage.setItem("token", "token-falso-abp-123");
            localStorage.setItem("rol", datos.usuario.rol.id == 1 ? "ADMIN" : "USER");
            localStorage.setItem("nombre", datos.usuario.nombre);
            return { ok: true };
        } else {
            return { ok: false, mensaje: datos.mensaje || "Error al crear la cuenta" };
        }
    } catch (err) {
        console.error("Error registro:", err);
        return { ok: false, mensaje: "Error de conexión con el servidor" };
    }
}

// ——— LOGOUT ———
// Borra los datos de sesión del localStorage y redirige al inicio
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("nombre");
    window.location.href = "../index.html";
}