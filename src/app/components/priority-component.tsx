export function PriorityButton({
  name,
  color,
  order,
  isActive,
  handlePriorityChange,
}: {
  name: string;
  color: string;
  order: number;
  isActive: boolean;
  handlePriorityChange: (priority: number) => void;
}) {
  return (
    <button
      className={`flex-1 p-1 border-2 border-${color}-500 rounded-xl ${
        isActive ? `bg-${color}-500 text-background` : ""
      }`}
      onClick={() => handlePriorityChange(order)}
    >
      {name}
    </button>
  );
}

{
  /* <button
              className={`flex-1 p-1 border-2 border-lowPriority rounded-xl ${
                task.priority === "Low" ? "bg-lowPriority text-background" : ""
              }`}
              onClick={() => handlePriorityChange("Low")}
            ></button> */
}
