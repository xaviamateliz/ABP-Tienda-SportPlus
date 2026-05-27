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

    def crear_pedido(self, datos):
        nuevo_pedido = Pedido(
            usuario_id=datos.get("usuario_id"),
            fecha_pedido=datetime.datetime.now(),
            total=0,
            direccion_envio=datos.get("direccion_envio"),
            poblacion_envio=datos.get("poblacion_envio"),
            provincia_envio=datos.get("provincia_envio"),
            codigo_postal_envio=datos.get("codigo_postal_envio")
        )
        
        total_pedido = 0
        lineas = datos.get("lineas", [])
        
        for linea_data in lineas:
            cantidad = linea_data.get("cantidad")
            precio_unitario = linea_data.get("precio_unitario")
            total_pedido += cantidad * precio_unitario
            
            nueva_linea = LineaPedido(
                producto_id=linea_data.get("producto_id"),
                cantidad=cantidad,
                precio_unitario=precio_unitario
            )
            nuevo_pedido.lineas_pedido.append(nueva_linea)
            
        nuevo_pedido.total = total_pedido
        pedido_guardado = self.repository.guardar(nuevo_pedido)
        return PedidoDTO.to_json(pedido_guardado)