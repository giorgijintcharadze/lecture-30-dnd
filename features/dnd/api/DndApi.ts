import { Task } from "../types";

const URL = "https://6849a4af45f4c0f5ee725544.mockapi.io/Dndkit";

export const fetchTask = async (): Promise<Task[]> => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("server error");

  return res.json();
};

export const updateTask = async (taskID: string, updates: Partial<Task>) => {
  const res = await fetch(`${URL}/${taskID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("failed to update");

  return res.json();
};

export const createTask = async (newTask: Omit<Task, "id">): Promise<Task> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  if (!res.ok) throw new Error("failed to create post");
  return res.json();
};
