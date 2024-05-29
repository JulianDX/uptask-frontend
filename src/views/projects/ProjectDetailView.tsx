import { Link, useLocation, useParams } from "react-router-dom";
import { getProjectById, getTasks } from "@/api/ProjectApi";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import { TaskType } from "@/types/index";
import { useEffect, useState } from "react";
import { TaskCard } from "@/components/tasks/TaskCard";
import TaskDetail from "@/components/tasks/TaskDetail";

export const ProjectDetailView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();
  const projectId = params.projectId!;

  const paramsURL = new URLSearchParams(location.search);
  const taskModal3 = paramsURL.get("taskDetail")!;

  const { data, isError } = useQuery({
    queryKey: ["projectById", projectId],
    queryFn: () => getProjectById(projectId),
    retry: 1,
  });

  if (isError) navigate("/");

  const { isLoading: isLoadingTasks, data: dataTasks } = useQuery({
    queryFn: () => getTasks(projectId),
    queryKey: ["tasks"],
  });

  const tasks = dataTasks!;

  type taskGroups = {
    [key: string]: TaskType[];
  };

  const initialStatusGroups: taskGroups = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
  };

  const [groupedTasks, setGroupedTasks] = useState(initialStatusGroups);

  useEffect(() => {
    if (tasks) {
      const groupTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.taskStatus]
          ? [...acc[task.taskStatus]]
          : [];
        currentGroup = [...currentGroup, task];
        return { ...acc, [task.taskStatus]: currentGroup };
      }, initialStatusGroups);
      setGroupedTasks(groupTasks);
    }
  }, [tasks]);

  const statusTranslation: { [key: string]: string } = {
    pending: "Pendiente",
    onHold: "En Espera",
    inProgress: "En Progreso",
    underReview: "En Revisión",
    completed: "Completado",
  };

  const statusColors: { [key: string]: string } = {
    pending: "border-t-slate-500",
    onHold: "border-t-red-500",
    inProgress: "border-t-blue-500",
    underReview: "border-t-yellow-500",
    completed: "border-t-green-500",
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto">
        <div className="bg-white p-4 md:p-7 rounded-xl border-gray-100 shadow-lg">
          <h1 className="text-4xl font-black text-neutral-800">
            {data?.projectName}
          </h1>
          <p className="text-xl text-gray-600 mt-5 mb-10">
            {data?.description}
          </p>

          <nav className="my-5">
            <Link
              to={`${location.pathname}?createTask=true`}
              className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            >
              Agregar Tarea
            </Link>
            <AddTaskModal />
          </nav>
        </div>

        {isLoadingTasks ? (
          "Cargando..."
        ) : (
          <>
            <div className="p-5 pt-0">
              <h2 className="text-4xl font-black my-10 text-neutral-800">
                Tareas
              </h2>

              <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                  <div
                    key={status}
                    className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5"
                  >
                    <h3
                      className={`capitalize text-xl font-light border border-x-slate-300 bg-white p-3 border-t-8 ${statusColors[status]}`}
                    >
                      {statusTranslation[status]}
                    </h3>
                    <ul className="mt-5 space-y-5">
                      {tasks.length === 0 ? (
                        <li className="text-gray-500 text-center pt-3">
                          No Hay tareas
                        </li>
                      ) : (
                        tasks.map((task) => (
                          <TaskCard key={task._id} task={task} />
                        ))
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {taskModal3 && <TaskDetail />}
    </>
  );
};
