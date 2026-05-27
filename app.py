# -*- coding: utf-8 -*-
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
 
# Importamos Config desde la ruta correcta de vuestras carpetas
from app.config.config import Config
 
# La variable app contendrá toda la lógica, configuraciones y control.
app = Flask(__name__)
 
CORS(app)
# Carga masiva desde la clase Config
app.config.from_object(Config)
 
# Conectamos el swagger con la explicación + ejemplos de todos los endpoints.
app.config['SWAGGER'] = {
    'openapi': '3.0.0',
    'uiversion': 3
}
 
# Abre el archivo api_spec.yml
with open('api_spec.yml', 'r', encoding='utf-8') as f:
    template = yaml.safe_load(f)
 
# Vinculamos bd con la app 
db.init_app(app)
 
# Arrancamos Swagger
swagger = Swagger(app, template=template)
 
# Registramos los controladores (Blueprints de la API)
app.register_blueprint(producto_controller)
app.register_blueprint(categoria_controller)
app.register_blueprint(usuario_controller)
app.register_blueprint(pedido_controller)
app.register_blueprint(rol_controller)
 
# Crea la estructura de la bd al arrancar
with app.app_context():
    db.create_all()
 
# --- RUTAS PARA QUE TUS COMPAÑEROS VEAN EL FRONTEND DESDE NG ROK ---
@app.route('/')
def servir_index():
    from flask import send_from_directory
    return send_from_directory('/var/www/html/frontend', 'index.html')
 
@app.route('/<path:path>')
def servir_estaticos(path):
    from flask import send_from_directory
    return send_from_directory('/var/www/html/frontend', path)
# -----------------------------------------------------------------
 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)