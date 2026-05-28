from app.dtos.rol_dto import RolDTO
from app.repositories.rol_repository import RolRepository
from app.model.entidades import Rol
 
class RolService:
    def __init__(self):
        self.rol_repository = RolRepository()
 
    def listar_roles(self):
        roles = self.rol_repository.obtener_todos()
        return [{"id": r.id, "nombre": r.nombre} for r in roles]
 
    def obtener_rol(self, rol_id):
        rol = self.rol_repository.obtener_por_id(rol_id)
        if rol:
            return {"id": rol.id, "nombre": rol.nombre}
        return None
 
    def crear_rol(self, datos):
        nuevo_rol = Rol(nombre_rol=datos.get('nombre'))
        # Usamos rol_repository en lugar de repository
        rol_guardado = self.rol_repository.crear(nuevo_rol) 
        return RolDTO.to_json(rol_guardado)

    def eliminar_rol(self, rol_id):
        # Usamos rol_repository aquí también
        rol = self.rol_repository.obtener_por_id(rol_id)
        if rol:
            self.rol_repository.eliminar(rol)
            return True
        return False