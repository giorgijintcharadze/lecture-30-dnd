"use client";

import { useDraggable } from "@dnd-kit/core";
import { TaskCardProps } from "../types";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  // const style = transform
  //   ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
  //   : undefined;

  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="rounded-lg bg-neutral-700 p-4 shadow-sm hover :shadow-md"
      style={style}
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="text-sm mt-2 text-neutral-400">{task.description}</p>
    </div>
  );
};

export default TaskCard;
