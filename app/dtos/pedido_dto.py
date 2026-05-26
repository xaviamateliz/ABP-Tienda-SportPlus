from app.dtos.producto_dto import ProductoDTO

class LineaPedidoDTO:
    def to_json(linea):
        return {
            "lineas_pedido_id": linea.lineas_pedido_id,
            "cantidad": linea.cantidad,
            "precio_linea_producto": float(linea.precio_unitario),
            "producto": ProductoDTO.to_json(linea.producto) if linea.producto else None
        }

    def from_json(json_data):
        return {
            "producto_id": json_data.get("producto_id"),
            "cantidad": json_data.get("cantidad"),
            "precio_linea_producto": json_data.get("precio_unitario")
        }

class PedidoDTO:
    def to_json(pedido):
        return {
            "id": pedido.pedido_id,
            "usuario_id": pedido.usuario_id,
            "fecha_pedido": pedido.fecha_pedido.strftime('%Y-%m-%d %H:%M:%S') if pedido.fecha_pedido else None,
            "total": float(pedido.total),
            "direccion_envio": pedido.direccion_envio,
            "poblacion_envio": pedido.poblacion_envio,
            "provincia_envio": pedido.provincia_envio,
            "codigo_postal_envio": pedido.codigo_postal_envio,
            "lineas": [LineaPedidoDTO.to_json(l) for l in pedido.lineas_pedido]
        }