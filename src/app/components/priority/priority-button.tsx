import { Priority } from "../../priorityType";
interface PriorityButtonProps {
  priority: Priority;
  onChange: (priority: number) => void;
  isActive: boolean;
}

export function PriorityButton({
  priority,
  onChange,
  isActive,
}: PriorityButtonProps) {

  return (
    <button
      style={{
        borderColor: priority.color,
        backgroundColor: isActive ? priority.color : "transparent",
      }}
      className={`flex-1 p-1 rounded-xl border-2 text-lg
        ${isActive ? `text-background` : ""}`}
      onClick={() => onChange(priority.id)}
    >
      {priority.name}
    </button>
  );
}
