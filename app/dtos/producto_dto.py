from app.dtos.producto_dto import ProductoDTO
 
class LineaPedidoDTO:
    def to_json(linea):
        return {
            "lineas_pedido_id": linea.lineas_pedido_id,
            "cantidad": linea.cantidad,
            "precio_linea_producto": float(linea.precio_linea_pedido),
            "producto": ProductoDTO.to_json(linea.producto) if linea.producto else None
        }
 
    def from_json(json_data):
        return {
            "producto_id": json_data.get("producto_id"),
            "cantidad": json_data.get("cantidad"),
            "precio_linea_producto": json_data.get("precio_linea_pedido")
        }
 
class PedidoDTO:
    def to_json(pedido):
        return {
            "id": pedido.pedido_id,
            "usuario_id": pedido.usuario_id,
            "fecha": pedido.fecha_pedido.strftime('%Y-%m-%d %H:%M:%S') if pedido.fecha_pedido else None,
            "total": float(pedido.total),
            "direccion_envio": pedido.direccion_envio,
            "poblacion_envio": pedido.poblacion_envio,
            "provincia_envio": pedido.provincia_envio,
            "codigo_postal_envio": pedido.codigo_postal_envio,
            "estado": pedido.estado_pedido,
            "estado_pagado": pedido.estado_pagado,
            "lineas": [LineaPedidoDTO.to_json(l) for l in pedido.lineas_pedido]
        }
 
    def from_json(json_data):
        return {
            "usuario_id": json_data.get("usuario_id"),
            "direccion_envio": json_data.get("direccion_envio"),
            "poblacion_envio": json_data.get("poblacion_envio"),
            "provincia_envio": json_data.get("provincia_envio"),
            "codigo_postal_envio": json_data.get("codigo_postal_envio"),
            "lineas": json_data.get("lineas", [])
        }
 
git add app/dtos/pedido_dto.py app/services/pedido_service.py app/controllers/pedido_controller.py
git commit -m "fix: pedido_dto precio_unitario a precio_linea_pedido"
git push origin develop