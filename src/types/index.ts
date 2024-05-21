import { z } from "zod";

/* Projects */

export const ProjectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export const ProjectsSchema = z.array(ProjectSchema);

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectFormData = Pick<
  Project,
  "projectName" | "clientName" | "description"
>;

/* Tasks */

export const TaskSchema = z.object({
  _id: z.string(),
  taskName: z.string(),
  description: z.string(),
  taskStatus: z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])
});

export const TasksSchema = z.array(TaskSchema);

export type TaskType = z.infer<typeof TaskSchema>

export type TaskFormData = Pick<
  TaskType,
  "taskName" | "description"
>;