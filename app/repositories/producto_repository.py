from app.model.entidades import db, Usuario, Producto, Deporte, Pedido
 
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
 
class ProductoRepository:
    def obtener_todos(self):
        return Producto.query.all()
 
    def obtener_por_id(self, producto_id):
        return db.session.get(Producto, producto_id)
 
    def guardar(self, producto):
        db.session.add(producto)
        db.session.commit()
        return producto
 
    def eliminar(self, producto):
        db.session.delete(producto)
        db.session.commit()
 
class CategoriaRepository:
    def obtener_todos(self):
        return Categoria.query.all()
 
    def guardar(self, categoria):
        db.session.add(categoria)
        db.session.commit()
        return categoria
 
class PedidoRepository:
    def obtener_todos(self):
        return Pedido.query.all()
 
    def obtener_por_id(self, pedido_id):
        return db.session.get(Pedido, pedido_id)
 
    def guardar(self, pedido):
        db.session.add(pedido)
        db.session.commit()
        return pedido