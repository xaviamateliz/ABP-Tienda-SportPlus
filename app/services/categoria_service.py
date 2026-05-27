from app.repositories.categoria_repository import CategoriaRepository
from app.dtos.categoria_dto import CategoriaDTO
from app.model.entidades import Categoria

class CategoriaService:
    def __init__(self):
        self.repository = CategoriaRepository()

    def listar_categorias(self):
        categorias = self.repository.obtener_todos()
        return [CategoriaDTO.to_json(c) for c in categorias]

    def crear_categoria(self, datos):
        datos_procesados = CategoriaDTO.from_json(datos)
        nueva_categoria = Categoria(nombre=datos_procesados.get("nombre"))
        categoria_guardada = self.repository.guardar(nueva_categoria)
        return CategoriaDTO.to_json(categoria_guardada)