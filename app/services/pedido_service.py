from app.repositories.pedido_repository import PedidoRepository
from app.dtos.pedido_dto import PedidoDTO
from app.model.entidades import Pedido, LineaPedido
import datetime
class PedidoService:
    def __init__(self):
        self.repository = PedidoRepository()
    def listar_pedidos(self):
        pedidos = self.repository.obtener_todos()
        return [PedidoDTO.to_json(p) for p in pedidos]
    def obtener_pedido(self, pedido_id):
        pedido = self.repository.obtener_por_id(pedido_id)
        if pedido:
            return PedidoDTO.to_json(pedido)
        return None
    def crear_pedido(self, datos, usuario_id):
        from app.model.entidades import db, Usuario, Producto
        usuario = db.session.get(Usuario, usuario_id)
        if not usuario:
            return None, "Usuario no encontrado"
        nuevo_pedido = Pedido(
            usuario_id=usuario_id,
            fecha_pedido=datetime.datetime.now(),
            total=0,
            direccion_envio=datos.get("direccion_envio") or usuario.direccion or "Sin direccion",
            poblacion_envio=datos.get("poblacion_envio") or usuario.poblacion or "Sin poblacion",
            provincia_envio=datos.get("provincia_envio") or usuario.provincia or "Sin provincia",
            codigo_postal_envio=datos.get("codigo_postal_envio") or str(usuario.codigo_postal) or "00000",
            estado_pagado=True
        )
        total_pedido = 0
        lineas = datos.get("lineas", [])
        for linea_data in lineas:
            cantidad = int(linea_data.get("cantidad", 1))
            precio = float(linea_data.get("precio") or linea_data.get("precio_unitario") or 0)
            total_pedido += cantidad * precio
            producto = db.session.get(Producto, linea_data.get("producto_id"))
            if not producto:
                return None, f"Producto {linea_data.get('producto_id')} no encontrado"
            if producto.stock < cantidad:
                return None, f"Stock insuficiente para '{producto.nombre}' (disponible: {producto.stock})"
            producto.stock -= cantidad
            nueva_linea = LineaPedido(
                producto_id=linea_data.get("producto_id"),
                cantidad=cantidad,
                precio_linea_pedido=precio,
                lineas_pedido_id=0
            )
            nuevo_pedido.lineas_pedido.append(nueva_linea)
        nuevo_pedido.total = total_pedido
        pedido_guardado = self.repository.guardar(nuevo_pedido)
        return PedidoDTO.to_json(pedido_guardado), None
    def actualizar_pedido(self, pedido_id, datos):
        pedido = self.repository.obtener_por_id(pedido_id)
        if not pedido:
            return None
        datos_procesados = PedidoDTO.from_json(datos)
        pedido.estado_pedido = datos.get("estado", pedido.estado_pedido)
        pedido.estado_pagado = pedido.estado_pedido in ("pagado", "entregado")
        pedido_actualizado = self.repository.guardar(pedido)
        return PedidoDTO.to_json(pedido_actualizado)