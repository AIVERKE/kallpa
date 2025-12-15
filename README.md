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

## 🛑 Política de Contribución (Pull Requests)

Para mantener la calidad y estabilidad del código, es **obligatorio** seguir el siguiente flujo de trabajo para cualquier cambio en el proyecto:

### 1. Crear Rama (Feature Branch)

Nunca trabajes directamente sobre `main`. Crea una rama descriptiva para tu tarea:

```bash
git checkout -b feature/nombre-de-la-feature
# Ejemplo: git checkout -b feature/nuevo-producto
```

### 2. Guardar Cambios

Realiza commits atómicos y con mensajes claros:

```bash
git commit -m "Agrega endpoint de productos"
```

### 3. Subir Cambios

Sube tu rama al repositorio remoto:

```bash
git push origin feature/nombre-de-la-feature
```

### 4. Crear Pull Request (PR)

1.  Ve al repositorio en **GitHub**.
2.  Verás un botón verde **"Compare & pull request"**. Haz clic en él.
3.  Describe tus cambios detalladamente en el cuerpo del PR.

### 5. Revisión (Code Review)

1.  Avisa al equipo (Frontend Dev o Tech Lead) para que revisen tu PR.
2.  El revisor debe entrar a la pestaña "Files changed", revisar el código y aprobarlo (**"Approve"**) si todo está correcto.

### 6. Merge

Solo cuando el PR tenga al menos una aprobación ("Approve"), el botón **"Merge pull request"** se habilitará. Haz clic para integrar tus cambios a la rama `main`.

---

## � Documentación Técnica Adicional

Para mantener este README limpio, hemos separado los detalles técnicos en documentos específicos:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)**: Explica la estructura de carpetas y decisiones de arquitectura del Monorepo.
- **[API_CONTRACT.md](./API_CONTRACT.md)**: **(IMPORTANTE)** Define los contratos JSON de los endpoints (Payloads de Request/Response) que tanto Backend como Frontend deben respetar.

---

## �🐛 Solución de Problemas de Instalación

1.  **Error "Scripts cannot be executed on this system" (Windows):**

    - Powershell por defecto bloquea scripts. Ejecuta:
      `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

2.  **Error de conexión a DB:**
    - Asegúrate de que el contenedor `kallpa_db` esté corriendo (`docker ps`).
    - Revisa que tu archivo `.env` local tenga `localhost` y no `db` (como se usa dentro de Docker).
