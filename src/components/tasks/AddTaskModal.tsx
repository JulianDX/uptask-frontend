import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useLocation, useNavigate } from "react-router-dom";
import TaskForm from "./TaskForm";
import EditTaskForm from "./EditTaskForm";

export default function AddTaskModal() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const taskModal = params.get("createTask");
  const taskModal2 = params.get("editTask");

  const navigate = useNavigate();

  return (
    <>
      <Transition
        appear
        show={taskModal || taskModal2 ? true : false}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(`${location.pathname}`)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <DialogTitle as="h3" className="font-black text-3xl mb-5">
                    {taskModal2 ? "Editar Tarea" : "Nueva Tarea"}
                  </DialogTitle>

                  <p className="text-xl font-bold">
                    {!taskModal2
                      ? "Llena el formulario y crea"
                      : "Realiza cambios y edita"}{" "}
                    {""}
                    <span className="text-fuchsia-600">una tarea</span>
                  </p>
                  {taskModal2 ? <EditTaskForm /> : <TaskForm />}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
