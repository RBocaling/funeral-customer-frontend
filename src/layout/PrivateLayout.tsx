import CompleteTaskModal from "@/components/profile/CompletePorfile";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <div className="flex-1 relative px-3">
        <Header />

        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <main className="pt-7 container mx-auto">
            <Outlet />
          </main>
          <CompleteTaskModal />
        </ThemeProvider>
        {/* <img
          src="/transparent-hive.png"
          alt=""
          className="md:h-full w-full md:w-auto absolute bottom-20 md:top-0 -right-10 md:-right-40 opacity-5 object-contain -z-10"
        />
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient opacity-10 -z-10" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient opacity-10 -z-10 bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient opacity-10 -z-10" /> */}
      </div>
    </div>
  );
};

export default PrivateLayout;
