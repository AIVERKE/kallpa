# Kallpa Sales AI - Frontend Service 🦅

Interfaz Next.js para el sistema Kallpa.

## ⚠️ Nota Importante

Este servicio es parte del ecosistema **Kallpa Sales AI**.
Para iniciar la aplicación completa, usa `docker-compose up` en la carpeta raíz.

---

## 🛠 Desarrollo de UI

Si quieres editar la interfaz co "Hot Reloading" (ver cambios en tiempo real):

1.  Asegúrate de que el **Backend** esté corriendo (via Docker raíz o python local).
2.  Instala dependencias:
    ```bash
    npm install
    ```
3.  Corre el servidor de desarrollo:
    ```bash
    npm run dev
    ```
4.  Visita `http://localhost:3000`.

## 🔐 Login de Desarrollo (Dev Login)

Para facilitar el trabajo en las pantallas sin implementar autenticación real, este proyecto incluye un "Login Dev".

- Página: `/login`  (o accede desde la página principal)
- Selecciona una tienda (por ejemplo, "Moda Paceña") y presiona **Entrar**.
- Esto guardará en el navegador la clave `kallpa_tenant_slug` en `localStorage` y redirigirá a `/dashboard`.

La instancia de Axios del proyecto ya añade automáticamente el header `X-Tenant-Slug` en todas las peticiones si existe la clave en `localStorage`.

Archivos clave:

- `src/app/login/page.js` — página del Login Dev (diseño con fondo y logo).
- `src/lib/useTenant.js` — helper y hook para leer/escribir el tenant en `localStorage`.
- `src/lib/api.js` — instancia Axios con interceptor que inyecta `X-Tenant-Slug`.

Nota: La página de login usa `/kallpa-logo.png` y `/login-bg.jpg` como rutas; coloca tus archivos en la carpeta `public/`.

## 🏗 Build de Producción

El `Dockerfile` en esta carpeta se encarga de crear una imagen optimizada ("Standalone"). No necesitas correr `npm run build` manualmente a menos que estés probando errores de compilación.
