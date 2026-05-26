class CategoriaDTO:
    def to_json(categoria):
        return {
            "id": categoria.categoria_id,
            "nombre": categoria.nombre
        }

# Solo extrae el campo "nombre", ya que el id lo autogenera la bd.
    def from_json(json_data):
        return {
            "nombre": json_data.get("nombre")
        }