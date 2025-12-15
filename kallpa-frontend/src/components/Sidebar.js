import Link from "next/link";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: "🏠" },
  { name: "Tiendas (Tenants)", href: "/dashboard/tenants", icon: "🏪" },
  { name: "Inventario", href: "/dashboard/inventory", icon: "📦" },
  { name: "CRM (Clientes)", href: "/dashboard/crm", icon: "👥" },
  { name: "Ventas (Órdenes)", href: "/dashboard/sales", icon: "💰" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white min-h-screen p-4">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Kallpa AI 🦅
        </h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-8 border-t border-zinc-800 px-2">
        <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
          <span>🚪</span> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
