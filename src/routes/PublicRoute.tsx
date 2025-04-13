import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  console.log("isAuthenticated",isAuthenticated);
  
  return !isAuthenticated ? (
    <div className="bg-black flex">
      <div className="w-full md:w-1/2">
        <Outlet />
      </div>
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img src="/side-img.png" alt="" />
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}
