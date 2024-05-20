import { ProjectFormData, ProjectSchema, ProjectsSchema } from "@/types/index";
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
