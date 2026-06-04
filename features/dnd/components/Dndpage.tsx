"use client";

import { useState } from "react";
import { COLUMNS } from "../data/data";
import { Task } from "../types";
import Columne from "./Columne";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, fetchTask, updateTask } from "../api/DndApi";

const DndPage = () => {
  const QueryClient = useQueryClient();

  // const [Tasks, setTasks] = useState<Task[]>([]);

  const {
    data: Tasks = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["DnDTask"],
    queryFn: fetchTask,
  });

  const { mutate } = useMutation({
    mutationFn: (updatedTask: Task) => updateTask(updatedTask.id, updatedTask),
    onSuccess: () => QueryClient.invalidateQueries({ queryKey: ["DnDTask"] }),
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => QueryClient.invalidateQueries({ queryKey: ["DnDTask"] }),
  });

  const handleCreateTasks = (newTasks: Omit<Task, "id">) => {
    createMutation.mutate(newTasks);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    const Task = Tasks.find((task) => task.id === taskId);

    // setTasks(() =>
    //   Tasks.map((task) =>
    //     task.id === taskId ? { ...task, status: newStatus } : task,
    //   ),
    // );

    if (!Task || Task.status === newStatus) return;

    const updatedTask = { ...Task, status: newStatus };

    mutate(updatedTask);
  }

  if (isLoading) return <div>Pending....</div>;
  return (
    <div className="p-4">
      <div className="flex gap-8 ">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((Column) => (
            <Columne
              key={Column.id}
              column={Column}
              tasks={Tasks.filter((task) => task.status === Column.id)}
              handleCreateTask={handleCreateTasks}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default DndPage;
