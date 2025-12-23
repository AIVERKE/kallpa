"use client";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "linear-gradient(135deg, #0b0b18 0%, #0f0f25 100%)" }}>
      {/* Sidebar responsive */}
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Backdrop en móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-full">
        {/* Top bar con hamburguesa en móvil */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-3 py-2 rounded-md text-white bg-white/10 border border-white/10"
          >
            ☰ Menú
          </button>
        </div>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
