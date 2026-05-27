// ============================================
// PRODUCTOS � SPORT PLUS
// Conectado a Flask API: http://192.168.125.20:5000/api
// ============================================

// ��� PAGINACI�N ���
const PRODUCTOS_POR_PAGINA = 20; 
let _paginaActual = 1;          
let _productosActuales = [];    

function iniciarPaginacion(productos) {
    _productosActuales = productos;
    _paginaActual = 1;
    return _productosActuales.slice(0, PRODUCTOS_POR_PAGINA);
}

function cargarSiguientePagina() {
    _paginaActual++;
    const inicio = (_paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const fin    = _paginaActual       * PRODUCTOS_POR_PAGINA;
    return _productosActuales.slice(inicio, fin);
}

function hayMasProductos() {
    return _paginaActual * PRODUCTOS_POR_PAGINA < _productosActuales.length;
}

// ��� OBTENER PRODUCTOS ���
async function fetchProductos(filtros = {}) {
    try {
        const params = new URLSearchParams(filtros).toString();
        const res = await fetch(`${API_BASE_URL}/productos?${params}`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Error al cargar productos");
        return await res.json();
    } catch (err) {
        console.error("Error fetchProductos:", err);
        return [];
    }
}

// ��� OBTENER PRODUCTO POR ID ���
async function fetchProductoPorId(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/productos/${id}`, {
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Producto no encontrado");
        return await res.json();
    } catch (err) {
        console.error("Error fetchProductoPorId:", err);
        return null;
    }
}

// ��� CREAR PRODUCTO (admin) ���
async function crearProducto(datos) {
    try {
        const urlFinal = datos.url_producto || datos.imagen || datos.imagen_url || datos.url || "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500";

        const datosAdaptados = {
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            precio: parseFloat(datos.precio), 
            stock: parseInt(datos.stock),     
            categoria_id: datos.categoria_id ? parseInt(datos.categoria_id) : 1,
            url_producto: urlFinal 
        };

        const res = await fetch(`${API_BASE_URL}/productos`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(datosAdaptados)
        });
        return await res.json();
    } catch (err) {
        console.error("Error crearProducto:", err);
        return null;
    }
}

// ��� EDITAR PRODUCTO (admin) ���
async function editarProducto(id, datos) {
    try {
        const urlFinal = datos.url_producto || datos.imagen || datos.imagen_url || datos.url || "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500";

        const datosAdaptados = {
            nombre: datos.nombre,
            descripcion: datos.descripcion,
            precio: parseFloat(datos.precio),
            stock: parseInt(datos.stock),
            categoria_id: datos.categoria_id ? parseInt(datos.categoria_id) : 1,
            url_producto: urlFinal
        };

        const res = await fetch(`${API_BASE_URL}/productos/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(datosAdaptados)
        });
        return await res.json();
    } catch (err) {
        console.error("Error editarProducto:", err);
        return null;
    }
}

// ��� ELIMINAR PRODUCTO (admin) ���
async function eliminarProducto(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/productos/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
        });
        return res.ok;
    } catch (err) {
        console.error("Error eliminarProducto:", err);
        return false;
    }
}

// ��� RENDERIZAR TARJETA DE PRODUCTO ���
function renderizarTarjeta(producto) {
    // Extraer y limpiar las comillas de la URL de la imagen que env�a la API
    let urlImagen = producto.imagen || producto.url_producto || '';
    if (typeof urlImagen === 'string') {
        urlImagen = urlImagen.replace(/%22/g, '').replace(/"/g, '').trim();
    }
    
    // Si no hay URL, se usa la imagen por defecto
    if (!urlImagen) {
        urlImagen = "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500";
    }

    return `
        <div class="product-card" onclick="location.href='producto.html?id=${producto.id}'">
            <div class="product-card-img">
                <img src="${urlImagen}" alt="${producto.nombre}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500';">
                ${producto.badge ? `<span class="product-badge">${producto.badge}</span>` : ""}
            </div>
            <div class="product-card-body">
                <p class="product-card-sport">${producto.categoria?.nombre || producto.deporte || 'Sport Plus'}</p>
                <h3 class="product-card-name">${producto.nombre}</h3>
                <p class="product-card-sub">${producto.descripcion ? producto.descripcion.substring(0, 60) : ''}...</p>
                <div class="product-card-footer">
                    <span class="product-card-price">${formatearPrecio(producto.precio)}</span>
                    <button class="product-card-add" onclick="event.stopPropagation(); agregarAlCarrito(${producto.id})">
                        + Carrito
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ��� GESTI�N DEL CARRITO (Unificada) ���
function agregarAlCarrito(idProducto, talla = null) {
    const esPaginaInterior = window.location.pathname.includes('/pages/');

    if (!talla) {
        const rutaProducto = esPaginaInterior 
            ? `producto.html?id=${idProducto}` 
            : `pages/producto.html?id=${idProducto}`;
        window.location.href = rutaProducto;
        return; 
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => p.id === idProducto && p.tallaSeleccionada === talla);
    
    if (existente) {
        existente.cantidad += 1;
    } else {
        // Al no haber Mock, se busca dentro del array de productos cargados actualmente por la API
        const productoBase = _productosActuales.find(p => p.id === idProducto);
        if (productoBase) {
            carrito.push({ ...productoBase, cantidad: 1, tallaSeleccionada: talla });
        }
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    if (typeof actualizarContadorCarrito === "function") {
        actualizarContadorCarrito();
    } else {
        const badge = document.getElementById('cart-count');
        if (badge) badge.textContent = carrito.length;
    }
    
    const btns = document.querySelectorAll(`[onclick*="agregarAlCarrito(${idProducto}"]`);
    btns.forEach(btn => {
        const textoOriginal = btn.textContent;
        btn.textContent = "? A�adido";
        btn.style.background = "#44ff88";
        btn.style.color = "#000";
        setTimeout(() => {
            btn.textContent = textoOriginal;
            btn.style.background = "";
            btn.style.color = "";
        }, 1500);
    });
}
