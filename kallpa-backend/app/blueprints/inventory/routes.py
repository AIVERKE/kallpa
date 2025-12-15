from . import inventory_bp
from flask import jsonify

@inventory_bp.route('/check', methods=['GET'])
def check_stock():
    return jsonify({"message": "Inventory module ready"})
