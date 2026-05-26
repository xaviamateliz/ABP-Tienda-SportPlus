from app.model.entidades import db, Deporte

class DeporteRepository:
    def obtener_todos(self):
        return Deporte.query.all()

    def obtener_por_id(self, deporte_id):
        return Deporte.query.get(deporte_id)

    def guardar(self, deporte):
        db.session.add(deporte)
        db.session.commit()
        return deporte

    def eliminar(self, deporte):
        db.session.delete(deporte)
        db.session.commit()