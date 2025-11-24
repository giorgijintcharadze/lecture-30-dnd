"use client";

import { useState } from "react";
import { COLUMNS, INITIAL_TASKS } from "../data/data";
import { Task } from "../types";
import Columne from "./Columne";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const Dndpage = () => {
  const [Tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      Tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  return (
    <div className="p-4">
      <div className="flex gap-8 ">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((Column) => (
            <Columne
              key={Column.id}
              column={Column}
              tasks={Tasks.filter((task) => task.status === Column.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default Dndpage;
