from flask import Blueprint, request, jsonify
from app.services.deporte_service import DeporteService
 
deporte_controller = Blueprint('deporte_controller', __name__)
deporte_service = DeporteService()
 
@deporte_controller.route('/api/deportes', methods=['GET'])
def listar_deportes():
    deportes = deporte_service.listar_deportes()
    return jsonify(deportes), 200
 
@deporte_controller.route('/api/deportes', methods=['POST'])
def crear_deporte():
    datos = request.get_json()
    nuevo_deporte = deporte_service.crear_deporte(datos)
    return jsonify(nuevo_deporte), 201