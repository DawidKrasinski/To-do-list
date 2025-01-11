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

  return (
    <button
      style={{
        borderColor: priority.color,
        backgroundColor: isActive ? priority.color : "transparent",
        transition,
        transform: CSS.Transform.toString(transform),
      }}
      className={`flex-1 p-1 rounded-xl border-2 text-lg
        ${isActive ? `text-background` : ""}`}
      onClick={() => {
        onChange(priority.id);
      }}
      draggable={isDraggable}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {priority.name}
    </button>
  );
}
