import { Priority } from "@/app/priorityType";
import { PriorityButton } from "./priority-button";
import { useToDoList } from "@/app/toDoListProvider";

interface PriorityProps {
  priority: Priority;
  onChange: (priority: number) => void
}

export function PrioritySection({ onChange, priority}: PriorityProps) {
  const { priorityList } = useToDoList();

  
  return (
    <section className="text-lg flex flex-col gap-2">
      <h3>Priority</h3>
      <div className="flex gap-2">
      {priorityList.map((priorityElement) => {
        console.log(priorityElement.name, priority.id, priorityElement.id)
        return (
        <PriorityButton
          key={priorityElement.id}
          priority={priorityElement}
          isActive={priority.id === priorityElement.id}
          onChange={onChange} 
        />
      )})}
      </div>
    </section>
  );
}
