from . import crm_bp
from flask import jsonify

@crm_bp.route('/check', methods=['GET'])
def check_crm():
    return jsonify({"message": "CRM module ready"})
