"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setTenant, getTenant } from "@/lib/useTenant";

const TENANTS = [
  { label: "Moda Paceña", slug: "moda-pacena" },
  { label: "Tecno Store", slug: "tecno-store" },
];

export default function LoginPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(TENANTS[0].slug);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    // If already logged (dev), redirect to dashboard
    const existing = getTenant();
    if (existing) router.push("/dashboard");
  }, [router]);

  function onSubmit(e) {
    e.preventDefault();
    setTenant(selected);
    router.push("/dashboard");
  }

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  function onRegister(e) {
    e.preventDefault();
    // collect registration info from form fields
    const form = e.target;
    const company = form.company?.value || "";
    const owner = form.owner?.value || "";
    const businessType = form.businessType?.value || "";
    const slug = slugify(company || owner) || "new-tenant";
    // persist registration (dev) and set tenant
    try {
      localStorage.setItem(
        "kallpa_registration",
        JSON.stringify({ company, owner, businessType, slug })
      );
    } catch (err) {}
    setTenant(slug);
    router.push("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center noche-diffuse-bg">
      <div className="w-full max-w-6xl mx-4 rounded-xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[720px]">
          {/* Left column with slide animation */}
          <div className="hidden md:block relative">
            <div className="absolute inset-0 overflow-hidden">
              {/* Image panel (Login helper) */}
              <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${isRegister ? '-translate-x-full' : 'translate-x-0'}`}>
                <div className="w-full h-full">
                  <img src="/noche.webp" alt="noche" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 flex flex-col justify-center px-16 text-white bg-black/25">
                    <div className="max-w-lg">
                      <h1 className="text-4xl font-extrabold mb-4">¿No tienes cuenta?</h1>
                      <p className="text-base opacity-90 mb-6">Registra tu negocio para acceder a todas las funcionalidades. Administra tu empresa en un solo lugar.</p>
                      <div className="mt-4">
                        <button onClick={() => setIsRegister(true)} className="inline-block px-6 py-3 rounded-md font-medium" style={{ background: "linear-gradient(90deg,var(--kallpa-yellow) 0%, var(--kallpa-orange) 100%)", color: '#111' }}>Regístrate</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Register form panel */}
              <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${isRegister ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="w-full h-full flex items-center justify-center px-16 pt-24 pb-12">
                  <div className="w-full max-w-md mx-auto px-6">
                    <div className="mb-4 text-center">
                      <img src="/kallpa.png" alt="Kallpa" className="mx-auto mb-1 w-56 h-auto" />
                      <h3 className="text-2xl font-semibold">Registrar tu negocio</h3>
                    </div>

                    <form onSubmit={onRegister} name="registerForm">
                      <label className="block text-sm text-zinc-300 mb-2">Nombre de la empresa</label>
                      <input name="company" className="w-full px-4 py-3 bg-transparent border-b border-zinc-600 mb-3 focus:outline-none text-white" required />

                      <label className="block text-sm text-zinc-300 mb-2">Titular / Propietario</label>
                      <input name="owner" className="w-full px-4 py-3 bg-transparent border-b border-zinc-600 mb-3 focus:outline-none text-white" required />

                      <label className="block text-sm text-zinc-300 mb-2">Tipo de negocio</label>
                      <input name="businessType" className="w-full px-4 py-3 bg-transparent border-b border-zinc-600 mb-3 focus:outline-none text-white" />

                      <label className="block text-sm text-zinc-300 mb-2">Email de contacto</label>
                      <input name="email" type="email" className="w-full px-4 py-3 bg-transparent border-b border-zinc-600 mb-3 focus:outline-none text-white" />

                      <label className="block text-sm text-zinc-300 mb-2">Contraseña</label>
                      <input name="password" type="password" className="w-full px-4 py-3 bg-transparent border-b border-zinc-600 mb-5 focus:outline-none text-white" required />

                      <div className="flex gap-4">
                        <button type="submit" className="flex-1 py-3 rounded-md font-semibold text-black" style={{ background: "linear-gradient(90deg,var(--kallpa-yellow) 0%, var(--kallpa-orange) 100%)" }}>Registrar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column with slide animation */}
          <div className="relative flex items-center justify-center bg-gradient-to-b from-black/40 via-black/30 to-black/20 overflow-hidden">
            {/* Login form panel */}
            <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out ${isRegister ? '-translate-x-full' : 'translate-x-0'}`}>
              <div className="w-full max-w-md mx-auto px-6 pt-24 pb-12">
                <form onSubmit={onSubmit} className="w-full">
                  <div className="mb-4 text-center">
                      <img src="/kallpa.png" alt="Kallpa" className="mx-auto mb-1 w-56 h-auto" />
                    <h3 className="text-2xl font-semibold">Iniciar sesión</h3>
                  </div>

                  <label className="block text-sm text-zinc-300 mb-2">Email</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border-b border-zinc-600 mb-3 focus:outline-none text-white"
                    placeholder="Correo@ejemplo.com"
                    required
                  />

                  <label className="block text-sm text-zinc-300 mb-2">Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border-b border-zinc-600 mb-3 focus:outline-none text-white"
                    placeholder="●●●●●●●●"
                    required
                  />

                  <label className="block text-sm text-zinc-300 mb-2">Tienda</label>
                  <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border-b border-zinc-600 mb-5 focus:outline-none text-white dark-select"
                  >
                    {TENANTS.map((t) => (
                      <option key={t.slug} value={t.slug}>{t.label}</option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-md font-semibold mb-3 text-white"
                    style={{ background: "linear-gradient(90deg,var(--kallpa-purple) 0%, var(--kallpa-orange) 100%)" }}
                  >
                    Iniciar sesión
                  </button>

                  <div className="flex items-center justify-between text-sm text-zinc-400">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="form-checkbox" /> Recuérdame
                    </label>
                    <button type="button" onClick={() => setIsRegister(true)} className="text-zinc-100/80">Regístrate</button>
                  </div>

                  <p className="mt-6 text-sm text-zinc-400">Modo desarrollo: cualquier credencial funcionará. La tienda seleccionada se guarda como tenant.</p>
                </form>
              </div>
            </div>

            {/* Register helper image with message */}
            <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${isRegister ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="w-full h-full">
                <img src="/noche.webp" alt="noche" className="object-cover w-full h-full" />
                <div className="absolute inset-0 flex flex-col justify-center px-16 text-white bg-black/30">
                  <div className="max-w-lg ml-auto">
                    <h1 className="text-4xl font-extrabold mb-4">¿Ya tienes cuenta?</h1>
                    <p className="text-base opacity-90 mb-6">Inicia sesión para gestionar tu negocio y continuar donde lo dejaste.</p>
                    <div className="mt-4">
                      <button onClick={() => setIsRegister(false)} className="inline-block px-6 py-3 rounded-md font-medium" style={{ background: "linear-gradient(90deg,var(--kallpa-purple) 0%, var(--kallpa-orange) 100%)" }}>Iniciar sesión</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
