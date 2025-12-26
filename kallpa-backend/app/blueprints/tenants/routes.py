from . import tenants_bp
from flask import jsonify, g
from app.utils import tenant_required

@tenants_bp.route('/check', methods=['GET'])
def check_tenants():
    return jsonify({"message": "Tenants module ready"})

@tenants_bp.route('/public', methods=['GET'])
@tenant_required
def get_public_config():
    """
    Retorna la configuración pública de la tienda identificada por el header X-Tenant-Slug.
    No retorna secretos, solo información segura para el frontend/bot.
    """
    # g.tienda ya está inyectado por el decorador @tenant_required
    tienda = g.tienda
    
    # Construimos el diccionario manual de seguridad
    # Filtrando solo lo que el frontend necesita saber
    
    public_config = {
        "nombre": tienda.nombre,
        "slug": tienda.slug,
        "zonas": tienda.config_zonas, # Se asume que esto es público (tarifas)
        "pagos": {
            # Extraemos explicitamente flags seguros de config_pagos si existen
            # Si config_pagos es None, usamos defaults seguros
            "acepta_qr": tienda.config_pagos.get('acepta_qr', False) if tienda.config_pagos else False,
            "acepta_efectivo": tienda.config_pagos.get('acepta_efectivo', False) if tienda.config_pagos else False,
            # Se pueden agregar más flags públicos aquí según se necesite
        }
    }
    
    return jsonify(public_config), 200
