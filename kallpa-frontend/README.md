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

## 🏗 Build de Producción

El `Dockerfile` en esta carpeta se encarga de crear una imagen optimizada ("Standalone"). No necesitas correr `npm run build` manualmente a menos que estés probando errores de compilación.
