from flask import Blueprint

tenants_bp = Blueprint('tenants', __name__)

from . import routes
