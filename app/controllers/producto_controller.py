from flask import Blueprint, request, jsonify
from app.services.producto_service import ProductoService

producto_controller = Blueprint('producto_controller', __name__)
producto_service = ProductoService()

@producto_controller.route('/api/productos', methods=['GET'])
def get_productos():
    return jsonify(producto_service.listar_productos())

@producto_controller.route('/api/productos/<int:producto_id>', methods=['GET'])
def get_producto(producto_id):
    producto = producto_service.obtener_producto(producto_id)
    if producto:
        return jsonify(producto)
    return jsonify({"error": "Producto no encontrado"}), 404

@producto_controller.route('/api/productos', methods=['POST'])
def post_producto():
    datos = request.get_json()
    nuevo_producto = producto_service.crear_producto(datos)
    return jsonify(nuevo_producto), 201

@producto_controller.route('/api/productos/<int:producto_id>', methods=['PUT'])
def put_producto(producto_id):
    datos = request.get_json()
    producto_actualizado = producto_service.actualizar_producto(producto_id, datos)
    if producto_actualizado:
        return jsonify(producto_actualizado)
    return jsonify({"error": "Producto no encontrado"}), 404

@producto_controller.route('/api/productos/<int:producto_id>', methods=['DELETE'])
def delete_producto(producto_id):
    eliminado = producto_service.eliminar_producto(producto_id)
    if eliminado:
        return '', 204
    return jsonify({"error": "Producto no encontrado"}), 404