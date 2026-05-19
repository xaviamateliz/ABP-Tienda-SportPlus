import yaml
from flask import Flask
from flasgger import Swagger
from app.model.entidades import db, Categoria, Producto, Usuario, Pedido, LineaPedido, Rol
from app.controllers.producto_controller import producto_controller
from app.controllers.categoria_controller import categoria_controller
from app.controllers.usuario_controller import usuario_controller
from app.controllers.pedido_controller import pedido_controller

app = Flask(__name__)

# Conectamos la bd con nuestra app.
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/tienda_abp'
# Desactivamos un sistema de notificaciones interno de SQLAlchemy que no necesitamos y consume recursos.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Conectamos el swagger con la explicación + ejemplos de todos los endpoints.
app.config['SWAGGER'] = {
    'openapi': '3.0.0',
    'uiversion': 3
}
# Abre el archivo api_spec.yml en modo lectura y lo cierra automaticamente al terminar.
with open('api_spec.yml', 'r', encoding='utf-8') as f:
    template = yaml.safe_load(f) # guarda el contenido del archivo yaml en template y lo traduce al lenguaje nativo de python.

# Vinculamos bd con la app 
db.init_app(app)
# Arrancamos la extensión de Swagger en el servidor de Flask y le pasa el diccionario template.
swagger = Swagger(app, template=template)

app.register_blueprint(producto_controller)
app.register_blueprint(categoria_controller)
app.register_blueprint(usuario_controller)
app.register_blueprint(pedido_controller)

# Crea la estructura de la bd al arrancar app.py, no sobrescribe ni modifica ninguna tabla, solo ejecuta el comando CREATE si no existe una tabla con ese nombre.
with app.app_context():
    db.create_all()
# Asegura que el servidor web solo se encienda si estás ejecutando este archivo directamente
if __name__ == '__main__':
    app.run(debug=True)