from app import db
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime

# --- 1. CORE SAAS ---
class Tienda(db.Model):
    __tablename__ = 'tiendas'
    tienda_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(50), unique=True, nullable=False)
    config_pagos = db.Column(JSONB, default={})
    config_zonas = db.Column(JSONB, default={})
    activo = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# --- 2. INVENTARIO ---
class Producto(db.Model):
    __tablename__ = 'productos'
    producto_id = db.Column(db.Integer, primary_key=True)
    tienda_id = db.Column(db.Integer, db.ForeignKey('tiendas.tienda_id'), nullable=False)
    nombre = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text)
    precio_base = db.Column(db.Numeric(10, 2), nullable=False)
    tiene_variantes = db.Column(db.Boolean, default=False)
    tipo_producto = db.Column(db.String(50), default='fisico')
    variantes = db.relationship('Variante', backref='producto', lazy=True)

class Variante(db.Model):
    __tablename__ = 'variantes'
    variante_id = db.Column(db.Integer, primary_key=True)
    producto_id = db.Column(db.Integer, db.ForeignKey('productos.producto_id'), nullable=False)
    nombre_variante = db.Column(db.String(100), nullable=False)
    stock_actual = db.Column(db.Integer, default=0)
    atributos = db.Column(JSONB, default={})

# --- 3. CRM & MEMORIA ---
class Customer(db.Model):
    __tablename__ = 'customers'
    id = db.Column(db.Integer, primary_key=True)
    tienda_id = db.Column(db.Integer, db.ForeignKey('tiendas.tienda_id'), nullable=False)
    telegram_user_id = db.Column(db.BigInteger)
    name = db.Column(db.String(200), nullable=False)
    # Relación 1-a-1 con Memoria
    memory = db.relationship('CustomerMemory', backref='customer', uselist=False, lazy=True)

class CustomerMemory(db.Model):
    __tablename__ = 'customer_memory'
    memory_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), unique=True, nullable=False)
    zona_preferida = db.Column(db.String(100))
    preferencias_producto = db.Column(JSONB, default={})
    tono_detectado = db.Column(db.String(50))
    dolor_principal = db.Column(db.Text)

# --- 4. ÓRDENES ---
class Orden(db.Model):
    __tablename__ = 'ordenes'
    orden_id = db.Column(db.Integer, primary_key=True)
    tienda_id = db.Column(db.Integer, db.ForeignKey('tiendas.tienda_id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    monto_total = db.Column(db.Numeric(10, 2), nullable=False)
    estado = db.Column(db.String(50), default='PENDIENTE_PAGO')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
