import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editTaskStatus, getTaskById } from "@/api/ProjectApi";
import { ChangeEvent, Fragment, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { formatMongoDate } from "@/utils/index";
import { toast } from "react-toastify";

export default function TaskDetail() {
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();

  const paramsURL = new URLSearchParams(location.search);
  const taskId = paramsURL.get("taskDetail")!;

  const visible = taskId ? true : false;
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editTaskStatus,
    onError: (res) => {
      toast.error(res.message, {
        theme: "colored",
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(res.msg, {
        theme: "colored",
      });
      navigate(location.pathname, { replace: true });
    },
  });

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

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const object = {
      projectId,
      taskId,
      taskStatus: e.target.value,
    };
    mutate(object);
  };

  return (
    <>
      {isLoading ? (
        "Cargando..."
      ) : (
        <>
          <Transition appear show={visible} as={Fragment}>
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
                      <p className="text-sm text-slate-700 font-semibold">
                        Agregada el:{" "}
                        <span className="font-normal">
                          {formatMongoDate(data?.createdAt!)}
                        </span>
                      </p>
                      <p className="text-sm text-slate-700 font-semibold">
                        Última actualización:{" "}
                        <span className="font-normal">
                          {formatMongoDate(data?.updatedAt!)}
                        </span>
                      </p>
                      <DialogTitle
                        as="h3"
                        className="font-black text-4xl text-slate-600 my-5"
                      >
                        {data?.taskName}
                      </DialogTitle>
                      <p className="text-lg text-slate-700 mb-2">
                        {data?.description}
                      </p>
                      <div className="my-5 space-y-3">
                        <label className="font-bold">
                          Estado Actual:{" "}
                          <span className="font-semibold">
                            {statusTranslation[`${data?.taskStatus}`]}
                          </span>
                        </label>
                      </div>
                      <div className="my-5 space-y-3 flex flex-col">
                        <label htmlFor="state" className="font-bold">
                          Modificar Estado:
                        </label>
                        <select
                          name="state"
                          id="state"
                          className="border border-solid border-slate-400 rounded-xl p-2"
                          defaultValue={data?.taskStatus}
                          onChange={(e) => handleChange(e)}
                        >
                          {Object.entries(statusTranslation).map((object) => (
                            <option key={object[0]} value={object[0]}>
                              {object[1]}
                            </option>
                          ))}
                        </select>
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
