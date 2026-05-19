from app.model.entidades import db, Rol

class RolRepository:
    def obtener_todos(self):
        return Rol.query.all()

    def obtener_por_id(self, rol_id):
        return db.session.get(Rol, rol_id)