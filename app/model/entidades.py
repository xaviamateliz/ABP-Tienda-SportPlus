from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# Este archivo crea las tablas y relaciones de la bd.
db = SQLAlchemy()
# La variable bd ahora contiene nuestra base de datos y cuando hagamos referencia a esta en el cÃ³digo lo haremos usando siempre esta variable.
 
 
class Rol(db.Model):
    __tablename__ = 'Roles'
 
    rol_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    nombre_rol = db.Column(db.String(50), nullable=False)
 
    usuarios = db.relationship('Usuario', backref='rol', lazy=True)
 
class Deporte(db.Model):
    __tablename__ = 'deportes'
    categoria_id = db.Column(db.SmallInteger, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
 
class TipoProducto(db.Model):
    __tablename__ = 'tipos_producto'
    id_tipo_producto = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
 
class Producto(db.Model):
    __tablename__ = 'productos'
    producto_id = db.Column(db.SmallInteger, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.Text)
    precio = db.Column(db.Numeric(18, 2), nullable=False)
    stock = db.Column(db.SmallInteger, nullable=False)
    categoria_id = db.Column(db.SmallInteger, db.ForeignKey('deportes.categoria_id'))
    id_tipo_producto = db.Column(db.Integer, db.ForeignKey('tipos_producto.id_tipo_producto'))
    url_producto = db.Column(db.String(255))
    categoria = db.relationship('Deporte', foreign_keys=[categoria_id], lazy=True)
    tipo_producto = db.relationship('TipoProducto', foreign_keys=[id_tipo_producto], lazy=True)
 
class Usuario(db.Model):
    __tablename__ = 'usuarios'
 
    usuario_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    login = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    fecha_alta = db.Column(db.DateTime, default=datetime.utcnow, nullable=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    dni = db.Column(db.String(15), nullable=False)
    direccion = db.Column(db.Text, nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    poblacion = db.Column(db.String(50), nullable=False)
    provincia = db.Column(db.String(50), nullable=False)
    codigo_postal = db.Column(db.SmallInteger, nullable=False)
    rol_id = db.Column(db.SmallInteger, db.ForeignKey('Roles.rol_id', ondelete='NO ACTION', onupdate='NO ACTION'), nullable=True)
 
    pedidos = db.relationship('Pedido', backref='usuario', lazy=True)
 
class Pedido(db.Model):
    __tablename__ = 'pedidos'
 
    pedido_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    usuario_id = db.Column(db.SmallInteger, db.ForeignKey('usuarios.usuario_id', ondelete='RESTRICT', onupdate='RESTRICT'), nullable=False)
    fecha_pedido = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    total = db.Column(db.Numeric(18, 2), nullable=False)
    direccion_envio = db.Column(db.String(255), nullable=False)
    poblacion_envio = db.Column(db.String(20), nullable=False)
    provincia_envio = db.Column(db.String(20), nullable=False)
    codigo_postal_envio = db.Column(db.String(10), nullable=False)
    estado_pagado = db.Column(db.Boolean, nullable=False)
 
    lineas_pedido = db.relationship('LineaPedido', backref='pedido', lazy=True)
 
class LineaPedido(db.Model):
    __tablename__ = 'lineas_pedido'
 
    producto_id = db.Column(db.SmallInteger, db.ForeignKey('productos.producto_id', ondelete='NO ACTION', onupdate='NO ACTION'), primary_key=True)
    pedido_id = db.Column(db.SmallInteger, db.ForeignKey('pedidos.pedido_id', ondelete='NO ACTION', onupdate='NO ACTION'), primary_key=True)
    cantidad = db.Column(db.SmallInteger, nullable=False)
    lineas_pedido_id = db.Column(db.SmallInteger, nullable=False)
    precio_linea_pedido = db.Column(db.Numeric(18, 2), nullable=False)