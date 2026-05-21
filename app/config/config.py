import os
 
class Config:
    # URI de conexión apuntando a tu base de datos real (sportplus) en el servidor MySQL
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@192.168.125.139/sportplus'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Dominios permitidos para saltarse los bloqueos de CORS
    ALLOWED_ORIGINS = [
        "https://divisive-utopia-lilly.ngrok-free.dev",
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ]