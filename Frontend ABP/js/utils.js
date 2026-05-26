// ============================================
// UTILS — SPORT PLUS (funciones comunes para toda la app)
// ============================================

// Mostrar mensaje de error en el elemento con id dado
function mostrarError(id, mensaje) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = mensaje;
    el.style.display = "block";
    el.className = "msg msg-error";
}

// Mostrar mensaje de éxito
function mostrarExito(id, mensaje) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = mensaje;
    el.style.display = "block";
    el.className = "msg msg-success";
}

// Ocultar mensaje
function ocultarMensaje(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
}

// ¿Está el usuario logueado?
function estaLogueado() {
    return !!localStorage.getItem("token");
}

// ¿Es admin?
function esAdmin() {
    return localStorage.getItem("rol") === "ADMIN";
}

// Redirigir a login si no hay sesión
function requiereLogin() {
    if (!estaLogueado()) {
        window.location.href = "/pages/login.html";
    }
}

// Redirigir a inicio si no es admin
function requiereAdmin() {
    if (!esAdmin()) {
        window.location.href = "/index.html";
    }
}

// Headers con JWT para peticiones protegidas
function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

// Headers sin JWT para peticiones públicas
function getHeaders() {
    return { "Content-Type": "application/json" };
}

// Actualizar contador del carrito en la navbar
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const badges = document.querySelectorAll("#cart-count");
    badges.forEach(b => b.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0));
}

// Formatear precio
function formatearPrecio(precio) {
    return parseFloat(precio).toFixed(2) + "€";
}

// Obtener parámetro de la URL
function getParam(nombre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(nombre);
}

// Navbar dinámica: muestra "Mi cuenta" o "Entrar" según sesión
function iniciarNavbar() {
    const navUser = document.getElementById("nav-user");
    if (!navUser) return;
    navUser.innerHTML = estaLogueado()
        ? `<a href="/pages/perfil.html" class="btn btn-ghost">Mi cuenta</a>`
        : `<a href="/pages/login.html" class="btn btn-ghost">Entrar</a>`;
    actualizarContadorCarrito();
}