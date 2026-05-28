class DeporteDTO:
    @staticmethod
    def to_json(deporte):
        return {
            "categoria_id": deporte.categoria_id,
            "nombre": deporte.nombre
        }
 
    @staticmethod
    def from_json(datos):
        return datos