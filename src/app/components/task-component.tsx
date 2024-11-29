import { TaskType } from "../taskType";
import { useState, useEffect, useCallback } from "react";
import { useToDoList } from "../toDoListProvider";

export function TaskComponent({ task }: { task: TaskType }) {
  const { id, name, done, doneDate, priority } = task;

  if (id === undefined || done === undefined || doneDate === undefined) {
    throw new Error("Task has invalid properties");
  }

  const { uploadTaskDone, deleteTask } = useToDoList();
  const [isDone, setIsDone] = useState(done);
  const currentDay = new Date().getDate();

  const handleDeleteTask = useCallback(async () => {
    if (isDone && doneDate !== currentDay && doneDate !== null) {
      await deleteTask(id);
    }
  }, [isDone, doneDate, currentDay, deleteTask, id]);

  useEffect(() => {
    handleDeleteTask();
  }, [handleDeleteTask]);

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
      <div
        className={`w-4 h-full ${
          priority === "Low"
            ? "bg-lowPriority"
            : priority === "Medium"
            ? "bg-mediumPriority"
            : priority === "High"
            ? "bg-highPriority"
            : ""
        }`}
      ></div>
      <div className="flex flex-1 items-center justify-between px-4">
        <div>
          <h3>{name}</h3>
          <span className="text-sm opacity-65">Date</span>
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
