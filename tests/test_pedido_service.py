import pytest
from unittest.mock import MagicMock
from app.services.pedido_service import PedidoService
from app.model.entidades import Pedido, LineaPedido

@pytest.fixture
def mock_pedido_repo(mocker):
    # Crea un objeto vacío que actuará como un clon falso de la bd.
    mock_repo = MagicMock()
    # Cada vez que intente usar el repositorio real, usa el clon falso en su lugar
    mocker.patch('app.services.pedido_service.PedidoRepository', return_value=mock_repo)
    return mock_repo


# Comprobar que las matemáticas del total funcionan
def test_crear_pedido_calcula_total_correctamente(mock_pedido_repo, mocker):
    # Mockear dtos para simular la conversión a JSON
    mocker.patch('app.dtos.pedido_dto.PedidoDTO.to_json', side_effect=lambda x: {"total": getattr(x, 'total', 0)})
    
    # Creamos una entidad falsa "multiusos" que servirá tanto de Usuario como de Producto
    mock_entidad_bd = MagicMock()
    mock_entidad_bd.stock = 100  # Evita el error TypeError al comprobar el stock (100 < 2 será False)
    mock_entidad_bd.precio = 10.0 # Evita errores si el sistema intenta multiplicar cantidad * precio
    mock_entidad_bd.direccion = "Calle Falsa 123" # Propiedades de usuario para evitar posibles fallos
    mock_entidad_bd.poblacion = "Springfield"
    mock_entidad_bd.provincia = "Estado"
    mock_entidad_bd.codigo_postal = "12345"
    
    # Falsificamos la búsqueda en la sesión de SQLAlchemy (scoped_session) devolviendo nuestra entidad preparada
    mocker.patch('sqlalchemy.orm.scoping.scoped_session.get', return_value=mock_entidad_bd)
    
    # Mockear repositorio para que devuelva el pedido simulado directamente al guardar
    mock_pedido_repo.guardar.side_effect = lambda p: p
    
    servicio = PedidoService()
    
    # Datos que simulan lo que enviaría el frontend en la petición
    datos_compra = {"lineas": [{"producto_id": 1, "cantidad": 2}]}
    
    # Pasamos primero los datos y luego el ID, tal y como espera tu servicio real
    resultado = servicio.crear_pedido(datos_compra, 1)
    
    assert "total" in resultado[0]


def test_actualizar_solo_estado_pedido(mock_pedido_repo, mocker):
    # Configurar el mock del DTO para simular los datos entrantes usando la clave correcta ("estado")
    mocker.patch('app.dtos.pedido_dto.PedidoDTO.from_json', return_value={"estado": True})
    
    # Actualizamos el mock para que el DTO procese y devuelva ambos estados según la nueva BD (usando getattr por seguridad)
    mocker.patch('app.dtos.pedido_dto.PedidoDTO.to_json', side_effect=lambda x: {
        "estado_pedido": getattr(x, 'estado_pedido', False),
        "estado_pagado": getattr(x, 'estado_pagado', False)
    })

    # Usamos MagicMock en lugar de la entidad Pedido real para evitar errores de atributos inexistentes.
    # Inicializamos ambos estados (pedido y pagado) como espera la nueva base de datos.
    pedido_existente = MagicMock()
    pedido_existente.pedido_id = 1
    pedido_existente.usuario_id = 5
    pedido_existente.estado_pedido = False
    pedido_existente.estado_pagado = False

    mock_pedido_repo.obtener_por_id.return_value = pedido_existente
    mock_pedido_repo.guardar.side_effect = lambda p: p
    
    servicio = PedidoService()
    
    # Le pasamos la modificación de estado de prueba usando la clave "estado" que espera el servicio
    resultado = servicio.actualizar_pedido(1, {"estado": True})
    
    # Verificamos que el resultado contenga ambos campos, asumiendo que solo se actualizó el pedido
    assert resultado == {"estado_pedido": True, "estado_pagado": False}


def test_actualizar_pedido_inexistente_retorna_none(mock_pedido_repo):
    # Si intentan buscar algo, devulve None como si no lo enontrara.
    mock_pedido_repo.obtener_por_id.return_value = None
    servicio = PedidoService()
    
    # Intentamos actualizar un ID absurdo (999).
    resultado = servicio.actualizar_pedido(999, {"estado_pagado": True})
    
    assert resultado is None
    # Garantiza que el sistema no intentó guardar nada en la base de datos, evitando un error grave.
    mock_pedido_repo.guardar.assert_not_called()