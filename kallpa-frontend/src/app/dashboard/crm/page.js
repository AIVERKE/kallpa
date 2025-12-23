const customers = [
  { name: "Juan Pérez", email: "juan@example.com", lastPurchaseBs: "Bs 120,00" },
  { name: "María Gómez", email: "maria@example.com", lastPurchaseBs: "Bs 540,00" },
  { name: "Carlos R.", email: "carlos@example.com", lastPurchaseBs: "Bs 75,00" },
  { name: "Ana L.", email: "ana@example.com", lastPurchaseBs: "Bs 230,00" },
];

export default function CrmPage() {
  return (
    <div className="anim-fade-in-up">
      <h2
        className="text-3xl font-extrabold bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-purple), var(--kallpa-blue))" }}
      >
        Clientes (CRM)
      </h2>
      <div className="mt-4 h-1 w-24 rounded-full" style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-yellow), var(--kallpa-orange))" }} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((c, i) => (
          <div
            key={c.email}
            className="rounded-xl p-6 anim-scale-in"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3 className="text-lg font-bold text-white/90">{c.name}</h3>
            <p className="text-white/70 mt-1">{c.email}</p>
            <p className="text-white mt-4 font-semibold" style={{ color: "var(--kallpa-yellow)" }}>{c.lastPurchaseBs}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
