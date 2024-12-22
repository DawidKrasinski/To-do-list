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
  const { deleteTask, editTask } = useToDoList();
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

  const handleDateChange = (date: string) => {
    setTask((prevTask) => ({ ...prevTask, date }));
  };

  const [activeDate, setActiveDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  useEffect(
    () => () => {
      handleDateChange(activeDate);
    },
    [activeDate]
  );

  useEffect(() => {
    async function loadTask() {
      const [fetchedTask] = await fetchTaskById(params.id);
      setTask(fetchedTask);
    }
    loadTask();
  }, [params.id]);

  async function fetchTaskById(id: string) {
    const response = await fetch(`/api/task/${id}`);
    const body = await response.json();
    return body;
  }

  function handleEditTaskButtonClicked(task: Task) {
    if (
      task.name.trim() &&
      task.priority &&
      task.startTime &&
      task.endTime &&
      task.date.trim() &&
      task.id
    ) {
      console.log(task);
      editTask(task.id, task);
      router.push("/");
    } else {
      console.log("task request is invalid");
    }
  }

  function handleDeleteTaskButtonClicked(task: Task) {
    if (task.id) {
      deleteTask(task.id);
      router.push("/");
    } else {
      console.log("task request is invalid");
    }
  }

  return (
    <>
      <div className="px-4 pt-12 pb-20 flex flex-col gap-8">
        <header className="flex pr-8">
          <Link
            href="/"
            className="w-8 h-8 border-2 text-muted-foreground rounded-full flex justify-center items-center"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <span className="text-2xl flex flex-1 justify-center">
            {task.name}
          </span>
        </header>

        <Calendar setDate={setActiveDate} task={task} />
        <Schedule setTask={setTask} task={task} />
        <Priority setTask={setTask} task={task} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background pt-1">
        <div className="flex gap-6">
          <button
            onClick={() => handleEditTaskButtonClicked(task)}
            className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full"
          >
            Edit Task
          </button>
          <button
            onClick={() => handleDeleteTaskButtonClicked(task)}
            className="bg-deleteTaskButton rounded-lg p-3 w-full"
          >
            Delete Task
          </button>
        </div>
      </div>
    </>
  );
}
