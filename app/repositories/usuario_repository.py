from app.model.entidades import db, Usuario
 
class UsuarioRepository:
    def obtener_todos(self):
        return Usuario.query.all()
 
    def obtener_por_id(self, usuario_id):
        return db.session.get(Usuario, usuario_id)
 
    def obtener_por_login(self, login):
        return Usuario.query.filter_by(login=login).first()
 
    def guardar(self, usuario):
        db.session.add(usuario)
        db.session.commit()
        return usuario
 
    def eliminar(self, usuario):
        db.session.delete(usuario)
        db.session.commit()