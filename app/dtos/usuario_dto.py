from app.dtos.rol_dto import RolDTO
 
class UsuarioDTO:
    def to_json(usuario):
        return {
            "id": usuario.usuario_id,
            "login": usuario.login,
            "fecha_alta": usuario.fecha_alta.strftime('%Y-%m-%d %H:%M:%S') if usuario.fecha_alta else None,
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
            "dni": usuario.dni,
            "direccion": usuario.direccion,
            "telefono": usuario.telefono,
            "poblacion": usuario.poblacion,
            "provincia": usuario.provincia,
            "codigo_postal": usuario.codigo_postal,
            "rol": RolDTO.to_json(usuario.rol) if usuario.rol else None
        }
 
    def from_json(json_data):
        return {
            "login": json_data.get("login"),
            "password": json_data.get("password"),
            "nombre": json_data.get("nombre"),
            "apellido": json_data.get("apellido"),
            "dni": json_data.get("dni"),
            "direccion": json_data.get("direccion"),
            "telefono": json_data.get("telefono"),
            "poblacion": json_data.get("poblacion"),
            "provincia": json_data.get("provincia"),
            "codigo_postal": json_data.get("codigo_postal"),
            "rol_id": json_data.get("rol_id")
        }