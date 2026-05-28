from app.services.producto_service import ProductoService

def test_limpieza_url_producto():
    servicio = ProductoService()
    url_sucia = '  "https://mi-imagen.com/foto.png"%22  '
    
    url_limpia = servicio.limpiar_url(url_sucia)
    
    assert url_limpia == "https://mi-imagen.com/foto.png"

def test_url_producto_vacia_asigna_por_defecto():
    servicio = ProductoService()
    
    resultado_nulo = servicio.limpiar_url(None)
    # Simulamos qué pasa si el frontend envía un campo vacío o que al limpiarse se queda en nada.
    resultado_vacio = servicio.limpiar_url('   ""   ')
    
    assert resultado_nulo == "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500"
    assert resultado_vacio == "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500"