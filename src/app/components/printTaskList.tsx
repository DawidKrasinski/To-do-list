import { TaskComponent } from "./task-component";
import Link from "next/link";
import { useToDoList } from "../toDoListProvider";

interface PrintTaskListProps {
  day: "Today" | "Tomorrow";
}

export function PrintTaskList({ day }: PrintTaskListProps) {
  const { taskList } = useToDoList();
  const header = day === "Today" ? `Today's Tasks` : "Tommorrow Task";
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const date =
    day === "Today"
      ? today.toISOString().split("T")[0]
      : tomorrow.toISOString().split("T")[0];

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-xl">{header}</h2>
        <div className="text-purple-400">
          <Link href="/seeAll">See All</Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {taskList
          .filter((task) => task.date.split("T")[0] === date)
          .slice(0, 3)
          .map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))}
      </div>
    </section>
  );
}
