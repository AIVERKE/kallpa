import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-950 text-white">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            Kallpa AI
          </h1>
          <h2 className="mt-4 text-2xl font-medium text-zinc-300">
            Sistema de Ventas Inteligente
          </h2>
          <p className="mt-2 text-zinc-500">
            Gestión de inventario, CRM y ventas potenciado por IA.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-12">
          <Link
            href="/dashboard"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            Ingresar al Dashboard
          </Link>

          <div className="text-xs text-zinc-600 mt-8">
            <p>
              Backend Status: <span className="text-green-500">●</span>{" "}
              Conectado a PostgreSQL
            </p>
            <p>v0.1.0 Beta</p>
          </div>
        </div>
      </div>
    </div>
  );
}
