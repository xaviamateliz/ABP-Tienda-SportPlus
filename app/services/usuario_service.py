from app.repositories.usuario_repository import UsuarioRepository
from app.dtos.usuario_dto import UsuarioDTO
from app.model.entidades import Usuario

class UsuarioService:
    def __init__(self):
        self.repository = UsuarioRepository()

    def listar_usuarios(self):
        usuarios = self.repository.obtener_todos()
        return [UsuarioDTO.to_json(u) for u in usuarios]

    def obtener_usuario(self, usuario_id):
        usuario = self.repository.obtener_por_id(usuario_id)
        if usuario:
            return UsuarioDTO.to_json(usuario)
        return None

    def crear_usuario(self, datos):
        datos_procesados = UsuarioDTO.from_json(datos)
        nuevo_usuario = Usuario(
            login=datos_procesados.get("login"),
            password=datos_procesados.get("password"),
            nombre=datos_procesados.get("nombre"),
            apellido=datos_procesados.get("apellido"),
            dni=datos_procesados.get("dni"),
            direccion=datos_procesados.get("direccion"),
            telefono=datos_procesados.get("telefono"),
            poblacion=datos_procesados.get("poblacion"),
            provincia=datos_procesados.get("provincia"),
            codigo_postal=datos_procesados.get("codigo_postal"),
            rol_id=datos_procesados.get("rol_id")
        )
        usuario_guardado = self.repository.guardar(nuevo_usuario)
        return UsuarioDTO.to_json(usuario_guardado)

    def login(self, login, password):
        usuario = self.repository.obtener_por_login(login)
        if usuario and usuario.password == password:
            return UsuarioDTO.to_json(usuario)
        return None