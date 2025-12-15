from . import tenants_bp
from flask import jsonify

@tenants_bp.route('/check', methods=['GET'])
def check_tenants():
    return jsonify({"message": "Tenants module ready"})
