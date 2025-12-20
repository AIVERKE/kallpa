import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor that injects the X-Tenant-Slug header
// reading from localStorage when running in the browser.
if (typeof window !== "undefined") {
  api.interceptors.request.use(
    (config) => {
      try {
        const tenant = localStorage.getItem("kallpa_tenant_slug");
        if (tenant) {
          config.headers = config.headers || {};
          config.headers["X-Tenant-Slug"] = tenant;
        }
      } catch (e) {
        // ignore localStorage errors in restrictive environments
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

export default api;
