"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { Task } from "./taskType";
import { Priority } from "./priorityType";

export type ToDoListContextType = {
  taskList: Task[];
  priorityList: Priority[];
  addTask: (task: Task) => Promise<string | undefined>;
  uploadTaskDone: (id: string, done: boolean) => Promise<void>;
};

const ToDoListContext = createContext<ToDoListContextType | null>(null);

export default function ToDoListProvider(props: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [priorityList, setPriorityList] = useState<Priority[]>([]);

  async function fetchTasks() {
    const response = await fetch("/api/task");
    const body = await response.json();
    setTaskList(body);
  }

  async function fetchPriorities() {
    const response = await fetch("/api/priority");
    const body = await response.json();
    setPriorityList(body);
    console.log(body);
  }

  async function addTask(task: Task) {
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
        date: task.date,
      }),
    });
    if (!response.ok) {
      return response.statusText;
    }
    fetchTasks();
  }

  async function uploadTaskDone(id: string, done: boolean) {
    await fetch(`/api/task/${parseInt(id, 10)}`, {
      method: "PUT",
      body: JSON.stringify({ done }),
    });
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
    fetchPriorities();
  }, []);

  return (
    <ToDoListContext.Provider
      value={{ addTask, uploadTaskDone, taskList, priorityList }}
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
