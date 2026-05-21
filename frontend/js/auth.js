// ============================================
// AUTH — SPORT PLUS
// Funciones de autenticación: login, registro, logout
// Se conectará a Flask API: https://divisive-utopia-lilly.ngrok-free.dev/api
// ============================================

// ——— LOGIN ———
// Envía email y contraseña a la API y guarda el token si es correcto
async function login(email, password) {
    if (MOCK_MODE) {
        const esAdmin = email === "adminadmin@gmail.com" && password === "Admin123";
        localStorage.setItem("token", "mock-token-123");
        localStorage.setItem("rol", esAdmin ? "ADMIN" : "USER");
        localStorage.setItem("nombre", esAdmin ? "Admin" : email.split("@")[0]);
        return { ok: true };
    }

    try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ email, password })
        });
        const datos = await res.json();
        if (res.ok) {
            localStorage.setItem("token", datos.token);
            localStorage.setItem("rol", datos.rol);
            localStorage.setItem("nombre", datos.nombre);
            return { ok: true };
        } else {
            return { ok: false, mensaje: datos.mensaje || "Credenciales incorrectas" };
        }
    } catch (err) {
        console.error("Error login:", err);
        return { ok: false, mensaje: "Error de conexión con el servidor" };
    }
}

// ——— REGISTRO ———
// Crea una cuenta nueva con nombre, email y contraseña
async function registro(nombre, email, password) {
    if (MOCK_MODE) {
        localStorage.setItem("token", "mock-token-123");
        localStorage.setItem("rol", "USER");
        localStorage.setItem("nombre", nombre);
        return { ok: true };
    }

    try {
        const res = await fetch(`${API_BASE_URL}/auth/registro`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ nombre, email, password })
        });
        const datos = await res.json();
        if (res.ok) {
            localStorage.setItem("token", datos.token);
            localStorage.setItem("rol", datos.rol);
            localStorage.setItem("nombre", datos.nombre);
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