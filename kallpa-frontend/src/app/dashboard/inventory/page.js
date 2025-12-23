const products = [
  { name: "Polera Básica", sku: "MOD-001", stock: 24, priceBs: "Bs 120,00", status: "En stock" },
  { name: "Jeans Slim", sku: "MOD-002", stock: 8, priceBs: "Bs 230,00", status: "Bajo" },
  { name: "Zapatillas Urban", sku: "MOD-003", stock: 0, priceBs: "Bs 350,00", status: "Agotado" },
  { name: "Gorra Logo", sku: "MOD-004", stock: 56, priceBs: "Bs 80,00", status: "En stock" },
];

import Link from "next/link";

export default function InventoryPage() {
  return (
    <div className="anim-fade-in-up">
      <h2
        className="text-3xl font-extrabold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-blue), var(--kallpa-purple))" }}
      >
        Inventario
      </h2>
      <div className="mt-4 h-1 w-24 rounded-full" style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-yellow), var(--kallpa-orange))" }} />

      <div className="mt-6">
        <Link
          href="/dashboard/inventory/product-form"
          className="inline-block px-4 py-2 rounded-md font-semibold"
          style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-blue), var(--kallpa-purple))" }}
        >
          Crear Producto
        </Link>
      </div>

      <div className="mt-8 rounded-xl overflow-hidden anim-scale-in" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
        <table className="w-full">
          <thead style={{ background: "rgba(255,255,255,0.06)" }}>
            <tr>
              <th className="text-left px-5 py-3 text-white/80">Producto</th>
              <th className="text-left px-5 py-3 text-white/80">SKU</th>
              <th className="text-left px-5 py-3 text-white/80">Stock</th>
              <th className="text-left px-5 py-3 text-white/80">Precio (Bs)</th>
              <th className="text-left px-5 py-3 text-white/80">Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.sku} className="hover:bg-white/5 transition-colors" style={{ background: i % 2 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                <td className="px-5 py-3 text-white">{p.name}</td>
                <td className="px-5 py-3 text-white/80">{p.sku}</td>
                <td className="px-5 py-3 text-white/80">{p.stock}</td>
                <td className="px-5 py-3 font-semibold" style={{ color: "var(--kallpa-yellow)" }}>{p.priceBs}</td>
                <td className="px-5 py-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      background: p.status === "Agotado" ? "#ff4d4f" : p.status === "Bajo" ? "#f59e0b" : "#10b981",
                      color: "#111",
                    }}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
