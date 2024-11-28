import { TaskType } from "../taskType";
import { useState, useEffect } from "react";
import { useToDoList } from "../toDoListProvider";
import { flushSync } from "react-dom";

export function TaskComponent({ task }: { task: TaskType }) {
  if (
    task.id === undefined ||
    task.done === undefined ||
    task.doneDate === undefined
  ) {
    throw new Error("Task is invalid");
  }

  const { uploadTaskDone, deleteTask } = useToDoList();
  const id = task.id;
  const name = task.name;
  const [done, setDone] = useState(task.done);
  const date = new Date();
  const currentDay = date.getDate();

  useEffect(() => {
    console.log(
      "id: " + id,
      "done?: " + done,
      "today: " + currentDay,
      "done date: " + task.doneDate,
      "if: " + (done && task.doneDate !== currentDay)
    );
    if (done && task.doneDate !== currentDay && task.doneDate !== null) {
      deleteTask(id);
    }
  }, [done, task.doneDate, currentDay, deleteTask, id]);

  async function changeDone(done: boolean) {
    flushSync(() => {
      setDone(!done);
    });
    await uploadTaskDone(id, !done);
  }

  return (
    <div className="mt-4 h-20 w-full flex bg-muted rounded-xl overflow-hidden">
      <div
        className={`w-4 mr-4 h-full ${
          task.priority === "Low"
            ? "bg-lowPriority"
            : task.priority === "Medium"
            ? "bg-mediumPriority"
            : task.priority === "High"
            ? "bg-highPriority"
            : ""
        }`}
      ></div>
      <div className="mt-3 w-5/6">
        <h3>{name}</h3>
        <span className="text-sm opacity-65">data</span>
      </div>
      <div className="flex justify-center items-center w-1/6">
        <button
          onClick={() => changeDone(done)}
          className={`w-7 h-7 rounded-full ${
            done
              ? "bg-purple-400 border border-black text-black flex justify-center items-center"
              : "bg-transparent border-2 border-purple-400 text-transparent"
          }`}
        >
          <i className="fa-solid fa-check"></i>
        </button>
      </div>
    </div>
  );
}
