"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TaskType } from "../taskType.js";
import { useToDoList } from "../toDoListProvider";
import { flushSync } from "react-dom";

export default function AddTask() {
  const [task, setTask] = useState<TaskType>({
    name: "",
    description: "",
    priority: "",
    startTime: "",
    endTime: "",
  });
  const { addTask } = useToDoList();
  const router = useRouter();

  function handleAddTaskButtonClicked(task: TaskType) {
    if (task.name.trim() && task.priority && task.startTime && task.endTime) {
      console.log(task);
      addTask(task);
      router.push("/");
    } else {
      console.log("task request is invalid");
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>,
    field: keyof TaskType
  ) => {
    const value =
      e.currentTarget instanceof HTMLInputElement
        ? e.currentTarget.value
        : e.currentTarget.innerText;
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  const handlePriorityChange = (priority: string) => {
    flushSync(() => {
      setTask((prevTask) => ({ ...prevTask, priority }));
    });
  };

  return (
    <>
      <div className="px-4 pt-16 flex flex-col gap-8">
        <header className="flex">
          <Link
            href="/"
            className="w-8 h-8 border-2 text-muted-foreground rounded-full flex justify-center items-center"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <span className="text-2xl flex flex-1 justify-center">
            Mobile App Research
          </span>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl">Schedule</h2>
          <input
            autoComplete="off"
            name="name"
            onChange={(e) => handleInputChange(e, "name")}
            value={task.name}
            type="text"
            className="bg-muted p-3 placeholder:text-muted-foreground/40 rounded-lg"
            placeholder="Name"
          />
          <div
            contentEditable={true}
            onInput={(e) => handleInputChange(e, "description")}
            className="bg-muted rounded-lg p-3 min-h-24 relative empty:after:content-['Description'] after:absolute after:top-3 after:left-3 after:text-muted-foreground/40"
          ></div>
        </section>

        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-lg">Start Time</h3>
            <input
              type="time"
              onChange={(e) => handleInputChange(e, "startTime")}
              value={task.startTime}
              className="bg-muted p-3 rounded-lg"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-lg">End Time</h3>
            <input
              type="time"
              onChange={(e) => handleInputChange(e, "endTime")}
              value={task.endTime}
              className="bg-muted p-3 rounded-lg"
            />
          </div>
        </div>

        <div className="text-lg flex flex-col gap-2">
          <h3>Priority</h3>
          <div className="flex gap-2">
            <button
              className={`flex-1 p-1 border-2 border-highPriority rounded-xl ${
                task.priority === "High"
                  ? "bg-highPriority text-background"
                  : ""
              }`}
              onClick={() => handlePriorityChange("High")}
            >
              High
            </button>
            <button
              className={`flex-1 p-1 border-2 border-mediumPriority rounded-xl ${
                task.priority === "Medium"
                  ? "bg-mediumPriority text-background"
                  : ""
              }`}
              onClick={() => handlePriorityChange("Medium")}
            >
              Medium
            </button>
            <button
              className={`flex-1 p-1 border-2 border-lowPriority rounded-xl ${
                task.priority === "Low" ? "bg-lowPriority text-background" : ""
              }`}
              onClick={() => handlePriorityChange("Low")}
            >
              Low
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background pt-1">
        <button
          onClick={() => handleAddTaskButtonClicked(task)}
          className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full"
        >
          Create Task
        </button>
      </div>
    </>
  );
}
