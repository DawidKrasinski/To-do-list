import { useToDoList } from "../../toDoListProvider";

export function Progress() {
  const { taskList } = useToDoList();
  const today = new Date().toISOString().split("T")[0];
  const tasksToday = taskList.filter(
    (task) => task.date.split("T")[0] === today
  ).length;

  const tasksDone = taskList.filter(
    (task) => task.date.split("T")[0] === today && task.done
  ).length;

  const doneProgress =
    tasksToday && tasksDone ? Math.round((tasksDone / tasksToday) * 100) : 0;

  let quote;
  if (doneProgress === 0) {
    quote = "Hello, have a nice day!";
  } else if (doneProgress < 35) {
    quote = "You are on the right path, keep going!";
  } else if (doneProgress < 50) {
    quote = "you're almost halfway there!";
  } else if (doneProgress < 75) {
    quote = "You've got this, over halfway!";
  } else if (doneProgress < 100) {
    quote = "You are almost done, go ahead!";
  } else if (doneProgress === 100) {
    quote = "Congratulations, everything is done!";
  }

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xl">Progress</h2>
      <div className="p-4 flex flex-col gap-1 bg-muted rounded-lg">
        <h3 className="text-lg-xl">Daily Task</h3>
        <div className="opacity-80">
          {`${tasksDone}/${tasksToday}`} Task Completed
        </div>
        <div className="flex justify-between">
          <div className="text-sm opacity-40">{quote}</div>
          <div className="text-lg-xl">{doneProgress}%</div>
        </div>
        <div className="flex">
          <div className="flex flex-1 w-full h-4 bg-purple-400 bg-opacity-40 rounded-full">
            <div
              style={{ width: `${doneProgress}%` }}
              className="h-4 bg-purple-400 rounded-full"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
