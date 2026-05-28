from app.model.entidades import db, Pedido
 
class PedidoRepository:
    def obtener_todos(self):
        return Pedido.query.all()
 
    def obtener_por_id(self, pedido_id):
        return db.session.get(Pedido, pedido_id)
 
    def guardar(self, pedido):
        db.session.add(pedido)
        db.session.commit()
        return pedido