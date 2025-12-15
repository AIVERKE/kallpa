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
