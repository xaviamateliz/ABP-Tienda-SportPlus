from flask import Blueprint, request, jsonify
from app.services.rol_service import RolService
 
rol_controller = Blueprint('rol_controller', __name__)
rol_service = RolService()
 
@rol_controller.route('/api/roles', methods=['GET'])
def get_roles():
    return jsonify(rol_service.listar_roles())
 
@rol_controller.route('/api/roles/<int:rol_id>', methods=['GET'])
def get_rol(rol_id):
    rol = rol_service.obtener_rol(rol_id)
    if rol:
        return jsonify(rol)
    return jsonify({"error": "Rol no encontrado"}), 404
 
@rol_controller.route('/api/roles', methods=['POST'])
def post_rol():
    datos = request.get_json()
    nuevo_rol = rol_service.crear_rol(datos)
    return jsonify(nuevo_rol), 201
 
@rol_controller.route('/api/roles/<int:rol_id>', methods=['DELETE'])
def delete_rol(rol_id):
    eliminado = rol_service.eliminar_rol(rol_id)
    if eliminado:
        return '', 204
    return jsonify({"error": "Rol no encontrado"}), 404