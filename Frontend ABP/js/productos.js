// ============================================
// PRODUCTOS — SPORT PLUS
// Conectado a Flask API: http://192.168.125.20:5000/api
// MOCK_MODE = true mientras el backend no esté listo
// ============================================

// ——— MOCK DATA (datos de prueba) ———
const MOCK_PRODUCTOS = [
    {
        id: 1,
        nombre: "Camiseta segunda equipación España 26",
        descripcion: "La Camiseta de la segunda equipación España 26 rinde homenaje a la pasión y el legado del fútbol español. Inspirada en los vibrantes colores de la bandera española, está diseñada para llamar la atención, tanto dentro como fuera del campo.",
        precio: 99.99,
        deporte: "futbol",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 25,
        imagen: "https://resize.sprintercdn.com/o/products/0410856/camisola-espanha-mundial-2026_0410856_00_5_3848300089.jpg",
        badge: "Nuevo"
    },
    {
        id: 2,
        nombre: "Nike Challenger 2-In-1 Shorts",
        descripcion: "Diseñado para correr, entrenar y practicar yoga, el pantalón corto Challenger con capilarización del sudor mantiene la ligereza y la perfección con una capa exterior holgada y una capa interior ceñida para ofrecer una sujeción que te ayuda a sacar el máximo partido a tus movimientos. Este pantalón es mucho más que un pantalón de running. Lleva un bolsillo cómodo que no roza cuando cambias la pista por el gimnasio.",
        precio: 45.00,
        deporte: "running",
        categoria: "pantalones",
        tallas: ["S", "M", "L", "XL"],
        stock: 40,
        imagen: "https://i8.amplience.net/i/jpl/jd_780116_a?qlt=92&w=750&h=957&v=1&fmt=auto",
        badge: null
    },
    {
        id: 3,
        nombre: "Apex Seamless 1/4 Zip",
        descripcion: "Apex está diseñada para mantener la frescura y permitirte centrarte únicamente en tu mejor rendimiento: sin distracciones y sin excepciones.",
        precio: 40.00,
        deporte: "gym",
        categoria: "sudaderas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 15,
        imagen: "https://cdn.shopify.com/s/files/1/1367/5201/files/images-ApexSeamless14ZipV2GSBlackGSDarkGreyA5A4V_BB3K_0470_V1_1920x.jpg?v=1759932048",
        badge: "-20%"
    },
    {
        id: 4,
        nombre: "Zapatilla Cloudmonster 1",
        descripcion: "¿Conoces las originales? Entonces ya sabes de qué comodidad estamos hablando. Su sistema de amortiguación CloudTec® y un Speedboard® mullido garantizan aterrizajes cómodos y despegues potentes. Tus pies te lo van a agradecer, tanto para salir a pasear como para el ajetreo diario.",
        precio: 180.00,
        deporte: "running",
        categoria: "zapatillas",
        tallas: ["38", "39", "40", "41", "42", "43", "44", "45"],
        stock: 8,
        imagen: "https://images.ctfassets.net/hnk2vsx53n6l/2WBc6fR6S7jEFwdTOeez6d/f22d0515b387855a2519a3c544340d7f/f3fa38108f8fd4de47a3756470f17361862c5889.png?w=1200&h=1200&fm=avif&f=center&fit=fill&q=80",
        badge: null
    },
    {
        id: 5,
        nombre: "Camiseta Basket Elite",
        descripcion: "Camiseta de baloncesto con tejido mesh para máxima ventilación. Corte amplio para libertad de movimiento total.",
        precio: 44.99,
        deporte: "baloncesto",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL"],
        stock: 30,
        imagen: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",
        badge: "Nuevo"
    },
    {
        id: 6,
        nombre: "Mallas Running Pro",
        descripcion: "Mallas de compresión para running. Mejoran la circulación y reducen la fatiga muscular en largas distancias.",
        precio: 54.99,
        deporte: "running",
        categoria: "pantalones",
        tallas: ["XS", "S", "M", "L", "XL"],
        stock: 20,
        imagen: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80",
        badge: null
    },
    {
        id: 7,
        nombre: "Chaqueta WindBreaker",
        descripcion: "Chaqueta cortavientos para deportes al aire libre. Impermeable, plegable y con capucha guardable en el cuello.",
        precio: 89.99,
        deporte: "running",
        categoria: "chaquetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 12,
        imagen: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
        badge: null
    },
    {
        id: 8,
        nombre: "Camiseta Tenis Match",
        descripcion: "Camiseta polo técnica para tenis. Cuello reforzado, manga corta y tejido que regula la temperatura corporal.",
        precio: 39.99,
        deporte: "tenis",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL"],
        stock: 18,
        imagen: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80",
        badge: "-15%"
    },
    {
        id: 9,
        nombre: "Pantalón Fútbol Match",
        descripcion: "Pantalón corto oficial de partido. Tejido ligero con cinturilla elástica y cordón interior ajustable.",
        precio: 29.99,
        deporte: "futbol",
        categoria: "pantalones",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 35,
        imagen: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80",
        badge: null
    },
    {
        id: 10,
        nombre: "Zapatilla Court Pro",
        descripcion: "Zapatilla de pista para tenis y pádel. Suela antideslizante y refuerzo lateral para cambios de dirección rápidos.",
        precio: 94.99,
        deporte: "tenis",
        categoria: "zapatillas",
        tallas: ["38", "39", "40", "41", "42", "43", "44"],
        stock: 10,
        imagen: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
        badge: null
    },
    {
        id: 11,
        nombre: "Camiseta Técnica Gym",
        descripcion: "Camiseta de entrenamiento con tejido transpirable de doble capa. Corte slim fit y costuras planas para mayor comodidad.",
        precio: 27.99,
        deporte: "gym",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 50,
        imagen: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
        badge: null
    },
    {
        id: 12,
        nombre: "Chaqueta Entreno Elite",
        descripcion: "Chaqueta de chándal para entrenamiento. Tejido suave al tacto, cremallera completa y puños con abertura para el pulgar.",
        precio: 74.99,
        deporte: "gym",
        categoria: "chaquetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 22,
        imagen: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80",
        badge: "-10%"
    },
    {
        id: 13,
        nombre: "Zapatilla Trail Runner",
        descripcion: "Zapatilla para trail running. Suela Vibram de alta adherencia, protección en el antepié y sistema de drenaje rápido.",
        precio: 134.99,
        deporte: "running",
        categoria: "zapatillas",
        tallas: ["38", "39", "40", "41", "42", "43", "44", "45", "46"],
        stock: 6,
        imagen: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
        badge: "Nuevo"
    },
    {
        id: 14,
        nombre: "Pantalón Baloncesto Pro",
        descripcion: "Pantalón largo de baloncesto con bolsillos laterales y tejido elástico en cuatro direcciones para máxima libertad de movimiento.",
        precio: 49.99,
        deporte: "baloncesto",
        categoria: "pantalones",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 18,
        imagen: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=600&q=80",
        badge: null
    },
    {
        id: 15,
        nombre: "Sudadera Hoodie Running",
        descripcion: "Sudadera técnica para running en frío. Capucha ajustada, tejido DryFit y reflectantes para mayor visibilidad nocturna.",
        precio: 79.99,
        deporte: "running",
        categoria: "sudaderas",
        tallas: ["S", "M", "L", "XL"],
        stock: 14,
        imagen: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
        badge: null
    },
    {
        id: 16,
        nombre: "Camiseta Portero Pro",
        descripcion: "Camiseta de portero con acolchado en codos y mangas largas. Tejido resistente a la abrasión y colores de alto contraste.",
        precio: 54.99,
        deporte: "futbol",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 20,
        imagen: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80",
        badge: null
    },
    {
        id: 17,
        nombre: "Leggings Yoga Flow",
        descripcion: "Leggings de compresión media para yoga y pilates. Tela opaca, cinturilla alta y panel de malla transpirable en la parte trasera.",
        precio: 44.99,
        deporte: "gym",
        categoria: "pantalones",
        tallas: ["XS", "S", "M", "L", "XL"],
        stock: 28,
        imagen: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
        badge: "Nuevo"
    },
    {
        id: 18,
        nombre: "Chaqueta Puffer Sport",
        descripcion: "Chaqueta acolchada ligera para entrenamientos en exterior. Relleno sintético reciclado, resistente al viento y al agua.",
        precio: 109.99,
        deporte: "running",
        categoria: "chaquetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 9,
        imagen: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=600&q=80",
        badge: null
    },
    {
        id: 19,
        nombre: "Zapatilla Basket High",
        descripcion: "Bota de baloncesto de caña alta con soporte de tobillo reforzado. Suela de goma de alta tracción para pista interior.",
        precio: 129.99,
        deporte: "baloncesto",
        categoria: "zapatillas",
        tallas: ["40", "41", "42", "43", "44", "45", "46"],
        stock: 7,
        imagen: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&q=80",
        badge: "-10%"
    },
    {
        id: 20,
        nombre: "Camiseta Primera Equipación España 26",
        descripcion: "Camiseta oficial de la selección española para el Mundial 2026. Tecnología Aeroready, escudo bordado y nombre personalizable.",
        precio: 109.99,
        deporte: "futbol",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 50,
        imagen: "https://resize.sprintercdn.com/o/products/0410865/camisola-espanha-mundial-2026_0410865_00_5_3848300090.jpg",
        badge: "Nuevo"
    }
];

// ——— PAGINACIÓN ———
const PRODUCTOS_POR_PAGINA = 10; // cuántos se muestran al inicio y en cada "Cargar más"
let _paginaActual = 1;          // página interna (se resetea al filtrar)
let _productosActuales = [];    // lista completa filtrada/ordenada vigente

// Reinicia la paginación y devuelve la primera página
function iniciarPaginacion(productos) {
    _productosActuales = productos;
    _paginaActual = 1;
    return _productosActuales.slice(0, PRODUCTOS_POR_PAGINA);
}

// Devuelve la siguiente página y actualiza el puntero
function cargarSiguientePagina() {
    _paginaActual++;
    const inicio = (_paginaActual - 1) * PRODUCTOS_POR_PAGINA;
    const fin    = _paginaActual       * PRODUCTOS_POR_PAGINA;
    return _productosActuales.slice(inicio, fin);
}

// ¿Quedan productos por mostrar?
function hayMasProductos() {
    return _paginaActual * PRODUCTOS_POR_PAGINA < _productosActuales.length;
}

// ——— OBTENER PRODUCTOS ———
// Devuelve productos desde la API o desde mock data
async function fetchProductos(filtros = {}) {
    if (MOCK_MODE) {
        let resultado = [...MOCK_PRODUCTOS];
        if (filtros.deporte && filtros.deporte !== "todos") {
            resultado = resultado.filter(p => p.deporte === filtros.deporte);
        }
        if (filtros.categoria) {
            resultado = resultado.filter(p => p.categoria === filtros.categoria);
        }
        if (filtros.busqueda) {
            const q = filtros.busqueda.toLowerCase();
            resultado = resultado.filter(p =>
                p.nombre.toLowerCase().includes(q) ||
                p.descripcion.toLowerCase().includes(q)
            );
        }
        if (filtros.precioMax) {
            resultado = resultado.filter(p => p.precio <= filtros.precioMax);
        }
        return resultado;
    }

    // ——— CONEXIÓN REAL CON FLASK ———
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

// ——— OBTENER PRODUCTO POR ID ———
async function fetchProductoPorId(id) {
    if (MOCK_MODE) {
        return MOCK_PRODUCTOS.find(p => p.id === parseInt(id)) || null;
    }

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

// ——— CREAR PRODUCTO (admin) ———
async function crearProducto(datos) {
    try {
        const res = await fetch(`${API_BASE_URL}/productos`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(datos)
        });
        return await res.json();
    } catch (err) {
        console.error("Error crearProducto:", err);
        return null;
    }
}

// ——— EDITAR PRODUCTO (admin) ———
async function editarProducto(id, datos) {
    try {
        const res = await fetch(`${API_BASE_URL}/productos/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(datos)
        });
        return await res.json();
    } catch (err) {
        console.error("Error editarProducto:", err);
        return null;
    }
}

// ——— ELIMINAR PRODUCTO (admin) ———
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

// ——— RENDERIZAR TARJETA DE PRODUCTO ———
function renderizarTarjeta(producto) {
    return `
        <div class="product-card" onclick="location.href='producto.html?id=${producto.id}'">
            <div class="product-card-img">
                ${producto.imagen
                    ? `<img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">`
                    : `<span style="font-size:4rem">👕</span>`
                }
                ${producto.badge ? `<span class="product-badge">${producto.badge}</span>` : ""}
            </div>
            <div class="product-card-body">
                <p class="product-card-sport">${producto.deporte}</p>
                <h3 class="product-card-name">${producto.nombre}</h3>
                <p class="product-card-sub">${producto.descripcion.substring(0, 60)}...</p>
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

// ——— AÑADIR AL CARRITO ———
function agregarAlCarrito(idProducto) {
    const producto = MOCK_MODE
        ? MOCK_PRODUCTOS.find(p => p.id === idProducto)
        : null; // cuando haya API real, buscar por fetch

    if (!producto) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p => p.id === idProducto);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();

    // Feedback visual al botón
    const btns = document.querySelectorAll(`[onclick*="agregarAlCarrito(${idProducto})"]`);
    btns.forEach(btn => {
        btn.textContent = "✓ Añadido";
        btn.style.background = "#44ff88";
        btn.style.color = "#000";
        setTimeout(() => {
            btn.textContent = "+ Carrito";
            btn.style.background = "";
            btn.style.color = "";
        }, 1500);
    });
}