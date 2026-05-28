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
 
 
# =================================================================
# NUEVAS RUTAS: TIPOS DE PRODUCTO (Evita el error 405 en Postman)
# =================================================================
 
@producto_controller.route('/api/tipos_producto', methods=['GET'])
def get_tipos_producto():
    try:
        from app.model.entidades import TipoProducto
        tipos = TipoProducto.query.all()
        return jsonify([{"id_tipo_producto": t.id_tipo_producto, "nombre": t.nombre} for t in tipos]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
 
@producto_controller.route('/api/tipos_producto', methods=['POST'])
def post_tipo_producto():
    try:
        from app.model.entidades import db, TipoProducto
        datos = request.get_json()
        if not datos or 'nombre' not in datos:
            return jsonify({"error": "Falta el campo 'nombre' en el JSON"}), 400
        # Inserta el registro directamente en la base de datos de Windows Server
        nuevo_tipo = TipoProducto(nombre=datos['nombre'])
        db.session.add(nuevo_tipo)
        db.session.commit()
        return jsonify({
            "id_tipo_producto": nuevo_tipo.id_tipo_producto,
            "nombre": nuevo_tipo.nombre,
            "mensaje": "Tipo de producto guardado con exito!"
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500