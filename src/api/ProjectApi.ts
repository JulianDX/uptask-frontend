import { ProjectFormData } from "@/types/index";
import api from "@/lib/axios";

export async function createProject(data: ProjectFormData) {
  try {
    const { data: response } = await api.post("/projects/create", data);
    console.log(response)
  } catch (error) {
    console.log(error);
  }
}
