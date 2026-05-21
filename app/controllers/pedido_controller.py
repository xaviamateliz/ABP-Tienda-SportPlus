from flask import Blueprint, request, jsonify
from app.services.pedido_service import PedidoService

pedido_controller = Blueprint('pedido_controller', __name__)
pedido_service = PedidoService()

@pedido_controller.route('/api/pedidos', methods=['GET'])
def get_pedidos():
    return jsonify(pedido_service.listar_pedidos())

@pedido_controller.route('/api/pedidos/<int:pedido_id>', methods=['GET'])
def get_pedido(pedido_id):
    pedido = pedido_service.obtener_pedido(pedido_id)
    if pedido:
        return jsonify(pedido)
    return jsonify({"error": "Pedido no encontrado"}), 404

@pedido_controller.route('/api/pedidos', methods=['POST'])
def post_pedido():
    datos = request.get_json()
    nuevo_pedido = pedido_service.crear_pedido(datos)
    return jsonify(nuevo_pedido), 201

@pedido_controller.route('/api/pedidos/<int:id>', methods=['PUT'])
def actualizar_pedido(id):
    datos = request.get_json()
    pedido_actualizado = pedido_service.actualizar_pedido(id, datos)
    
    if not pedido_actualizado:
        return jsonify({"error": "El pedido a modificar no existe"}), 404
        
    return jsonify(pedido_actualizado), 200