export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
        Panel de Control
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        {[
          { title: "Ventas Hoy", value: "S/ 0.00", color: "bg-blue-500" },
          { title: "Órdenes", value: "0", color: "bg-green-500" },
          { title: "Clientes Nuevos", value: "0", color: "bg-purple-500" },
          { title: "Alertas Stock", value: "0", color: "bg-red-500" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800"
          >
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">
              {stat.value}
            </p>
            <div
              className={`h-1 w-full mt-4 rounded-full ${stat.color} opacity-20`}
            >
              <div className={`h-1 w-1/2 rounded-full ${stat.color}`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
        <p className="text-zinc-500">
          Selecciona un módulo en el menú lateral para comenzar.
        </p>
      </div>
    </div>
  );
}
