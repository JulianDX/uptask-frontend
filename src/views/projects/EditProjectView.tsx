import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";
import { editProject, getProjectById } from "@/api/ProjectApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const EditProjectView = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectById", projectId],
    queryFn: () => getProjectById(projectId),
    retry: 1,
  });

  if (isError) navigate("/");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      projectName: "",
      clientName: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description,
      });
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: editProject,
    onError: (res) => {
      toast.error(res.message, {
        theme: "colored",
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projectById", projectId] });
      toast.success(res, {
        theme: "colored",
      });
      navigate("/");
    },
  });

  const handleForm = (data: ProjectFormData) => mutate({ projectId, data });
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Actualizar Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para actualizar el Proyecto
        </p>

        <nav className="my-5">
          <Link
            to="/"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          >
            Ver Proyectos
          </Link>
        </nav>

        {isLoading ? (
          "Cargando..."
        ) : (
          <form
            className="mt-10 bg-white shadow-lg p-10 rounded-lg"
            onSubmit={handleSubmit(handleForm)}
            noValidate
          >
            <ProjectForm register={register} errors={errors} />
            <input
              className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
              type="submit"
              value={"Actualizar Proyecto"}
            />
          </form>
        )}
      </div>
    </>
  );
};
