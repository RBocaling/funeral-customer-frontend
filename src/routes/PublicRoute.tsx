import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  // const user = "";

  //   if (isLoading) return <div>Loading...</div>;
  return (
    <div className="bg-black flex ">
      <div className="w-full md:w-1/2">
        <Outlet />
      </div>

      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img src="/side-img.png" alt="" />
      </div>
    </div>
  );
}
