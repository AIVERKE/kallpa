"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import useTenant from "@/lib/useTenant";
import OrderCard from "@/components/OrderCard";

export default function OrdersPage() {
  const { tenant } = useTenant();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/orders");
        const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        if (!cancelled) setOrders(list);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Error al cargar órdenes");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchOrders();
    return () => {
      cancelled = true;
    };
  }, [tenant]);

  return (
    <div className="anim-fade-in-up">
      <h2 className="text-3xl font-extrabold bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-blue), var(--kallpa-orange))" }}>
        Órdenes
      </h2>
      <div className="mt-2 h-1 w-24 rounded-full" style={{ backgroundImage: "linear-gradient(90deg, var(--kallpa-yellow), var(--kallpa-orange))" }} />

      {loading && (
        <div className="mt-8 text-white/80">Cargando órdenes…</div>
      )}
      {error && (
        <div className="mt-8 text-red-300">{error}</div>
      )}

      {!loading && !error && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order?.id ?? order?.order_id ?? Math.random()} data={order} />
          ))}
          {orders.length === 0 && (
            <div className="text-white/70">No hay órdenes para mostrar.</div>
          )}
        </div>
      )}
    </div>
  );
}
