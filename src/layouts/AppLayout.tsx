import { Link, Outlet } from "react-router-dom";
import { Logo } from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { ToastContainer } from "react-toastify";

export const AppLayout = () => {
  return (
    <>
      <header className="bg-gray-800 py-6 md:py-2">
        <div className="mx-auto max-w-screen-xl flex flex-col lg:flex-row justify-between items-center">
          <div className="w-64">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
          <div className="lg:pr-10">
            <NavMenu />
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-screen-xl mt-6 p-5">
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
