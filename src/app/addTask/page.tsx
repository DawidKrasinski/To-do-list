"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Task } from "../taskType.js";
import { useToDoList } from "../toDoListProvider";
import { Calendar } from "../components/calendar/calendar-component";
import { Schedule } from "@/app/components/schedule/schedule-component";
import { Priority } from "@/app/components/priority/priority-component";

export default function AddTask() {
  const [task, setTask] = useState<Task>({
    name: "",
    description: "",
    priority: 0,
    startTime: "",
    endTime: "",
    date: "",
    color: "#FFFFFF",
  });
  const { addTask } = useToDoList();
  const router = useRouter();

  function handleAddTaskButtonClicked(task: Task) {
    if (
      task.name.trim() &&
      task.priority &&
      task.startTime &&
      task.endTime &&
      task.date.trim()
    ) {
      console.log(task);
      addTask(task);
      router.push("/");
    } else {
      console.log("task request is invalid");
    }
  }

  return (
    <>
      <div className="px-4 pt-16 pb-20 flex flex-col gap-8">
        <header className="flex">
          <Link
            href="/"
            className="w-8 h-8 border-2 text-muted-foreground rounded-full flex justify-center items-center"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <span className="text-2xl flex flex-1 justify-center">
            Create new task
          </span>
        </header>

        <Calendar setTask={setTask} />
        <Schedule setTask={setTask} task={task} />
        <Priority setTask={setTask} task={task} />

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background pt-1">
          <button
            onClick={() => handleAddTaskButtonClicked(task)}
            className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full"
          >
            Create Task
          </button>
        </div>
      </div>
    </>
  );
}
