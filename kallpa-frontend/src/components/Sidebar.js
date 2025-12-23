"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import useTenant from "@/lib/useTenant";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Tiendas (Tenants)", href: "/dashboard/tenants" },
  { name: "Inventario", href: "/dashboard/inventory" },
  { name: "CRM (Clientes)", href: "/dashboard/crm" },
  { name: "Ventas (Órdenes)", href: "/dashboard/sales" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { clear } = useTenant();

  function onLogout() {
    clear();
    router.push('/');
  }

  return (
    <aside
      className="w-64 text-white min-h-screen p-4 flex flex-col"
      style={{
        background: "linear-gradient(180deg, var(--kallpa-indigo-dark) 0%, var(--kallpa-purple) 100%)",
        borderRight: "3px solid var(--kallpa-blue)",
      }}
    >
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2">
          <img src="/kallpa.png" alt="Kallpa" className="h-12 w-auto" />
          <h1
            className="text-2xl font-extrabold bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, var(--kallpa-blue), var(--kallpa-orange))",
            }}
          >
            Kallpa AI
          </h1>
        </div>
        <p className="text-xs text-white/70">Ventas inteligentes para tu negocio</p>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const active = pathname && pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              } flex items-center gap-3 px-4 py-3 rounded-lg transition-colors`}
            >
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-8 border-t border-white/10 px-2">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md"
          style={{
            backgroundImage: "linear-gradient(90deg, var(--kallpa-yellow), var(--kallpa-orange))",
            color: "#111",
          }}
        >
          <span>🚪</span> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
