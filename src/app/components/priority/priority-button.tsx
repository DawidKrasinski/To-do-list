import { Priority } from "../../types/priorityType";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface PriorityButtonProps {
  priority: Priority;
  onChange: (priority: number) => void;
  isActive: boolean;
  isDraggable: boolean;
}

export function PriorityButton({
  priority,
  onChange,
  isActive,
  isDraggable,
}: PriorityButtonProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: priority.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderColor: priority.color,
    backgroundColor: isActive ? priority.color : "transparent",
  };

  console.log("Transform:", transform);
  console.log("Transition:", transition);

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`flex-1 p-1 rounded-xl border-2 text-lg
        ${isActive ? `text-background` : ""}`}
      onClick={() => {
        onChange(priority.id);
      }}
      draggable={isDraggable}
    >
      {priority.name}
    </button>
  );
}
