from . import inventory_bp
from flask import jsonify, request, g, current_app
from app import db
from app.models import Producto, Variante
from app.utils import tenant_required
from sqlalchemy.exc import SQLAlchemyError
import json
import traceback

@inventory_bp.route('/check', methods=['GET'])
def check_stock():
    return jsonify({"message": "Inventory module ready"})

@inventory_bp.route('/products', methods=['POST'])
@tenant_required
def create_product():
    """
    Endpoint para crear productos.
    
    Maneja dos casos:
    1. Producto simple: Crea producto + variante "Estándar"
    2. Producto con variantes: Crea producto + múltiples variantes
    
    Requiere header: X-Tenant-Slug
    """
    try:
        data = request.get_json()
        current_app.logger.debug(f"Datos recibidos: {json.dumps(data, indent=2)}")
        
        # Validaciones básicas
        if not data:
            return jsonify({"error": "No se proporcionaron datos"}), 400
            
        nombre = data.get('nombre')
        if not nombre:
            return jsonify({"error": "El campo 'nombre' es requerido"}), 400
            
        precio_base = data.get('precio_base')
        if precio_base is None:
            return jsonify({"error": "El campo 'precio_base' es requerido"}), 400
            
        # Validar que precio_base sea un número válido
        try:
            precio_base = float(precio_base)
        except (ValueError, TypeError):
            return jsonify({"error": "El campo 'precio_base' debe ser un número válido"}), 400
        
        tiene_variantes = data.get('tiene_variantes', False)
        
        # Validar el caso de producto con variantes
        if tiene_variantes:
            variantes_data = data.get('variantes')
            if not variantes_data or not isinstance(variantes_data, list) or len(variantes_data) == 0:
                return jsonify({
                    "error": "Para productos con variantes, se requiere la lista 'variantes' con al menos una variante"
                }), 400
        
        # Validar el caso de producto simple
        else:
            stock_inicial = data.get('stock_inicial')
            if stock_inicial is None:
                return jsonify({"error": "Para productos simples, el campo 'stock_inicial' es requerido"}), 400
            
            # Validar que stock_inicial sea un entero válido
            try:
                stock_inicial = int(stock_inicial)
                if stock_inicial < 0:
                    return jsonify({"error": "El stock_inicial no puede ser negativo"}), 400
            except (ValueError, TypeError):
                return jsonify({"error": "El campo 'stock_inicial' debe ser un número entero válido"}), 400
        
        # Iniciar transacción para asegurar "todo o nada"
        try:
            # Usar transacción anidada para mayor control
            db.session.begin_nested()
            
            # Crear el producto
            producto = Producto(
                tienda_id=g.tienda.tienda_id,
                nombre=nombre,
                descripcion=data.get('descripcion', ''),
                imagen_url=data.get('imagen_url', ''),
                precio_base=precio_base,
                tiene_variantes=tiene_variantes,
                tipo_producto=data.get('tipo_producto', 'fisico'),
                activo=True
            )
            
            db.session.add(producto)
            db.session.flush()  # Obtener el ID sin hacer commit
            current_app.logger.debug(f"Producto creado en sesión, ID: {producto.producto_id}")
            
            # CASO A: Producto Simple
            if not tiene_variantes:
                # Crear variante "Estándar"
                variante = Variante(
                    producto_id=producto.producto_id,
                    sku=data.get('sku', f'{producto.producto_id}-EST'),
                    nombre_variante="Estándar",
                    stock_actual=stock_inicial,
                    precio_ajuste=0,
                    atributos={}  # JSON vacío
                )
                db.session.add(variante)
                current_app.logger.debug(f"Variante simple creada para producto {producto.producto_id}")
            
            # CASO B: Producto con Variantes
            else:
                for i, var_data in enumerate(variantes_data):
                    # Validar datos de cada variante
                    nombre_variante = var_data.get('nombre_variante')
                    stock_actual = var_data.get('stock_actual')
                    atributos = var_data.get('atributos', {})
                    
                    current_app.logger.debug(f"Procesando variante {i}: {nombre_variante}, stock: {stock_actual}, atributos: {atributos}")
                    
                    if not nombre_variante:
                        raise ValueError(f"La variante {i} no tiene 'nombre_variante'")
                    
                    if stock_actual is None:
                        raise ValueError(f"La variante {i} no tiene 'stock_actual'")
                    
                    # Validar stock
                    try:
                        stock_actual = int(stock_actual)
                        if stock_actual < 0:
                            raise ValueError(f"El stock de la variante {i} no puede ser negativo")
                    except (ValueError, TypeError):
                        raise ValueError(f"El stock_actual de la variante {i} debe ser un entero válido")
                    
                    # Asegurar que atributos sea un diccionario válido
                    if not isinstance(atributos, dict):
                        try:
                            # Intentar convertir si es string
                            if isinstance(atributos, str):
                                atributos = json.loads(atributos)
                            else:
                                atributos = {}
                        except:
                            atributos = {}
                    
                    # Crear variante
                    variante = Variante(
                        producto_id=producto.producto_id,
                        sku=var_data.get('sku', f'{producto.producto_id}-{i+1}'),
                        nombre_variante=nombre_variante,
                        stock_actual=stock_actual,
                        precio_ajuste=var_data.get('precio_ajuste', 0),
                        atributos=atributos
                    )
                    db.session.add(variante)
                    current_app.logger.debug(f"Variante {nombre_variante} agregada a sesión")
            
            # Confirmar todo el bloque
            db.session.commit()
            current_app.logger.debug(f"Commit realizado para producto {producto.producto_id}")
            
            # Obtener el producto creado con sus variantes para la respuesta
            producto_creado = Producto.query.get(producto.producto_id)
            current_app.logger.debug(f"Producto obtenido: {producto_creado.nombre} con {len(producto_creado.variantes)} variantes")
            
            # Preparar respuesta
            response_data = {
                "message": "Producto creado exitosamente",
                "producto": {
                    "producto_id": producto_creado.producto_id,
                    "nombre": producto_creado.nombre,
                    "descripcion": producto_creado.descripcion,
                    "precio_base": float(producto_creado.precio_base),
                    "tiene_variantes": producto_creado.tiene_variantes,
                    "tipo_producto": producto_creado.tipo_producto,
                    "activo": producto_creado.activo,
                    "created_at": producto_creado.created_at.isoformat() if producto_creado.created_at else None,
                    "variantes": []
                }
            }
            
            # Agregar información de variantes
            for variante in producto_creado.variantes:
                response_data["producto"]["variantes"].append({
                    "variante_id": variante.variante_id,
                    "nombre_variante": variante.nombre_variante,
                    "sku": variante.sku,
                    "stock_actual": variante.stock_actual,
                    "precio_ajuste": float(variante.precio_ajuste),
                    "atributos": variante.atributos
                })
            
            current_app.logger.debug(f"Respuesta preparada para producto {producto_creado.producto_id}")
            return jsonify(response_data), 201
            
        except ValueError as e:
            db.session.rollback()
            current_app.logger.error(f"ValueError en create_product: {str(e)}")
            return jsonify({"error": str(e)}), 400
            
        except SQLAlchemyError as e:
            db.session.rollback()
            current_app.logger.error(f"SQLAlchemyError en create_product: {str(e)}")
            current_app.logger.error(traceback.format_exc())
            return jsonify({"error": f"Error de base de datos: {str(e)}"}), 500
            
    except Exception as e:
        # Capturar cualquier otro error no esperado
        db.session.rollback()
        current_app.logger.error(f"Excepción general en create_product: {str(e)}")
        current_app.logger.error(traceback.format_exc())
        return jsonify({"error": f"Error interno: {str(e)}"}), 500


@inventory_bp.route('/products/<int:producto_id>', methods=['GET'])
@tenant_required
def get_product(producto_id):
    """
    Endpoint para obtener un producto específico con sus variantes.
    """
    try:
        # Buscar el producto en la tienda actual
        producto = Producto.query.filter_by(
            producto_id=producto_id,
            tienda_id=g.tienda.tienda_id
        ).first()
        
        if not producto:
            return jsonify({"error": "Producto no encontrado"}), 404
        
        # Preparar respuesta
        response_data = {
            "producto": {
                "producto_id": producto.producto_id,
                "nombre": producto.nombre,
                "descripcion": producto.descripcion,
                "precio_base": float(producto.precio_base),
                "tiene_variantes": producto.tiene_variantes,
                "tipo_producto": producto.tipo_producto,
                "activo": producto.activo,
                "created_at": producto.created_at.isoformat() if producto.created_at else None,
                "variantes": []
            }
        }
        
        # Agregar información de variantes
        for variante in producto.variantes:
            response_data["producto"]["variantes"].append({
                "variante_id": variante.variante_id,
                "nombre_variante": variante.nombre_variante,
                "sku": variante.sku,
                "stock_actual": variante.stock_actual,
                "precio_ajuste": float(variante.precio_ajuste),
                "atributos": variante.atributos
            })
        
        return jsonify(response_data), 200
        
    except Exception as e:
        current_app.logger.error(f"Error en get_product: {str(e)}")
        return jsonify({"error": "Error interno del servidor"}), 500