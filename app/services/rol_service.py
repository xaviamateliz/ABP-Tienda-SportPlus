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
        nuevo_rol = Rol(nombre=datos.get('nombre'))
        rol_creado = self.rol_repository.crear(nuevo_rol)
        return {"id": rol_creado.id, "nombre": rol_creado.nombre}

    def eliminar_rol(self, rol_id):
        rol = self.rol_repository.obtener_por_id(rol_id)
        if rol:
            self.rol_repository.eliminar(rol)
            return True
        return False