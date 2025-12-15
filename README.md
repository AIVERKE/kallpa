# Kallpa Sales AI - Full Stack 🦅

Sistema completo de Ventas y CRM con IA.

Este repositorio organiza todo el proyecto en una estructura monorepo:

- **`kallpa-backend/`**: API RESTful construida con Flask + SQLAlchemy.
- **`kallpa-frontend/`**: Interfaz de usuario moderna con Next.js + TailwindCSS.
- **Base de Datos**: PostgreSQL 14 (gestionada vía Docker).

---

## 选项 1: 🚀 Inicialización Rápida (Docker - Recomendado)

Si solo quieres ejecutar la aplicación para verla funcionando o probarla _tal cual_, usa Docker.

### Prerrequisitos

- Docker Desktop instalado y corriendo.

### Pasos

1.  **Levantar servicios**:
    ```bash
    docker-compose up -d --build
    ```
2.  **Inicializar DB** (Solo la primera vez):
    ```bash
    docker-compose exec backend flask db upgrade
    ```
    _(Esto ejecutará las migraciones existentes. Si necesitas recrearlas desde cero, ver la sección de comandos de mantenimiento)_.

---

## 选项 2: 🛠️ Modo Desarrollo (Instalación Local Detallada)

Para desarrolladores que van a modificar el código, **es obligatorio** configurar los entornos locales para tener autocompletado, linters y depuración en el IDE.

### 🔷 Parte A: Base de Datos (Siempre Docker)

Incluso si desarrollas el código localmente, recomendamos correr la base de datos en Docker para evitar instalar PostgreSQL en tu Windows/Mac/Linux.

1.  **Levantar solo la DB**:
    ```bash
    docker-compose up -d db
    ```
    _Esto dejará Postgres corriendo en el puerto `5432`._

---

### 🐍 Parte B: Backend (Python Flask)

Es vital usar un **Entorno Virtual** para aislar las dependencias del proyecto.

#### 1. Preparar el Entorno

Abre una terminal en la carpeta `kallpa-backend`:

```bash
cd kallpa-backend
```

#### 2. Crear el Entorno Virtual (venv)

Ejecuta uno de los siguientes comandos según tu sistema operativo. Esto creará una carpeta `venv/` donde vivirán las librerías.

- **Windows**:
  ```bash
  python -m venv venv
  ```
- **macOS / Linux**:
  ```bash
  python3 -m venv venv
  ```

#### 3. Activar el Entorno Virtual

**¡Este paso es crucial!** Debes ver `(venv)` al inicio de tu línea de comandos.

- **Windows (PowerShell)**:
  ```bash
  .\venv\Scripts\Activate
  ```
  _(Si tienes error de permisos, corre `Set-ExecutionPolicy Unrestricted -Scope Process`)_
- **Windows (CMD)**:
  ```bash
  venv\Scripts\activate.bat
  ```
- **macOS / Linux**:
  ```bash
  source venv/bin/activate
  ```

#### 4. Instalar Dependencias

Con el entorno activado, instala todas las librerías necesarias:

```bash
pip install -r requirements.txt
```

#### 5. Configurar Variables de Entorno

Crea un archivo `.env` basado en el ejemplo:

- **Windows**: `copy .env.example .env`
- **Mac/Linux**: `cp .env.example .env`

Verifica que en tu nuevo archivo `.env`, la `DATABASE_URL` apunte a localhost:

```ini
DATABASE_URL=postgresql://kallpa_user:kallpa_password@localhost:5432/kallpa_db
```

#### 6. Ejecutar el Backend

```bash
python run.py
```

El servidor backend correrá en `http://localhost:5000`.

---

### ⚛️ Parte C: Frontend (Next.js)

Requiere Node.js v18+ instalado.

1.  **Ir a la carpeta**:

    ```bash
    cd ../kallpa-frontend
    ```

2.  **Instalar dependencias**:

    ```bash
    npm install
    ```

3.  **Correr entorno de desarrollo**:
    ```bash
    npm run dev
    ```
    La app estará en `http://localhost:3000`.

---

## 🎛️ Comandos Útiles de Administración

### Gestión de Base de Datos (Alembic)

Cuando modifiques `models.py`, necesitas generar una nueva migración.

**Si usas Docker:**

```bash
docker-compose exec backend flask db migrate -m "Descripcion del cambio"
docker-compose exec backend flask db upgrade
```

**Si usas Entorno Local (con venv activado):**

```bash
flask db migrate -m "Descripcion del cambio"
flask db upgrade
```

---

## 🐛 Solución de Problemas de Instalación

1.  **Error "Scripts cannot be executed on this system" (Windows):**

    - Powershell por defecto bloquea scripts. Ejecuta:
      `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

2.  **Error de conexión a DB:**
    - Asegúrate de que el contenedor `kallpa_db` esté corriendo (`docker ps`).
    - Revisa que tu archivo `.env` local tenga `localhost` y no `db` (como se usa dentro de Docker).
