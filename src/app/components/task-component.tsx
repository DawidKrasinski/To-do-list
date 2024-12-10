import { Task } from "../taskType";
import { useState } from "react";
import { useToDoList } from "../toDoListProvider";

export function TaskComponent({ task }: { task: Task }) {
  const { id, name, done, doneDate, date, color } = task;

  if (id === undefined || done === undefined || doneDate === undefined) {
    throw new Error("Task has invalid properties");
  }

  const { uploadTaskDone } = useToDoList();
  const [isDone, setIsDone] = useState(done);

  const changeDoneStatus = async () => {
    if (id !== undefined) {
      setIsDone((prevDone) => !prevDone);
      await uploadTaskDone(id, !isDone);
    } else {
      console.error("Task ID is undefined.");
    }
  };

  return (
    <div className="flex h-20 bg-muted rounded-lg overflow-hidden">
      <div style={{ backgroundColor: color }} className={`w-4 h-full`}></div>
      <div className="flex flex-1 items-center justify-between px-4">
        <div>
          <h3>{name}</h3>
          <span className="text-sm opacity-65">{date}</span>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={changeDoneStatus}
            className={`w-7 h-7 rounded-full ${
              isDone
                ? "bg-purple-400 text-black flex justify-center items-center"
                : "bg-transparent border-2 border-purple-400 text-transparent"
            }`}
          >
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
