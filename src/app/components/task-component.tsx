import { TaskType } from "../taskType";

export function TaskComponent({ task }: { task: TaskType }) {
  const name = task.name;
  return (
    <div className="h-20 w-full foreground">
      <h3>{name}</h3>
      <span>data</span>
      <button className="w-7 h-7 rounded-full bg-purple-400"></button>
    </div>
  );
}
