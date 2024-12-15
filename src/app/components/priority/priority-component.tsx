import { PriorityButton } from "./priority-button";
import { Task } from "@/app/taskType";
import { useToDoList } from "@/app/toDoListProvider";

interface PriorityProps {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}

export function Priority({ setTask, task }: PriorityProps) {
  const { priorityList } = useToDoList();

  const handlePriorityChange = (priority: number) => {
    setTask((prevTask) => ({ ...prevTask, priority }));
  };
  return (
    <section className="text-lg flex flex-col gap-2">
      <h3>Priority</h3>
      <div className="flex gap-2">
        {priorityList.map((priority) => (
          <PriorityButton
            key={priority.id}
            priority={priority}
            isActive={task.priority === priority.id}
            handlePriorityChange={handlePriorityChange}
          />
        ))}
      </div>
    </section>
  );
}
