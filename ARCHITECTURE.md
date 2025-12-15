# 🏗️ Arquitectura del Proyecto Kallpa

Este documento describe la estructura de archivos y directorios del proyecto "Kallpa Sales AI". El proyecto sigue una arquitectura **Monorepo**, conteniendo tanto el Backend (API) como el Frontend (Cliente Web) en un único repositorio gestionado.

## 📂 Estructura Global (Raíz)

```text
kallpa/
├── docker-compose.yml      # Orquestación de servicios (Frontend, Backend, DB)
├── README.md               # Guía de inicio rápido e instalación
├── ARCHITECTURE.md         # Este archivo (Estructura del proyecto)
├── .git/                   # Control de versiones (Git)
├── kallpa-backend/         # Código fuente de la API (Python/Flask)
└── kallpa-frontend/        # Código fuente de la UI (Next.js)
```

---

## 🐍 Backend (`kallpa-backend/`)

El backend está construido con **Python** y **Flask**, siguiendo una arquitectura basada en "Factory Pattern" y "Blueprints" para modularidad.

```text
kallpa-backend/
├── run.py                  # Punto de entrada de la aplicación (dev server)
├── config.py               # Configuraciones de la App (Variables de entorno)
├── requirements.txt        # Dependencias de Python (pip)
├── Dockerfile              # Definición de la imagen Docker del backend
├── .env / .env.example     # Variables de entorno (Secretos, DB URL)
│
├── app/                    # Núcleo de la aplicación
│   ├── __init__.py         # Inicialización de la App (Factory: create_app)
│   ├── models.py           # Modelos de Base de Datos (SQLAlchemy)
│   ├── utils.py            # Funciones utilitarias compartidas
│   │
│   └── blueprints/         # Módulos funcionales (Rutas/Controladores)
│       ├── tenants/        # Gestión de Tiendas/Inquilinos
│       ├── inventory/      # Gestión de Productos y Stock
│       ├── sales/          # Procesamiento de Ventas (Propuesta)
│       └── crm/            # Gestión de Clientes y Memoria (Propuesta)
│
└── migrations/             # Scripts de migración de Base de Datos (Alembic)
    └── versions/           # Historial de cambios en el esquema SQL
```

### Conceptos Clave Backend:

- **Blueprints**: Cada carpeta en `blueprints/` representa un dominio funcional separado con sus propias rutas.
- **Migrations**: Utilizamos `flask-migrate` (Alembic) para gestionar cambios en la estructura de la base de datos sin perder datos.
- **Factory Pattern**: `create_app()` en `__init__.py` permite crear múltiples instancias de la app (útil para testing).

---

## ⚛️ Frontend (`kallpa-frontend/`)

El frontend utiliza **Next.js 14+** (App Router) con **TailwindCSS** para estilos.

```text
kallpa-frontend/
├── package.json            # Dependencias de Node.js y scripts
├── next.config.mjs         # Configuración de Next.js
├── tailwind.config.js      # Configuración de estilos (Tailwind)
├── Dockerfile              # Definición de la imagen Docker del frontend
│
└── src/                    # Código fuente
    ├── app/                # Next.js App Router (Rutas y Páginas)
    │   ├── page.js         # Página de Inicio (Landing / Login)
    │   ├── layout.js       # Layout raíz (HTML, Body, Fuentes)
    │   ├── globals.css     # Estilos globales y directivas Tailwind
    │   │
    │   └── dashboard/      # Ruta protegida "/dashboard"
    │       ├── page.js     # Vista principal del Dashboard
    │       └── layout.js   # Layout del dashboard (ej. Sidebar persistente)
    │
    ├── components/         # Componentes UI reutilizables
    │   └── Sidebar.js      # Barra de navegación lateral
    │
    └── lib/                # Lógica de negocio y utilidades
        └── api.js          # Cliente HTTP (Axios/Fetch) para conectar con Backend
```

### Conceptos Clave Frontend:

- **App Router**: La estructura de carpetas dentro de `src/app` define las URLs de la web.
- **Server/Client Components**: Por defecto los componentes son de Servidor. Usamos "use client" cuando necesitamos interactividad (hooks, estado).
- **src/lib/api.js**: Centraliza todas las llamadas al Backend para mantener el código limpio.
