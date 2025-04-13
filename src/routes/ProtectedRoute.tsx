import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


    // if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
