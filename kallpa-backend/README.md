# Kallpa Sales AI - Backend Service 🦅

API Flask + SQLAlchemy que gestiona la lógica de negocio de Kallpa.

## ⚠️ Nota Importante

Este servicio es parte del ecosistema **Kallpa Sales AI**.
Para correr todo el sistema (Backend + Frontend + DB), por favor utiliza el `docker-compose.yml` que está en la carpeta raíz `../`.

---

## 🛠 Desarrollo Local (Aislado)

Si necesitas trabajar **solo** en el backend (por ejemplo, para debugging intenso o crear migraciones nuevas), sigue estos pasos:

### 1. Entorno Virtual

```bash
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

### 2. Variables de Entorno

Asegúrate de tener el archivo `.env` configurado. Si usas el Docker raíz, la DB estará disponible en `localhost:5432`.

```properties
DATABASE_URL=postgresql://kallpa_user:kallpa_password@localhost:5432/kallpa_db
```

### 3. Ejecutar

```bash
python run.py
```

## 📦 Comandos de Base de Datos

(Ejecutar dentro del contenedor o con el venv activo)

- `flask db migrate -m "Mensaje"`: Crear migración.
- `flask db upgrade`: Aplicar cambios.

## 🚨 Troubleshooting: Conflicto de Migraciones ("Can't locate revision")

Si al hacer `pull` de los cambios recibes errores de migración (porque se reinició el historial), debes limpiar tu base de datos local y sincronizar desde cero.

**Opción Rápida (desde la raíz del proyecto con Docker):**

```bash
# 1. Entrar al contenedor
docker-compose exec backend bash

# 2. Ejecutar estos comandos dentro del contenedor:
# (Esto borra la tabla de versiones para forzar el re-sync)
python -c "from app import db, create_app; from sqlalchemy import text; app = create_app(); ctx = app.app_context(); ctx.push(); db.session.execute(text('DROP TABLE IF EXISTS alembic_version CASCADE')); db.session.commit(); print('Historial borrado')"

# 3. Aplicar la nueva migración base
flask db upgrade
```

Esto alineará tu base de datos local con el nuevo esquema maestro.
