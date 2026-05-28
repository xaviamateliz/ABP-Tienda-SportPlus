from flask import Blueprint, request, jsonify
from app.services.usuario_service import UsuarioService
 
usuario_controller = Blueprint('usuario_controller', __name__)
usuario_service = UsuarioService()
 
@usuario_controller.route('/api/usuarios', methods=['GET'])
def get_usuarios():
    return jsonify(usuario_service.listar_usuarios())
 
@usuario_controller.route('/api/usuarios/<int:usuario_id>', methods=['GET'])
def get_usuario(usuario_id):
    usuario = usuario_service.obtener_usuario(usuario_id)
    if usuario:
        return jsonify(usuario)
    return jsonify({"error": "Usuario no encontrado"}), 404
 
@usuario_controller.route('/api/usuarios', methods=['POST'])
def post_usuario():
    datos = request.get_json()
    nuevo_usuario = usuario_service.crear_usuario(datos)
    return jsonify(nuevo_usuario), 201
 
@usuario_controller.route('/api/auth/login', methods=['POST'])
def post_login():
    datos = request.get_json()
    usuario = usuario_service.login(datos.get("login"), datos.get("password"))
    if usuario:
        return jsonify({"mensaje": "Login correcto", "usuario": usuario}), 200
    return jsonify({"error": "Credenciales incorrectas"}), 401

@usuario_controller.route('/api/usuarios/<int:usuario_id>', methods=['PUT'])
def actualizar_usuario(usuario_id):
    datos = request.get_json()
    resultado = usuario_service.actualizar_usuario(usuario_id, datos)
    if not resultado:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(resultado), 200