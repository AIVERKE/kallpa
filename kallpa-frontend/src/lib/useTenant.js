"use client";
import { useState, useEffect } from "react";

export function getTenant() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("kallpa_tenant_slug");
}

export function setTenant(slug) {
  if (typeof window === "undefined") return;
  localStorage.setItem("kallpa_tenant_slug", slug);
}

export function clearTenant() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("kallpa_tenant_slug");
}

export default function useTenant() {
  const [tenant, setTenantState] = useState(() => getTenant());

  useEffect(() => {
    const handler = () => setTenantState(getTenant());
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  function setTenantAndPersist(slug) {
    setTenant(slug);
    setTenantState(slug);
  }

  function clear() {
    clearTenant();
    setTenantState(null);
  }

  return { tenant, setTenant: setTenantAndPersist, clear };
}
