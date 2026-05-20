from app.model.entidades import db, Rol

class RolRepository:
    def obtener_todos(self):
        return Rol.query.all()

    def obtener_por_id(self, rol_id):
        return db.session.get(Rol, rol_id)

    def crear(self, rol):
        db.session.add(rol)
        db.session.commit()
        return rol

    def eliminar(self, rol):
        db.session.delete(rol)
        db.session.commit()