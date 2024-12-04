"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { TaskType } from "./taskType";

export type ToDoListContextType = {
  taskList: TaskType[];
  addTask: (task: TaskType) => Promise<string | undefined>;
  uploadTaskDone: (id: number, done: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};

const ToDoListContext = createContext<ToDoListContextType | null>(null);

export default function ToDoListProvider(props: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  async function fetchTasks() {
    const response = await fetch("/api/task");
    const body = await response.json();

    const properties: { [key in TaskType["priority"]]: number } = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    body.sort(
      (a: TaskType, b: TaskType) =>
        properties[a.priority] - properties[b.priority]
    );
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
        description: task.description,
        priority: task.priority,
        startTime: task.startTime,
        endTime: task.endTime,
      }),
    });
    if (!response.ok) {
      return response.statusText;
    }
    fetchTasks();
  }

  async function uploadTaskDone(id: number, done: boolean) {
    // const date = new Date();
    // const doneDate = done ? date.toISOString().split("T")[0] : null;
    await fetch(`/api/task/${id}`, {
      method: "PUT",
      body: JSON.stringify({ done /*doneDate*/ }),
    });
    fetchTasks();
  }

  async function deleteTask(id: number | undefined) {
    await fetch(`api/task/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ToDoListContext.Provider
      value={{ addTask, uploadTaskDone, taskList, deleteTask }}
    >
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
