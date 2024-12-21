import { TaskComponent } from "./task-component";
import Link from "next/link";
import { useToDoList } from "../toDoListProvider";

interface PrintTaskListProps {
  day: string;
  seeAll: boolean;
}

function SeeAll({ isTrue }: { isTrue: boolean }) {
  return isTrue ? (
    <div className="text-purple-400">
      <Link href="/seeAll">See All</Link>
    </div>
  ) : (
    <div></div>
  );
}

export function TaskList({ day, seeAll }: PrintTaskListProps) {
  const { taskList } = useToDoList();
  <SeeAll isTrue={seeAll} />;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const header =
    day === today.toISOString().split("T")[0]
      ? `Today's Tasks`
      : day === tomorrow.toISOString().split("T")[0]
      ? "Tommorrow Task"
      : day;

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-xl">{header}</h2>
        <SeeAll isTrue={seeAll} />
      </div>
      <div className="flex flex-col gap-4">
        {taskList
          .filter((task) => task.date.split("T")[0] === day)
          .slice(0, 3)
          .map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))}
      </div>
    </section>
  );
}
