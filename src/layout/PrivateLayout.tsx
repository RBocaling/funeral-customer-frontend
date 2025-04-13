import CompleteTaskModal from "@/components/profile/CompletePorfile";
import Header from "@/components/shared/Header";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <div className="flex min-h-screen w-full relative flex-col">
      <div className=" relative px-3 overflow-x-hidden">
        <Header />

        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <main className="pt-5 md:pt-7 md:container md:mx-auto ">
            <Outlet />
          </main>
          <CompleteTaskModal />
        </ThemeProvider>
       
      </div>
    </div>
  );
};

export default PrivateLayout;
