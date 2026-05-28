import pytest
from unittest.mock import MagicMock
from app.services.rol_service import RolService
from app.model.entidades import Rol


# Preparamos el entorno
@pytest.fixture
def mock_repository(mocker):
    # Crea un objeto completamente vacío y manipulable que actuará como nuestra bd falsa.
    mock_repo = MagicMock()
    # Intercepta cualquier intento de crear un RolRepository dentro de rol_service y lo obliga a usar nuestro mock_repo falso en su lugar.
    mocker.patch('app.services.rol_service.RolRepository', return_value=mock_repo)
    return mock_repo

def test_listar_roles_vacio(mock_repository):
    mock_repository.obtener_todos.return_value = []
    servicio = RolService()
    
    resultado = servicio.listar_roles()
    
    assert resultado == []
    mock_repository.obtener_todos.assert_called_once()

def test_crear_rol_exitoso(mock_repository):
    rol_mock = Rol(rol_id=1, nombre_rol="ADMIN")
    mock_repository.crear.return_value = rol_mock
    servicio = RolService()
    
    resultado = servicio.crear_rol({"nombre": "ADMIN"})
    
    assert resultado == {"id": 1, "nombre": "ADMIN"}
    mock_repository.crear.assert_called_once()