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
      }),
    });
    if (!response.ok) {
      return response.statusText;
    }
    fetchTasks();
  }

  async function uploadTaskDone(id: number, done: boolean) {
    let doneDate;
    if (done) {
      const date = new Date();
      doneDate = date.getDate();
    } else {
      doneDate = null;
    }
    await fetch(`/api/task/${id}`, {
      method: "PUT",
      body: JSON.stringify({ done, doneDate }),
    });
    fetchTasks();
  }

  async function deleteTask(id: number) {
    const response = await fetch(`api/task/${id}`, {
      method: "DELETE",
    });
    console.log(response);
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
