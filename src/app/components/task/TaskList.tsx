import { TaskComponent } from "./task-component";
import Link from "next/link";
import { useToDoList } from "../../toDoListProvider";

interface PrintTaskListProps {
  day?: string;
  searchInputValue?: string;
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

export function TaskList({ day, seeAll, searchInputValue}: PrintTaskListProps) {

  function simpleDate(date: Date){
    return date.toISOString().split("T")[0]
  }

  const { taskList } = useToDoList();
  <SeeAll isTrue={seeAll} />;
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const header =
    day === simpleDate(today)
      ? `Today's Tasks`
      : day === simpleDate(tomorrow)
      ? "Tommorrow Task"
      : day;

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-xl">{header}</h2>
        <SeeAll isTrue={seeAll} />
      </div>
      <div className="flex flex-col gap-4">
        {day ? taskList
          .filter((task) => day ? task.date === day : task)
          .slice(0, 3)
          .map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))
        : taskList
        .filter((task) => searchInputValue ? task.name.includes(searchInputValue) : task)
        .map((task) => (
            <TaskComponent key={task.id} task={task} />
          ))}
      </div>
    </section>
  );
}
