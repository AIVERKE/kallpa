from app import db
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime

# ==========================================================
# 2. MÓDULO CORE SAAS (TIENDAS)
# ==========================================================

class Tienda(db.Model):
    __tablename__ = 'tiendas'
    
    tienda_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(50), unique=True, nullable=False)
    
    # Configuraciones flexibles en JSON
    config_pagos = db.Column(JSONB, default={})
    config_zonas = db.Column(JSONB, default={})
    
    activo = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relaciones - definimos aquí para facilitar accesos
    productos = db.relationship('Producto', backref='tienda', lazy=True)
    customers = db.relationship('Customer', backref='tienda', lazy=True)
    ordenes = db.relationship('Orden', backref='tienda', lazy=True)
    opportunities = db.relationship('Opportunity', backref='tienda', lazy=True)
    quotes = db.relationship('Quote', backref='tienda', lazy=True)
    ai_interactions = db.relationship('AiInteraction', backref='tienda', lazy=True)


# ==========================================================
# 3. MÓDULO CRM & CLIENTES
# ==========================================================

class Customer(db.Model):
    __tablename__ = 'customers'
    
    id = db.Column(db.Integer, primary_key=True)
    tienda_id = db.Column(db.Integer, db.ForeignKey('tiendas.tienda_id', ondelete='CASCADE'), nullable=False)
    
    # Identificadores
    telegram_user_id = db.Column(db.BigInteger)
    whatsapp_id = db.Column(db.String(50))
    
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(150))
    phone = db.Column(db.String(30))
    
    # Segmentación
    company = db.Column(db.String(200))
    segment = db.Column(db.String(100)) # Ej: 'Minorista', 'VIP'
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Constraint Unique: Un cliente es único POR tienda
    __table_args__ = (db.UniqueConstraint('tienda_id', 'telegram_user_id', name='unique_tienda_customer'),)

    # Relaciones
    memory = db.relationship('CustomerMemory', backref='customer', uselist=False, cascade="all, delete-orphan", lazy=True)
    ordenes = db.relationship('Orden', backref='customer', lazy=True)
    opportunities = db.relationship('Opportunity', backref='customer', lazy=True)
    quotes = db.relationship('Quote', backref='customer', lazy=True)
    ai_interactions = db.relationship('AiInteraction', backref='customer', lazy=True)


class CustomerMemory(db.Model):
    __tablename__ = 'customer_memory'
    
    memory_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id', ondelete='CASCADE'), unique=True, nullable=False)
    
    zona_preferida = db.Column(db.String(100))
    preferencias_producto = db.Column(JSONB, default={}) # Ej: {"talla": "M", "color": "Rojo"}
    
    # Psicología de Venta
    tono_detectado = db.Column(db.String(50))
    intencion_compra = db.Column(db.String(100))
    dolor_principal = db.Column(db.Text)
    ultima_objecion = db.Column(db.Text)
    
    resumen_conversacion = db.Column(db.Text)
    last_interaction_at = db.Column(db.DateTime, default=datetime.utcnow)


# ==========================================================
# 4. MÓDULO INVENTARIO (PRODUCTOS & VARIANTES)
# ==========================================================

class Producto(db.Model):
    __tablename__ = 'productos'
    
    producto_id = db.Column(db.Integer, primary_key=True)
    tienda_id = db.Column(db.Integer, db.ForeignKey('tiendas.tienda_id', ondelete='CASCADE'), nullable=False)
    
    nombre = db.Column(db.String(255), nullable=False)
    descripcion = db.Column(db.Text)
    imagen_url = db.Column(db.Text)
    precio_base = db.Column(db.Numeric(10, 2), nullable=False)
    
    tiene_variantes = db.Column(db.Boolean, default=False)
    tipo_producto = db.Column(db.String(50), default='fisico') # 'fisico', 'servicio', 'digital'
    
    activo = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relaciones
    variantes = db.relationship('Variante', backref='producto', cascade="all, delete-orphan", lazy=True)


class Variante(db.Model):
    __tablename__ = 'variantes'
    
    variante_id = db.Column(db.Integer, primary_key=True)
    producto_id = db.Column(db.Integer, db.ForeignKey('productos.producto_id', ondelete='CASCADE'), nullable=False)
    
    sku = db.Column(db.String(100))
    nombre_variante = db.Column(db.String(100), nullable=False) # Ej: "M / Rojo" o "Estándar"
    
    stock_actual = db.Column(db.Integer, default=0)
    precio_ajuste = db.Column(db.Numeric(10, 2), default=0) # Se suma al precio base si aplica
    
    atributos = db.Column(JSONB, default={}) # Ej: {"talla": "M", "color": "Rojo"}

# ==========================================================
# 5. MÓDULO VENTAS (OPORTUNIDADES & COTIZACIONES)
# ==========================================================

class Opportunity(db.Model):
    __tablename__ = 'opportunities'

    id = db.Column(db.Integer, primary_key=True)
    tienda_id = db.Column(db.Integer, db.ForeignKey('tiendas.tienda_id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)

    title = db.Column(db.String(200), nullable=False)
    stage = db.Column(db.String(50), default='lead') # 'lead', 'negotiation', 'won', 'lost'
    value = db.Column(db.Numeric(12, 2))
    probability = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relaciones
    quotes = db.relationship('Quote', backref='opportunity', lazy=True)
    ordenes = db.relationship('Orden', backref='opportunity', lazy=True)


class Quote(db.Model):
    __tablename__ = 'quotes'

    id = db.Column(db.Integer, primary_key=True)
    tienda_id = db.Column(db.Integer, db.ForeignKey('tiendas.tienda_id'), nullable=False)
    opportunity_id = db.Column(db.Integer, db.ForeignKey('opportunities.id'))
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)

    total = db.Column(db.Numeric(12,2))
    status = db.Column(db.String(50), default='draft')

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    valid_until = db.Column(db.Date)

    # Relaciones
    items = db.relationship('QuoteItem', backref='quote', cascade="all, delete-orphan", lazy=True)


class QuoteItem(db.Model):
    __tablename__ = 'quote_items'

    id = db.Column(db.Integer, primary_key=True)
    quote_id = db.Column(db.Integer, db.ForeignKey('quotes.id', ondelete='CASCADE'), nullable=False)
    variante_id = db.Column(db.Integer, db.ForeignKey('variantes.variante_id'), nullable=False)

    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(12, 2))
    total_price = db.Column(db.Numeric(12, 2))
    
    # Relationship to access variant details directly from item if needed
    variante = db.relationship('Variante')


# ==========================================================
# 6. MÓDULO ÓRDENES (TRANSACCIONES)
# ==========================================================

class Orden(db.Model):
    __tablename__ = 'ordenes'
    
    orden_id = db.Column(db.Integer, primary_key=True)
    tienda_id = db.Column(db.Integer, db.ForeignKey('tiendas.tienda_id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id')) # Puede ser NULL si es venta anónima
    opportunity_id = db.Column(db.Integer, db.ForeignKey('opportunities.id'))
    
    estado = db.Column(db.String(50), default='PENDIENTE_PAGO') # 'PENDIENTE_PAGO', 'PAGADO', 'ENTREGADO'
    
    # Finanzas
    monto_subtotal = db.Column(db.Numeric(10, 2))
    costo_envio = db.Column(db.Numeric(10, 2))
    monto_total = db.Column(db.Numeric(10, 2)) # Falta un NOT NULL según SQL pero lo dejamos flexible por ahora? SQL dice nullable, ah no wait, SQL no dice NOT NULL explícito en las columnas de monto, solo en primary keys.
    
    # Logística
    metodo_pago = db.Column(db.String(50)) # 'QR', 'CONTRAENTREGA'
    zona_entrega = db.Column(db.String(100))
    direccion_entrega = db.Column(db.Text)
    fecha_entrega_programada = db.Column(db.Date)
    
    # Auditoría Pago
    external_payment_id = db.Column(db.String(100))
    comprobante_url = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relaciones
    detalles = db.relationship('DetalleOrden', backref='orden', cascade="all, delete-orphan", lazy=True)


class DetalleOrden(db.Model):
    __tablename__ = 'detalles_orden'
    
    detalle_id = db.Column(db.Integer, primary_key=True)
    orden_id = db.Column(db.Integer, db.ForeignKey('ordenes.orden_id', ondelete='CASCADE'), nullable=False)
    producto_id = db.Column(db.Integer, db.ForeignKey('productos.producto_id'), nullable=False)
    variante_id = db.Column(db.Integer, db.ForeignKey('variantes.variante_id'), nullable=False)
    
    cantidad = db.Column(db.Integer, nullable=False)
    precio_unitario_final = db.Column(db.Numeric(10, 2))
    
    # Relaciones para acceder a info del producto snapshot si se quisiera, aunque aqu'i apunta al live
    producto = db.relationship('Producto')
    variante = db.relationship('Variante')


# ==========================================================
# 7. AUDITORÍA IA
# ==========================================================

class AiInteraction(db.Model):
    __tablename__ = 'ai_interactions'
    
    id = db.Column(db.Integer, primary_key=True)
    tienda_id = db.Column(db.Integer, db.ForeignKey('tiendas.tienda_id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    
    prompt_sent = db.Column(db.Text)
    response_received = db.Column(db.Text)
    tokens_used = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
