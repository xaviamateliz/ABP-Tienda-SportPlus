import pytest
from unittest.mock import MagicMock
from app.services.rol_service import RolService
from app.model.entidades import Rol

@pytest.fixture
def mock_repository(mocker):
    mock_repo = MagicMock()
    mocker.patch('app.services.rol_service.RolRepository', return_value=mock_repo)
    return mock_repo

def test_listar_roles_vacio(mock_repository):
    mock_repository.obtener_todos.return_value = []
    servicio = RolService()
    
    resultado = servicio.listar_roles()
    
    assert resultado == []
    mock_repository.obtener_todos.assert_called_once()

def test_crear_rol_exitoso(mock_repository):
    rol_mock = Rol(id=1, nombre="ADMIN")
    mock_repository.crear.return_value = rol_mock
    servicio = RolService()
    
    resultado = servicio.crear_rol({"nombre": "ADMIN"})
    
    assert resultado == {"id": 1, "nombre": "ADMIN"}
    mock_repository.crear.assert_called_once()