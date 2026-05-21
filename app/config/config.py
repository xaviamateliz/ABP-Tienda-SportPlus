import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root@localhost/tienda_abp'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ALLOWED_ORIGINS = [
        "https://divisive-utopia-lilly.ngrok-free.dev",
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ]