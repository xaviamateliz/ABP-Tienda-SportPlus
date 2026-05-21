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
            "url_producto": producto.url_producto
        }

    def from_json(json_data):
        return {
            "nombre": json_data.get("nombre"),
            "descripcion": json_data.get("descripcion"),
            "precio": json_data.get("precio"),
            "stock": json_data.get("stock"),
            "categoria_id": json_data.get("categoria_id"),
            "url_producto": json_data.get("url_producto")
        }