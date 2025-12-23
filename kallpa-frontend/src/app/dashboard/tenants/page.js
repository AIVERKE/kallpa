"use client";

import useTenant from "@/lib/useTenant";

const TENANT_DETAILS = {
  "moda-pacena": {
    name: "Moda Paceña",
    description: "Boutique de moda urbana y casual.",
    address: "Av. Principal 123",
    phone: "+591 700-00000",
    color: "var(--kallpa-purple)",
  },
  "tecno-store": {
    name: "Tecno Store",
    description: "Electrónica y accesorios tecnológicos.",
    address: "C. Tecnología 456",
    phone: "+591 701-11111",
    color: "var(--kallpa-blue)",
  },
};

export default function TenantsPage() {
  const { tenant } = useTenant();
  const details = tenant ? TENANT_DETAILS[tenant] : null;

  return (
    <div className="anim-fade-in-up">
      <h2
        className="text-3xl font-extrabold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-blue), var(--kallpa-purple))" }}
      >
        Tiendas (Tenants)
      </h2>
      <div className="mt-4 h-1 w-24 rounded-full" style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-yellow), var(--kallpa-orange))" }} />

      {details ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-xl p-6 anim-scale-in"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3 className="text-xl font-bold" style={{ color: details.color }}>{details.name}</h3>
            <p className="text-white/80 mt-2">{details.description}</p>
            <div className="mt-4 text-white/70">
              <p><strong>Dirección:</strong> {details.address}</p>
              <p className="mt-1"><strong>Teléfono:</strong> {details.phone}</p>
              <p className="mt-1"><strong>Slug:</strong> {tenant}</p>
            </div>
          </div>
          <div
            className="rounded-xl p-6 anim-slide-in-right"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h4 className="text-lg font-semibold">Resumen</h4>
            <ul className="mt-3 space-y-2 text-white/75">
              <li>Productos activos: 128</li>
              <li>Órdenes del día: 12</li>
              <li>Clientes registrados: 560</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-8 rounded-xl p-6 anim-scale-in" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white/80">No hay tienda seleccionada. Vuelve al login y elige una tienda.</p>
        </div>
      )}
    </div>
  );
}
