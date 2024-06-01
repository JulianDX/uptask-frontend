import {
  ProjectFormData,
  ProjectSchema,
  ProjectsSchema,
  TaskFormData,
  TaskSchema,
  TasksSchema,
} from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createProject(data: ProjectFormData) {
  try {
    const { data: response } = await api.post("/projects/create", data);
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}

type editProjectProps = {
  projectId: string;
  data: ProjectFormData;
};

export async function editProject({ projectId, data }: editProjectProps) {
  try {
    const { data: response } = await api.put(
      `/projects/update/${projectId}`,
      data
    );
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api("/projects");
    const verify = ProjectsSchema.safeParse(data);
    if (verify.success) {
      return verify.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}

export async function getProjectById(projectId: string) {
  try {
    const { data } = await api(`/projects/${projectId}`);
    const verify = ProjectSchema.safeParse(data);
    if (verify.success) {
      return verify.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}

export async function deleteProject(_id: string) {
  try {
    const { data } = await api.delete(`/projects/delete/${_id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}

/* Tasks */

type TaskTypeProps = {
  data: TaskFormData;
  projectId: string;
  taskId: string;
  taskStatus: string;
};

export async function createTask({
  data,
  projectId,
}: Pick<TaskTypeProps, "data" | "projectId">) {
  try {
    const { data: response } = await api.post(
      `/projects/${projectId}/tasks`,
      data
    );
    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}

export async function editTask({
  data,
  projectId,
  taskId,
}: Pick<TaskTypeProps, "data" | "projectId" | "taskId">) {
  try {
    const { data: result } = await api.put(
      `/projects/${projectId}/tasks/${taskId}`,
      data
    );
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}

export async function deleteTask({
  projectId,
  taskId,
}: Pick<TaskTypeProps, "projectId" | "taskId">) {
  try {
    const { data: result } = await api.delete(
      `/projects/${projectId}/tasks/${taskId}`
    );
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}

export async function getTasks(projectId: string) {
  try {
    const { data } = await api(`/projects/${projectId}/tasks`);
    const verify = TasksSchema.safeParse(data);
    if (verify.success) {
      return verify.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}

export async function getTaskById(projectId: string, taskId: string) {
  try {
    const { data } = await api(`/projects/${projectId}/tasks/${taskId}`);
    const verify = TaskSchema.safeParse(data[0]);
    if (verify.success) {
      return verify.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}

export async function editTaskStatus({
  projectId,
  taskId,
  taskStatus,
}: Pick<TaskTypeProps, "projectId" | "taskId" | "taskStatus">) {
  try {
    const { data } = await api.put(
      `/projects/${projectId}/tasks/${taskId}/status`,
      {taskStatus}
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.request.response);
    }
  }
}
