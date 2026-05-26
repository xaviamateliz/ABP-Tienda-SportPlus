from app.dtos.categoria_dto import CategoriaDTO
 
class ProductoDTO:
    
    def to_json(producto):
        return {
            "id": producto.producto_id,
            "nombre": producto.nombre,
            "descripcion": producto.descripcion,
            "precio": float(producto.precio),
            "stock": producto.stock,
            "categoria": CategoriaDTO.to_json(producto.categoria),
            "id_tipo_producto": producto.id_tipo_producto,
            "url_producto": producto.url_producto
        }
 
    
    def from_json(json_data):
        # Capturamos el link de forma segura
        url_recibida = json_data.get("url_producto")
        # Si viene un texto, le quitamos posibles comillas residuales (%22 o ")
        if isinstance(url_recibida, str):
            url_recibida = url_recibida.replace('"', '').replace('%22', '').strip()
        # Si aun así llega vacío o nulo, le ponemos un string vacío o link por defecto
        if not url_recibida:
            url_recibida = "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500"
 
        return {
            "nombre": json_data.get("nombre"),
            "descripcion": json_data.get("descripcion"),
            "precio": json_data.get("precio"),
            "stock": json_data.get("stock"),
            "categoria_id": json_data.get("categoria_id"),
            "id_tipo_producto": json_data.get("id_tipo_producto"),
            "url_producto": url_recibida
        }