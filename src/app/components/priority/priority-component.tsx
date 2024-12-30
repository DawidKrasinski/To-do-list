import { PriorityButton } from "./priority-button";
import { Task } from "@/app/taskType";
import { useToDoList } from "@/app/toDoListProvider";

interface PriorityProps {
  priority: number;
  onChange: (priority: number) => void
}

export function Priority({ onChange, priority}: PriorityProps) {
  const { priorityList } = useToDoList();

  
  return (
    <section className="text-lg flex flex-col gap-2">
      <h3>Priority</h3>
      <div className="flex gap-2">
      {priorityList.map((priorityElement) => (
        <PriorityButton
          key={priorityElement.id}
          priority={priorityElement}
          isActive={priority === priorityElement.id}
          onChange={onChange}
        />
      ))}
      </div>
    </section>
  );
}
