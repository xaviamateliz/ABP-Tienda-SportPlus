import yaml
from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from app.model.entidades import db, Categoria, Producto, Usuario, Pedido, LineaPedido, Rol
from app.controllers.producto_controller import producto_controller
from app.controllers.categoria_controller import categoria_controller
from app.controllers.usuario_controller import usuario_controller
from app.controllers.pedido_controller import pedido_controller
from app.controllers.rol_controller import rol_controller
from app.config import Config

# La variable app contendrá toda la lógica, configuraciones y control.
app = Flask(__name__)
# Carga de manera masiva todas las variables definidas dentro de la clase Config directamente en el diccionario interno de configuraciones de Flask.
app.config.from_object(Config)

CORS(app, resources={r"/api/*": {"origins": app.config['ALLOWED_ORIGINS']}})

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
# Indicamos que cualquier endpoint que comience por /api/ solo aceptará llamadas HTTP que provengan explícitamente de las URLs que esten guardadas en el array ALLOWED_ORIGINS del archivo config.
app.register_blueprint(producto_controller)
app.register_blueprint(categoria_controller)
app.register_blueprint(usuario_controller)
app.register_blueprint(pedido_controller)
app.register_blueprint(rol_controller)

# Crea la estructura de la bd al arrancar app.py, no sobrescribe ni modifica ninguna tabla, solo ejecuta el comando CREATE si no existe una tabla.
with app.app_context():
    db.create_all()
# Comprueba si se esta ejecutando el archivo app.py directamente desde la terminal. Si es así, arranca el servidor web local escuchando en el puerto 5000.
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)