from . import sales_bp
from flask import jsonify

@sales_bp.route('/check', methods=['GET'])
def check_sales():
    return jsonify({"message": "Sales module ready"})
