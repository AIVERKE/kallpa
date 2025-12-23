"use client";
import { useEffect, useMemo, useState } from "react";

export default function ProductForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioBase, setPrecioBase] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [tipoProducto, setTipoProducto] = useState("fisico");
  const [tieneVariantes, setTieneVariantes] = useState(false);

  // Simple product stock
  const [stockInicial, setStockInicial] = useState(0);

  // Variant tags
  const [sizes, setSizes] = useState(["S", "M", "L"]);
  const [colors, setColors] = useState(["Rojo", "Azul", "Negro"]);

  // Variant rows: { key: "S|Rojo", talla: "S", color: "Rojo", nombreVariante: "S / Rojo", stock: number, precioAjuste: number }
  const [variantRows, setVariantRows] = useState([]);

  // Compute desired keys from tags
  const desiredKeys = useMemo(() => {
    const keys = [];
    for (const s of sizes) {
      for (const c of colors) {
        keys.push(`${s}|${c}`);
      }
    }
    return keys;
  }, [sizes, colors]);

  // Sync variantRows when tags change
  useEffect(() => {
    setVariantRows((prev) => {
      const map = new Map(prev.map((v) => [v.key, v]));
      const next = [];
      for (const key of desiredKeys) {
        const [talla, color] = key.split("|");
        const nombreVariante = `${talla} / ${color}`;
        const existing = map.get(key);
        next.push(
          existing || {
            key,
            talla,
            color,
            nombreVariante,
            stock: 0,
            precioAjuste: 0,
          }
        );
      }
      return next;
    });
  }, [desiredKeys]);

  // Handle toggle: clean up when turning off variants
  useEffect(() => {
    if (!tieneVariantes) {
      setVariantRows([]);
    }
  }, [tieneVariantes]);

  const addTagOnEnter = (e, list, setList) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = e.target.value.trim();
      if (!val) return;
      if (list.includes(val)) {
        e.target.value = "";
        return;
      }
      setList([...list, val]);
      e.target.value = "";
    }
  };

  const removeTag = (val, list, setList) => {
    setList(list.filter((t) => t !== val));
  };

  const onChangeVariantStock = (key, newStock) => {
    setVariantRows((rows) => rows.map((r) => (r.key === key ? { ...r, stock: newStock } : r)));
  };

  const onChangeVariantPriceAdj = (key, newAdj) => {
    setVariantRows((rows) => rows.map((r) => (r.key === key ? { ...r, precioAjuste: newAdj } : r)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const precioNum = Number(precioBase) || 0;

    if (!tieneVariantes) {
      const payload = {
        nombre,
        descripcion,
        precio_base: precioNum,
        tiene_variantes: false,
        stock_inicial: Number(stockInicial) || 0,
      };
      console.log("JSON Producto Simple ->", payload);
      return;
    }

    const variantes = variantRows.map((r) => ({
      nombre_variante: r.nombreVariante,
      stock_actual: Number(r.stock) || 0,
      precio_ajuste: Number(r.precioAjuste) || 0,
      atributos: { talla: r.talla, color: r.color },
    }));

    const payload = {
      nombre,
      descripcion,
      precio_base: precioNum,
      tiene_variantes: true,
      tipo_producto: tipoProducto,
      imagen_url: imagenUrl || undefined,
      variantes,
    };
    console.log("JSON Producto con Variantes ->", payload);
  };

  return (
    <div className="anim-fade-in-up">
      <h2
        className="text-2xl font-bold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-blue), var(--kallpa-purple))" }}
      >
        Crear Producto
      </h2>
      <div className="mt-3 h-1 w-20 rounded-full" style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-yellow), var(--kallpa-orange))" }} />

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/80 mb-1">Nombre</label>
            <input
              className="w-full px-3 py-2 rounded-md bg-white/5 text-white border border-white/10"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Camiseta Premium"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1">Precio Base</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 rounded-md bg-white/5 text-white border border-white/10"
              value={precioBase}
              onChange={(e) => setPrecioBase(e.target.value)}
              placeholder="Ej: 200.00"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-white/80 mb-1">Descripción</label>
            <textarea
              className="w-full px-3 py-2 rounded-md bg-white/5 text-white border border-white/10"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Detalles del producto"
            />
          </div>

          <div>
            <label className="block text-sm text-white/80 mb-1">Tipo de Producto</label>
            <div className="relative">
              <select
                className="appearance-none w-full px-3 py-2 pr-10 rounded-md bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                value={tipoProducto}
                onChange={(e) => setTipoProducto(e.target.value)}
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              >
                <option className="bg-[#17172e] text-white" value="fisico">Físico</option>
                <option className="bg-[#17172e] text-white" value="servicio">Servicio</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">▾</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1">Imagen (URL opcional)</label>
            <input
              className="w-full px-3 py-2 rounded-md bg-white/5 text-white border border-white/10"
              value={imagenUrl}
              onChange={(e) => setImagenUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-white/90">¿Tiene Variantes?</label>
          <button
            type="button"
            onClick={() => setTieneVariantes((v) => !v)}
            className="relative inline-flex h-6 w-11 items-center rounded-full"
            style={{ background: tieneVariantes ? "#10b981" : "#4b5563" }}
          >
            <span
              className="inline-block h-5 w-5 transform rounded-full bg-white transition"
              style={{ transform: tieneVariantes ? "translateX(20px)" : "translateX(1px)" }}
            />
          </button>
        </div>

        {!tieneVariantes && (
          <div>
            <label className="block text-sm text-white/80 mb-1">Stock Inicial</label>
            <input
              type="number"
              className="w-full px-3 py-2 rounded-md bg-white/5 text-white border border-white/10"
              value={stockInicial}
              onChange={(e) => setStockInicial(e.target.value)}
              placeholder="Ej: 10"
            />
          </div>
        )}

        {tieneVariantes && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-white/80 mb-1">Tallas</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {sizes.map((s) => (
                  <span key={s} className="px-2 py-1 rounded-full bg-white/10 text-white text-sm">
                    {s}
                    <button type="button" className="ml-2 text-white/70" onClick={() => removeTag(s, sizes, setSizes)}>×</button>
                  </span>
                ))}
              </div>
              <input
                className="w-full px-3 py-2 rounded-md bg-white/5 text-white border border-white/10"
                placeholder="Escribe una talla y presiona Enter (Ej: XL)"
                onKeyDown={(e) => addTagOnEnter(e, sizes, setSizes)}
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Colores</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {colors.map((c) => (
                  <span key={c} className="px-2 py-1 rounded-full bg-white/10 text-white text-sm">
                    {c}
                    <button type="button" className="ml-2 text-white/70" onClick={() => removeTag(c, colors, setColors)}>×</button>
                  </span>
                ))}
              </div>
              <input
                className="w-full px-3 py-2 rounded-md bg-white/5 text-white border border-white/10"
                placeholder="Escribe un color y presiona Enter (Ej: Verde)"
                onKeyDown={(e) => addTagOnEnter(e, colors, setColors)}
              />
            </div>

            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <table className="w-full">
                <thead style={{ background: "rgba(255,255,255,0.06)" }}>
                  <tr>
                    <th className="text-left px-5 py-3 text-white/80">Talla</th>
                    <th className="text-left px-5 py-3 text-white/80">Color</th>
                    <th className="text-left px-5 py-3 text-white/80">Nombre Variante</th>
                    <th className="text-left px-5 py-3 text-white/80">Stock</th>
                    <th className="text-left px-5 py-3 text-white/80">Ajuste Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {variantRows.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-4 text-white/60">Agrega tallas y colores para generar variantes.</td>
                    </tr>
                  )}
                  {variantRows.map((v, i) => (
                    <tr key={v.key} className="hover:bg-white/5 transition-colors" style={{ background: i % 2 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                      <td className="px-5 py-3 text-white">{v.talla}</td>
                      <td className="px-5 py-3 text-white">{v.color}</td>
                      <td className="px-5 py-3 text-white/80">{v.nombreVariante}</td>
                      <td className="px-5 py-3">
                        <input
                          type="number"
                          className="w-28 px-2 py-1 rounded-md bg-white/5 text-white border border-white/10"
                          value={v.stock}
                          onChange={(e) => onChangeVariantStock(v.key, Number(e.target.value))}
                          placeholder="0"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          type="number"
                          step="0.01"
                          className="w-28 px-2 py-1 rounded-md bg-white/5 text-white border border-white/10"
                          value={v.precioAjuste}
                          onChange={(e) => onChangeVariantPriceAdj(v.key, Number(e.target.value))}
                          placeholder="0.00"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="px-4 py-2 rounded-md font-semibold"
            style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-blue), var(--kallpa-purple))" }}
          >
            Crear Producto
          </button>
          <span className="text-white/60 text-sm">(Mira la consola para ver el JSON)</span>
        </div>
      </form>
    </div>
  );
}
