from app.repositories.producto_repository import ProductoRepository
from app.dtos.producto_dto import ProductoDTO
from app.model.entidades import Producto

class ProductoService:
    def __init__(self):
        self.repository = ProductoRepository()

    def listar_productos(self):
        productos = self.repository.obtener_todos()
        return [ProductoDTO.to_json(p) for p in productos]

    def obtener_producto(self, producto_id):
        producto = self.repository.obtener_por_id(producto_id)
        if producto:
            return ProductoDTO.to_json(producto)
        return None

    def crear_producto(self, datos):
        datos_procesados = ProductoDTO.from_json(datos)
        nuevo_producto = Producto(
            nombre=datos_procesados.get("nombre"),
            descripcion=datos_procesados.get("descripcion"),
            precio=datos_procesados.get("precio"),
            stock=datos_procesados.get("stock"),
            categoria_id=datos_procesados.get("categoria_id")
        )
        producto_guardado = self.repository.guardar(nuevo_producto)
        return ProductoDTO.to_json(producto_guardado)

    def actualizar_producto(self, producto_id, datos):
        producto = self.repository.obtener_por_id(producto_id)
        if not producto:
            return None
        datos_procesados = ProductoDTO.from_json(datos)
        producto.nombre = datos_procesados.get("nombre", producto.nombre)
        producto.descripcion = datos_procesados.get("descripcion", producto.descripcion)
        producto.precio = datos_procesados.get("precio", producto.precio)
        producto.stock = datos_procesados.get("stock", producto.stock)
        producto.categoria_id = datos_procesados.get("categoria_id", producto.categoria_id)
        producto_actualizado = self.repository.guardar(producto)
        return ProductoDTO.to_json(producto_actualizado)

    def eliminar_producto(self, producto_id):
        producto = self.repository.obtener_por_id(producto_id)
        if producto:
            self.repository.eliminar(producto)
            return True
        return False