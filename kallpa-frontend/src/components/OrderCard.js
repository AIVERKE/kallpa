"use client";

import React from "react";

function formatBs(amount) {
  if (amount == null) return "Bs. 0.00";
  const num = typeof amount === "number" ? amount : parseFloat(String(amount).replace(/[^0-9.,-]/g, "").replace(",", "."));
  if (Number.isNaN(num)) return typeof amount === "string" ? amount : "Bs. 0.00";
  return `Bs. ${num.toFixed(2)}`;
}

function statusBadgeClasses(status) {
  const s = (status || "").toUpperCase();
  if (s === "PENDIENTE_PAGO" || s === "PENDIENTE" || s === "PENDING") return "bg-yellow-100 text-yellow-800 border-yellow-300";
  if (s === "PAGADO" || s === "PAID") return "bg-green-100 text-green-800 border-green-300";
  if (s === "ENTREGADO" || s === "DELIVERED") return "bg-blue-100 text-blue-800 border-blue-300";
  return "bg-gray-100 text-gray-800 border-gray-300";
}

function methodBadge(method) {
  const m = (method || "").toUpperCase();
  if (m.includes("QR")) return { label: "QR", classes: "bg-purple-100 text-purple-800 border-purple-300", icon: "🔳" };
  if (m.includes("EFECTIVO") || m.includes("CASH")) return { label: "Efectivo", classes: "bg-slate-100 text-slate-800 border-slate-300", icon: "💵" };
  // Contraentrega / COD
  if (m.includes("CONTRAENTREGA") || m.includes("COD") || m.includes("ENTREGA")) return { label: "Contraentrega", classes: "bg-slate-100 text-slate-800 border-slate-300", icon: "📦" };
  return { label: "Método", classes: "bg-gray-100 text-gray-800 border-gray-300", icon: "💳" };
}

function itemsSummary(items) {
  if (!Array.isArray(items) || items.length === 0) return "—";
  const parts = items.map((it) => {
    const name = it?.name || it?.product_name || it?.title || "Producto";
    const qty = it?.qty ?? it?.quantity ?? 1;
    return `${name} x${qty}`;
  });
  const preview = parts.slice(0, 3).join(", ");
  const more = parts.length > 3 ? ` +${parts.length - 3} más` : "";
  return preview + more;
}

export default function OrderCard({ data }) {
  const id = data?.id ?? data?.order_id ?? data?.code ?? "—";
  const customer = data?.customer_name ?? data?.customerName ?? data?.customer?.name ?? data?.client_name ?? "Cliente";
  const total = data?.total ?? data?.total_amount ?? data?.amount ?? data?.total_bs;
  const status = data?.estado ?? data?.status ?? "";
  const items = data?.items ?? data?.order_items ?? [];
  const payMethodRaw = data?.payment_method ?? data?.paymentMethod ?? data?.metodo_pago ?? "";
  const method = methodBadge(payMethodRaw);

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white/80 backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">Orden</div>
          <div className="text-xl font-bold text-gray-900">#{id}</div>
          <div className="mt-1 text-gray-700">{customer}</div>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full border ${statusBadgeClasses(status)}`}>{(status || "").replace(/_/g, " ")}</span>
      </div>

      <div className="mt-4">
        <div className="text-gray-500 text-sm">Total</div>
        <div className="text-2xl font-semibold text-gray-900">{formatBs(total)}</div>
      </div>

      <div className="mt-3">
        <div className="text-gray-500 text-sm">Resumen</div>
        <div className="text-gray-800">{itemsSummary(items)}</div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className={`px-2 py-1 text-xs rounded-full border ${method.classes}`}>{method.icon} {method.label}</span>
      </div>
    </div>
  );
}
