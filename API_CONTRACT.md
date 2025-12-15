# 📜 Referencia Central: Contratos de API

Este documento actúa como el **contrato vinculante** entre el equipo de Backend y Frontend. Cualquier desarrollo de nuevos endpoints o integración de clientes debe respetar estrictamente las estructuras JSON aquí definidas.

---

## 🛍️ Productos (`Product & Variants`)

### Crear Producto

- **Endpoint**: `POST /api/v1/products`
- **Method**: `POST`
- **Headers Obligatorios**:
  - `Content-Type`: `application/json`
  - `X-Tenant-Slug`: `<slug-tienda>` (Ej error: falta de este header causará 401/403)

#### 1. Escenario Complejo (Ropa, Zapatos, Items con Variantes)

Para productos que varían en atributos (talla, color, material) y pueden tener precios o stocks distintos por variante.

```json
{
  "nombre": "Vestido de Verano Floral",
  "descripcion": "Tela ligera, ideal para calor.",
  "precio_base": 200.0,
  "tiene_variantes": true,
  "tipo_producto": "fisico",
  "imagen_url": "https://...",
  "variantes": [
    {
      "nombre_variante": "S / Rojo",
      "stock_actual": 5,
      "precio_ajuste": 0,
      "atributos": { "talla": "S", "color": "Rojo" }
    },
    {
      "nombre_variante": "XL / Azul",
      "stock_actual": 2,
      "precio_ajuste": 20.0,
      "atributos": { "talla": "XL", "color": "Azul" }
    }
  ]
}
```

#### 2. Escenario Simple (Electrónica, Accesorios, Ítems Únicos)

Para productos únicos donde no existen variaciones (o no se gestionan). El stock se maneja a nivel de producto padre.

```json
{
  "nombre": "Laptop HP",
  "descripcion": "16GB RAM, 512SSD",
  "precio_base": 5000.0,
  "tiene_variantes": false,
  "stock_inicial": 10
}
```

---

_Nota: Todos los precios deben enviarse en formato numérico (float/decimal), no strings._
