"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Task } from "@/app/taskType.js";
import { useToDoList } from "@/app/toDoListProvider";
import { Calendar } from "@/app/components/calendar/calendar-component";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Schedule } from "@/app/components/schedule/schedule-component";
import { Priority } from "@/app/components/priority/priority-component";

export default function EditTask() {
  const params = useParams<{ id: string }>();
  const { addTask } = useToDoList();
  const router = useRouter();
  const [task, setTask] = useState<Task>({
    name: "",
    description: "",
    priority: 0,
    startTime: "",
    endTime: "",
    date: new Date().toISOString().split("T")[0],
    color: "#FFFFFF",
  });

  async function fetchTaskById(id: string) {
    console.log("Id taska: ", id);
    const response = await fetch(`/api/task/${id}/editTask`);
    const body = await response.json();
    console.log("Odpowiedź z serwera:", body);
    return body;
  }

  useEffect(() => {
    async function loadTask() {
      const fetchedTask = await fetchTaskById(params.id);
      setTask(fetchedTask);
    }
    loadTask();
  }, [params.id]);

  function handleAddTaskButtonClicked(task: Task) {
    if (
      task.name.trim() &&
      task.priority &&
      task.startTime &&
      task.endTime &&
      task.date.trim()
    ) {
      console.log(task);
      addTask(task); //!!!
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
