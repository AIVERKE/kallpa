const orders = [
  { id: "ORD-1001", customer: "Juan Pérez", totalBs: "Bs 320,00", status: "Pagado" },
  { id: "ORD-1002", customer: "María Gómez", totalBs: "Bs 180,00", status: "Pendiente" },
  { id: "ORD-1003", customer: "Carlos R.", totalBs: "Bs 1.020,00", status: "Pagado" },
  { id: "ORD-1004", customer: "Ana L.", totalBs: "Bs 75,00", status: "Cancelado" },
];

export default function SalesPage() {
  return (
    <div className="anim-fade-in-up">
      <h2
        className="text-3xl font-extrabold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-orange), var(--kallpa-purple))" }}
      >
        Ventas
      </h2>
      <div className="mt-4 h-1 w-24 rounded-full" style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-yellow), var(--kallpa-orange))" }} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((o, i) => (
          <div
            key={o.id}
            className="rounded-xl p-6 anim-scale-in"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white/90">{o.id}</h3>
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background:
                    o.status === "Pagado" ? "#10b981" : o.status === "Pendiente" ? "#f59e0b" : "#ef4444",
                  color: "#111",
                }}
              >
                {o.status}
              </span>
            </div>
            <p className="text-white/80 mt-2">Cliente: {o.customer}</p>
            <p className="text-white mt-4 font-semibold" style={{ color: "var(--kallpa-yellow)" }}>{o.totalBs}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
