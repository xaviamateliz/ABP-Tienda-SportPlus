from app.repositories.deporte_repository import DeporteRepository
from app.dtos.deporte_dto import DeporteDTO
from app.model.entidades import Deporte
 
class DeporteService:
    def __init__(self):
        self.repository = DeporteRepository()
 
    def listar_deportes(self):
        deportes = self.repository.obtener_todos()
        return [DeporteDTO.to_json(d) for d in deportes]
 
    def obtener_deporte(self, deporte_id):
        deporte = self.repository.obtener_por_id(deporte_id)
        if deporte:
            return DeporteDTO.to_json(deporte)
        return None
 
    def crear_deporte(self, datos):
        datos_procesados = DeporteDTO.from_json(datos)
        nuevo_deporte = Deporte(
            nombre=datos_procesados.get("nombre")
        )
        deporte_guardado = self.repository.guardar(nuevo_deporte)
        return DeporteDTO.to_json(deporte_guardado)