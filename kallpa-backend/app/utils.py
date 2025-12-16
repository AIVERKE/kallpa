from functools import wraps
from flask import request, jsonify, g
from app.models import Tienda

def tenant_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        slug = request.headers.get('X-Tenant-Slug')
        
        if not slug:
            return jsonify({'error': 'X-Tenant-Slug header is missing'}), 401
        
        # Buscar la tienda en la BD
        tienda = Tienda.query.filter_by(slug=slug, activo=True).first()
        
        if not tienda:
            return jsonify({'error': 'Tienda no encontrada o inactiva'}), 403
        
        # Inyectar en el contexto global
        g.tienda = tienda
        
        return f(*args, **kwargs)
    return decorated_function

