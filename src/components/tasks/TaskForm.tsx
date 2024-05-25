import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ErrorMessage";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createTask } from "@/api/ProjectApi";
import { TaskFormData } from "@/types/index";

export default function TaskForm() {
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  const location = useLocation();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskName: "",
      description: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: createTask,
    onError: (res) => {
      toast.error(res.message, {
        theme: "colored",
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(res.msg, {
        theme: "colored",
      });
      navigate(location.pathname, { replace: true });
    },
  });

  const handleForm = (data: TaskFormData) => mutate({ data, projectId });

  return (
    <>
      <form
        className="mt-6 flex flex-col gap-6"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label className="font-normal text-2xl" htmlFor="taskName">
            Nombre de la tarea
          </label>
          <input
            id="taskName"
            type="text"
            placeholder="Nombre de la tarea"
            className="w-full p-3  border-gray-300 border"
            {...register("taskName", {
              required: "El nombre de la tarea es obligatorio",
            })}
          />
          {errors.taskName && (
            <ErrorMessage>{errors.taskName.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-normal text-2xl" htmlFor="description">
            Descripción de la tarea
          </label>
          <textarea
            id="description"
            placeholder="Descripción de la tarea"
            className="w-full p-3  border-gray-300 border"
            {...register("description", {
              required: "La descripción de la tarea es obligatoria",
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
          <input
            className="bg-fuchsia-600 w-full mt-5 p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
            type="submit"
            value={"Crear Tarea"}
          />
        </div>
      </form>
    </>
  );
}
