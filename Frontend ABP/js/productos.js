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
        imagen: "https://cdn.deporvillage.com/cdn-cgi/image/h=960,w=768,dpr=1,f=auto,q=75,fit=contain,background=white/product-vertical/ONR-3MF30741057-101_001.jpg",
        badge: null
    },
    {
        id: 5,
        nombre: "Jordan Camiseta Swingman NBA LA Lakers James #23",
        descripcion: "Estilo icónico y máximo rendimiento. Esta camiseta de los LA Lakers (#23) cuenta con tejido mesh de alta ventilación y un ajuste relajado para ofrecerte comodidad y frescura durante todo el día.",
        precio: 104.99,
        deporte: "baloncesto",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL"],
        stock: 30,
        imagen: "https://i8.amplience.net/i/jpl/jd_697435_a?qlt=92&w=600&h=765&v=1&fmt=auto",
        badge: "Nuevo"
    },
    {
        id: 6,
        nombre: "Mallas de hombre Own the Run adidas",
        descripcion: "Mantén el ritmo con las mallas Own the Run. Su diseño técnico te ofrece una ventilación óptima y la elasticidad necesaria para moverte sin restricciones, asegurando el máximo confort de principio a fin.",
        precio: 45.49,
        deporte: "running",
        categoria: "pantalones",
        tallas: ["XS", "S", "M", "L", "XL"],
        stock: 20,
        imagen: "https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202311/29/00132422701857____3__1200x1200.jpg",
        badge: null
    },
    {
        id: 7,
        nombre: "Cortavientos Nike Inter Milán WindRunner",
        descripcion: "Estilo nerazzurro para los días de lluvia y viento. Este cortavientos del Inter de Milán combina el icónico diseño Windrunner de Nike con un tejido ligero y resistente que te protege del clima mientras luces con orgullo el escudo de tu equipo.",
        precio: 53.99,
        deporte: "futbol",
        categoria: "chaquetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 12,
        imagen: "https://media.futbolmania.com/media/catalog/product/cache/1/image/0f330055bc18e2dda592b4a7c3a0ea22/F/Q/FQ3185-010_chaqueta-invierno-color-negro-nike-inter-windrunner-_1_completa-frontal.jpg",
        badge: null
    },
    {
        id: 8,
        nombre: "Camiseta Tenis de Hombre MATCH JACQUARD SS TOP Asics",
        descripcion: "Juega sin restricciones. El tejido jacquard de esta camiseta Asics absorbe el sudor rápidamente y ofrece una ventilación superior, garantizando total libertad de movimiento en la línea de fondo o en la red.",
        precio: 50.00,
        deporte: "tenis",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL"],
        stock: 18,
        imagen: "https://dam.elcorteingles.es/producto/www-001008471707904-00.jpg",
        badge: "-15%"
    },
    {
        id: 9,
        nombre: "Pantalón corto Nike FC Barcelona Primera Equipación 2025-2026",
        descripcion: "Siente los colores de tu equipo con el pantalón de la primera equipación del FC Barcelona. Fabricado con tejido técnico transpirable de Nike, mantiene la frescura y la comodidad tanto en el terreno de juego como en la grada.",
        precio: 44.99,
        deporte: "futbol",
        categoria: "pantalones",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 35,
        imagen: "https://www.futbolemotion.com/imagesarticulos/269507/medianas/pantalon-corto-nike-fc-barcelona-primera-equipacion-2025-2026-deep-royal-blue-0.webp",
        badge: null
    },
    {
        id: 10,
        nombre: "NikeCourt Lite 4",
        descripcion: "Durabilidad y ligereza para tus partidos. Las NikeCourt Lite 4 ofrecen una amortiguación suave en la planta del pie y una suela resistente de gran tracción, ideal para moverte con total seguridad en toda la pista.",
        precio: 74.99,
        deporte: "tenis",
        categoria: "zapatillas",
        tallas: ["38", "39", "40", "41", "42", "43", "44"],
        stock: 10,
        imagen: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/05eb140f-7ab0-47ec-b9c7-06329923b235/M+NIKE+COURT+LITE+4.png",
        badge: null
    },
    {
        id: 11,
        nombre: "Arrival T-Shirt",
        descripcion: "Tu aliada perfecta para el gimnasio. Fabricada con materiales ligeros y de secado rápido, evita la humedad para que mantengas la frescura desde el calentamiento hasta el último levantamiento.",
        precio: 20.00,
        deporte: "gym",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 50,
        imagen: "https://cdn.shopify.com/s/files/1/1367/5201/files/images-ArrivalT_ShirtBlackA2A1K_BBBB_0519_1664x.jpg?v=1776675408",
        badge: null
    },
    {
        id: 12,
        nombre: "Chaqueta deportiva de entrenamiento con cremallera integral para hombre de MP",
        descripcion: "La capa perfecta para tus entrenamientos y calentamientos. Esta chaqueta de MP cuenta con cremallera integral, un tejido técnico elástico que acompaña tus movimientos y un ajuste atlético ideal para rendir al máximo en el gimnasio",
        precio: 24.99,
        deporte: "gym",
        categoria: "chaquetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 22,
        imagen: "https://www.myprotein.es/images?url=https://static.thcdn.com/productimg/original/15206345-7275172943495014.jpg&format=webp&auto=avif",
        badge: "-10%"
    },
    {
        id: 13,
        nombre: "LA SPORTIVA JACKAL II ZAPATILLA TRAIL RUNNING MUJER STORM BLUE LAGOON",
        descripcion: "Conquista cualquier sendero con total confianza. Esta zapatilla de trail running para mujer destaca por su ligereza, una ventilación óptima y una suela de gran agarre que se adapta perfectamente a superficies rocosas, mojadas o irregulares.",
        precio: 129.99,
        deporte: "running",
        categoria: "zapatillas",
        tallas: ["38", "39", "40", "41", "42", "43", "44", "45", "46"],
        stock: 6,
        imagen: "https://lacasadeltrailrunning.com/wp-content/uploads/2023/07/La-Sportiva-Jackal-II-Zapatilla-Trail-Running-Mujer-Storm-Blue-Lagoon-La-Casa-Del-Trail-Running-3.png",
        badge: "Nuevo"
    },
    {
        id: 14,
        nombre: "Nike NBA Los Angeles Lakers",
        descripcion: "Lleva la pasión del Staples Center a cualquier parte. Esta prenda de Nike combina la identidad icónica de los LA Lakers con un tejido técnico ultra transpirable, ideal para lucir un estilo urbano impecable o animar al equipo en cada partido",
        precio: 69.99,
        deporte: "baloncesto",
        categoria: "pantalones",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 18,
        imagen: "https://resize.sprintercdn.com/b/1504x2256/products/0343961/nike-los_0343961_00_5_2077667261.jpg?w=1504&q=75",
        badge: null
    },
    {
        id: 15,
        nombre: "On Running Sudadera con capucha Tech",
        descripcion: "Protección ligera y un ajuste perfecto. Su capucha ergonómica se mantiene firmemente en su lugar mientras corres o entrenas, mientras que su tejido ultrasuave garantiza el máximo confort térmico sin añadir peso.",
        precio: 150.00,
        deporte: "running",
        categoria: "sudaderas",
        tallas: ["S", "M", "L", "XL"],
        stock: 14,
        imagen: "https://i8.amplience.net/i/jpl/jd_759360_a?qlt=92&w=600&h=765&v=1&fmt=auto",
        badge: null
    },
    {
        id: 16,
        nombre: "Camiseta Fútbol Primera Equipación Portero Hombre 24/25",
        descripcion: "Camiseta de portero con acolchado en codos y mangas largas. Tejido resistente a la abrasión y colores de alto contraste.",
        precio: 34.98,
        deporte: "futbol",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 20,
        imagen: "https://shop.realbetisbalompie.es/cdn/shop/files/5715454794607_02.jpg?v=1740996580&width=640",
        badge: "50%"
    },
    {
        id: 17,
        nombre: "Leggings Mujer Leggins Gym Yoga Deporte Pantalones Mallas con Bolsillos Camuflaje",
        descripcion: "Entrena con total confianza y libertad de movimiento. Fabricados con un tejido técnico ultra elástico y transpirable, estas mallas deportivas absorben el sudor rápidamente y se adaptan a cada postura sin transparentar nada.",
        precio: 52.99,
        deporte: "gym",
        categoria: "pantalones",
        tallas: ["XS", "S", "M", "L", "XL"],
        stock: 28,
        imagen: "https://m.media-amazon.com/images/I/91WsZ3+oYHL._AC_SY741_.jpg",
        badge: "Nuevo"
    },
    {
        id: 18,
        nombre: "Columbia Chaqueta Puffer Pike Lake II",
        descripcion: "Protección total contra el frío invernal. Esta chaqueta puffer cuenta con el avanzado forro térmico reflectante de Columbia y un aislamiento de plumón sintético, manteniendo tu calor corporal al máximo durante tus aventuras al aire libre o en la ciudad.",
        precio: 179.99,
        deporte: "running",
        categoria: "chaquetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 9,
        imagen: "https://i8.amplience.net/i/jpl/jd_711994_a?qlt=92&w=750&h=957&v=1&fmt=auto",
        badge: null
    },
    {
        id: 19,
        nombre: "Zapatillas de Baloncesto de hombre Book 2 Se Nike",
        descripcion: "Domina la cancha con el estilo de un All-Star. Estas zapatillas cuentan con una suela de máxima tracción ideal para cortes rápidos y un ajuste firme que sujeta el pie, garantizando total comodidad y seguridad en los momentos más intensos del partido.",
        precio: 149.99,
        deporte: "baloncesto",
        categoria: "zapatillas",
        tallas: ["40", "41", "42", "43", "44", "45", "46"],
        stock: 7,
        imagen: "https://dam.elcorteingles.es/producto/www-001017725009678-00.jpg?impolicy=frontWeb&width=900&shape=square",
        badge: "-10%"
    },
    {
        id: 20,
        nombre: "Camiseta Primera Equipación España 26",
        descripcion: "Camiseta oficial de la selección española para el Mundial 2026. Tecnología Aeroready, escudo bordado y nombre personalizable.",
        precio: 99.99,
        deporte: "futbol",
        categoria: "camisetas",
        tallas: ["S", "M", "L", "XL", "XXL"],
        stock: 50,
        imagen: "https://www.futbolemotion.com/imagesarticulos/286278/grandes/camiseta-adidas-espana-primera-equipacion-mundial-2026-red-0.webp",
        badge: "Nuevo"
    }
];

// ——— PAGINACIÓN ———
const PRODUCTOS_POR_PAGINA = 20; // cuántos se muestran al inicio y en cada "Cargar más"
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

// ——— GESTIÓN DEL CARRITO (Unificada) ———
function agregarAlCarrito(idProducto, talla = null) {
    // Detectamos si estamos en la raíz o dentro de la carpeta /pages/
    const esPaginaInterior = window.location.pathname.includes('/pages/');

    // CASO 1: Si NO viene talla, redirigimos a la página de detalle para que la elija
    if (!talla) {
        const rutaProducto = esPaginaInterior 
            ? `producto.html?id=${idProducto}` 
            : `pages/producto.html?id=${idProducto}`;
        window.location.href = rutaProducto;
        return; // Cortamos la ejecución aquí
    }
    // CASO 2: Si SÍ viene talla, lo añadimos directamente al carrito de LocalStorage
    const producto = MOCK_MODE
        ? MOCK_PRODUCTOS.find(p => p.id === idProducto)
        : null; // TODO: Cuando haya API real, meter fetch aquí
    if (!producto) return;
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    // Buscamos si ya existe el mismo producto Y con la misma talla
    const existente = carrito.find(p => p.id === idProducto && p.tallaSeleccionada === talla);
    if (existente) {
        existente.cantidad += 1;
    } else {
        // Guardamos el producto incluyendo la propiedad de la talla elegida
        carrito.push({ ...producto, cantidad: 1, tallaSeleccionada: talla });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    // Actualizamos el número del contador (asegúrate de tener esta función en tu código)
    if (typeof actualizarContadorCarrito === "function") {
        actualizarContadorCarrito();
    } else {
        // Alternativa directa por si acaso
        const badge = document.getElementById('cart-count');
        if (badge) badge.textContent = carrito.length;
    }
    // Feedback visual al botón que se ha pulsado
    const btns = document.querySelectorAll(`[onclick*="agregarAlCarrito(${idProducto}"]`);
    btns.forEach(btn => {
        const textoOriginal = btn.textContent;
        btn.textContent = "✓ Añadido";
        btn.style.background = "#44ff88";
        btn.style.color = "#000";
        setTimeout(() => {
            btn.textContent = textoOriginal;
            btn.style.background = "";
            btn.style.color = "";
        }, 1500);
    });
}

