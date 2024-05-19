import { Outlet } from "react-router-dom";
import { Logo } from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { ToastContainer } from "react-toastify";

export const AppLayout = () => {
  return (
    <>
      <header className="bg-gray-800 py-1">
        <div className="mx-auto max-w-screen-2xl flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Logo />
          </div>
          <div className="pr-10">
            <NavMenu />
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-screen-2xl mt-10 p-5">
        <Outlet />
      </section>
      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados. {new Date().getFullYear()}
        </p>
      </footer>
      <ToastContainer draggable />
    </>
  );
};
