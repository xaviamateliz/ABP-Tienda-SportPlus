from flask import Blueprint, request, jsonify
from app.services.categoria_service import CategoriaService

categoria_controller = Blueprint('categoria_controller', __name__)
categoria_service = CategoriaService()

@categoria_controller.route('/api/categorias', methods=['GET'])
def get_categorias():
    return jsonify(categoria_service.listar_categorias())

@categoria_controller.route('/api/categorias', methods=['POST'])
def post_categoria():
    datos = request.get_json()
    nueva_categoria = categoria_service.crear_categoria(datos)
    return jsonify(nueva_categoria), 201