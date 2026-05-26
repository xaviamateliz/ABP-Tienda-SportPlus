class RolDTO:
    def to_json(rol):
        return {
            "id": rol.rol_id,
            "nombre": rol.nombre_rol
        }