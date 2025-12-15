from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config

# Inicializamos extensiones globales
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar plugins
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app) # Permite que el Frontend (React) nos hable

    # Importar modelos para que Alembic los detecte
    from app import models

    # Registrar Blueprints (Los módulos vacíos por ahora)
    from app.blueprints.tenants.routes import tenants_bp
    from app.blueprints.inventory.routes import inventory_bp
    
    app.register_blueprint(tenants_bp, url_prefix='/api/v1/config')
    app.register_blueprint(inventory_bp, url_prefix='/api/v1/inventory')
    
    # Placeholder para rutas de salud
    @app.route('/')
    def health_check():
        return {"status": "ok", "message": "Kallpa Sales AI Backend Operativo 🚀"}

    return app
