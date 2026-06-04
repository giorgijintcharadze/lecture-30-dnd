import z from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
});

export type TaskForm = z.infer<typeof TaskSchema>;
