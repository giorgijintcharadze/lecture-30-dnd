import React from "react";
import Taskcard from "./Taskcard";
import { ColumnProps } from "../types";
import { DndContext, useDroppable } from "@dnd-kit/core";

const Columne = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div className="flex w80 flex-col rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div
        className="flex flex-1 flex-col gap-4"
        ref={setNodeRef}
        style={style}
      >
        {tasks.map((task) => (
          <Taskcard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Columne;
