from app.model.entidades import db, Categoria

class CategoriaRepository:
    def obtener_todos(self):
        return Categoria.query.all()

    def obtener_por_id(self, categoria_id):
        return db.session.get(Categoria, categoria_id)

    def guardar(self, categoria):
        db.session.add(categoria)
        db.session.commit()
        return categoria

    def eliminar(self, categoria):
        db.session.delete(categoria)
        db.session.commit()