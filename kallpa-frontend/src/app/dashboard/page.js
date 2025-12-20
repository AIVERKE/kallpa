"use client";

import useTenant from "@/lib/useTenant";
import Link from "next/link";

export default function DashboardPage() {
  const { tenant } = useTenant();

  const tenantLabel =
    tenant === "moda-pacena" ? "Moda Paceña" : tenant === "tecno-store" ? "Tecno Store" : null;

  return (
    <div className="anim-fade-in-up">
      {/* Header */}
      <div className="mb-8">
        <h2
          className="text-4xl font-extrabold bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, var(--kallpa-blue), var(--kallpa-purple))",
          }}
        >
          Panel de Control
        </h2>
        {tenantLabel && (
          <p className="text-sm text-white/70 mt-1">Tenancy activo: <strong>{tenantLabel}</strong></p>
        )}
        <div
          className="mt-4 h-1 w-36 rounded-full"
          style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-yellow), var(--kallpa-orange))" }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Ventas Hoy", value: "Bs 1.250,00", accent: "var(--kallpa-blue)" },
          { title: "Órdenes", value: "12", accent: "var(--kallpa-purple)" },
          { title: "Clientes Nuevos", value: "5", accent: "var(--kallpa-yellow)" },
          { title: "Alertas Stock", value: "3", accent: "var(--kallpa-orange)" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-xl p-6 anim-scale-in"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3 className="text-sm font-medium text-white/80">{stat.title}</h3>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            <div className="h-1 w-full mt-4 rounded-full opacity-30" style={{ background: stat.accent }}>
              <div className="h-1 w-1/2 rounded-full" style={{ background: stat.accent }} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 anim-slide-in-right">
        {[
          { label: "Inventario", href: "/dashboard/inventory", bg: "var(--kallpa-blue)" },
          { label: "Ventas", href: "/dashboard/sales", bg: "var(--kallpa-orange)" },
          { label: "Clientes", href: "/dashboard/crm", bg: "var(--kallpa-purple)" },
          { label: "Tiendas", href: "/dashboard/tenants", bg: "var(--kallpa-yellow)", darkText: true },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-lg px-5 py-4 font-semibold text-center"
            style={{
              background: link.bg,
              color: link.darkText ? "#111" : "#fff",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Usage & Control Statistics */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage summary */}
        <div
          className="rounded-xl p-6 anim-slide-in-left"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 className="text-lg font-bold">Estadísticas de Uso</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Usuarios activos hoy</span>
              <span className="font-semibold" style={{ color: "var(--kallpa-yellow)" }}>84</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Nuevos registros</span>
              <span className="font-semibold" style={{ color: "var(--kallpa-yellow)" }}>12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Sesiones</span>
              <span className="font-semibold" style={{ color: "var(--kallpa-yellow)" }}>245</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Retención 7 días</span>
              <span className="font-semibold" style={{ color: "var(--kallpa-yellow)" }}>62%</span>
            </div>
          </div>
        </div>

        {/* Module usage */}
        <div
          className="rounded-xl p-6 anim-scale-in"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 className="text-lg font-bold">Uso por Módulo</h3>
          <div className="mt-4 space-y-4">
            {[{ label: "Inventario", color: "var(--kallpa-blue)", pct: 40 }, { label: "Ventas", color: "var(--kallpa-orange)", pct: 35 }, { label: "CRM", color: "var(--kallpa-purple)", pct: 25 }].map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">{m.label}</span>
                  <span className="text-white/70">{m.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 mt-2 overflow-hidden">
                  <div className="h-2 rounded-full" style={{ width: `${m.pct}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Control actions */}
        <div
          className="rounded-xl p-6 anim-slide-in-right"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 className="text-lg font-bold">Acciones Destacadas</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: "Productos editados", value: 32, color: "var(--kallpa-blue)" },
              { label: "Órdenes creadas", value: 18, color: "var(--kallpa-orange)" },
              { label: "Clientes añadidos", value: 9, color: "var(--kallpa-purple)" },
              { label: "Alertas atendidas", value: 5, color: "var(--kallpa-yellow)" },
            ].map((a) => (
              <div key={a.label} className="rounded-lg px-4 py-3" style={{ background: "rgba(255,255,255,0.06)" }}>
                <p className="text-white/80 text-sm">{a.label}</p>
                <p className="text-xl font-bold" style={{ color: a.color }}>{a.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
