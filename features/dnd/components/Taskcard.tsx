import React from "react";
import { TaskCardprops } from "../types";
import { useDraggable } from "@dnd-kit/core";

const Taskcard = ({ task }: TaskCardprops) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate (${transform.x} ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="rounded-lg bg-neutral-700 p-4 shadow-sm hover :shadow-md"
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="text-sm mt-2 text-neutral-400">{task.description}</p>
    </div>
  );
};

export default Taskcard;
