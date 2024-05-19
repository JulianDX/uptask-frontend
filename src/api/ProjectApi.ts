import { ProjectFormData } from "@/types/index";
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
