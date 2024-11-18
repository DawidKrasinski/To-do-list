"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { TaskType } from "./taskType";

export type ToDoListContextType = {
  taskList: TaskType[];
  addTask: (task: TaskType) => Promise<string | undefined>;
  uploadTaskDone: (id: number, done: boolean) => Promise<void>;
};

const ToDoListContext = createContext<ToDoListContextType | null>(null);

export default function ToDoListProvider(props: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  async function fetchTasks() {
    const response = await fetch("/api/task");
    const body = await response.json();
    console.log(body);
    setTaskList(body);
  }

  async function addTask(task: TaskType) {
    const response = await fetch("/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task.name,
      }),
    });
    if (!response.ok) {
      return response.statusText;
    }
    fetchTasks();
  }

  async function uploadTaskDone(id: number, done: boolean) {
    await fetch(`/api/task/${id}/taskDone`, {
      method: "PUT",
      body: JSON.stringify({ done }),
    });
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ToDoListContext.Provider value={{ addTask, uploadTaskDone, taskList }}>
      {props.children}
    </ToDoListContext.Provider>
  );
}

export function useToDoList() {
  const context = useContext(ToDoListContext);
  if (!context) {
    throw new Error("useToDoList must be used within a TodoListProvider");
  }
  return context;
}
