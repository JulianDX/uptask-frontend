import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTaskById } from "@/api/ProjectApi";
import { Fragment, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { formatMongoDate } from "@/utils/index";

export default function TaskDetail() {
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();

  const paramsURL = new URLSearchParams(location.search);
  const taskId = paramsURL.get("taskDetail")!;

  const visible = taskId ? true : false;

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getTaskById(projectId, taskId),
    queryKey: ["task", taskId],
    retry: false,
  });

  useEffect(() => {
    if (!data && isError) navigate(location.pathname, { replace: true });
  }, [data, isError]);

  const statusTranslation: { [key: string]: string } = {
    pending: "Pendiente",
    onHold: "En Espera",
    inProgress: "En Progreso",
    underReview: "En Revisión",
    completed: "Completado",
  };

  return (
    <>
      {isLoading ? (
        "Cargando..."
      ) : (
        <>
          <Transition appear show={visible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(`${location.pathname}`)}>
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
                      <p className="text-sm text-slate-400">Agregada el:{" "}{formatMongoDate(data?.createdAt!)}</p>
                      <p className="text-sm text-slate-400">
                        Última actualización:{" "}{data?.updatedAt}
                      </p>
                      <DialogTitle
                        as="h3"
                        className="font-black text-4xl text-slate-600 my-5"
                      >
                        {data?.taskName}
                      </DialogTitle>
                      <p className="text-lg text-slate-500 mb-2">
                        {data?.description}
                      </p>
                      <div className="my-5 space-y-3">
                        <label className="font-bold">Estado Actual: {statusTranslation[`${data?.taskStatus}`]}</label>
                      </div>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )}
    </>
  );
}
