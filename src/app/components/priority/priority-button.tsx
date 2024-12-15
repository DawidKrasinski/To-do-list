import { Priority } from "../../priorityType";
interface PriorityButtonProps {
  priority: Priority;
  handlePriorityChange: (priority: number) => void;
  isActive: boolean;
}

export function PriorityButton({
  priority,
  handlePriorityChange,
  isActive,
}: PriorityButtonProps) {
  return (
    <button
      style={{
        borderColor: priority.color,
        backgroundColor: isActive ? priority.color : "transparent",
      }}
      className={`flex-1 p-1 rounded-xl border-2
        ${isActive ? `text-background` : ""}`}
      onClick={() => handlePriorityChange(priority.id)}
    >
      {priority.name}
    </button>
  );
}
