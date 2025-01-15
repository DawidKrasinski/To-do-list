"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { Task } from "./types/taskType";
import { Priority as priorityType } from "./types/priorityType";
import { Priority } from "./api/db/entity/Priority";
import { User } from "./types/userType";
import { url } from "inspector";

export type ToDoListContextType = {
  taskList: Task[];
  priorityList: Priority[];
  addTask: (task: Task) => Promise<void>;
  uploadTaskDone: (id: number, done: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  editTask: (task: Task) => Promise<void>;
  addPriority: (priority: priorityType) => Promise<void>;
  editPriority: (priority: priorityType) => Promise<void>;
  deletePriority: (id: number) => Promise<void>;
  editUser: (user: User) => Promise<void>;
  getUser: (user: string) => Promise<User>;
  changePrioritiesOrder: (fromOrder: number, toOrder: number) => Promise<void>;
};

const ToDoListContext = createContext<ToDoListContextType | null>(null);

export default function ToDoListProvider(props: { children: React.ReactNode }) {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [priorityList, setPriorityList] = useState<Priority[]>([]);

  async function fetchTasks() {
    const response = await fetch("/api/task");
    const body = await response.json();
    console.log(body);
    setTaskList(body);
  }

  async function fetchPriorities() {
    const response = await fetch("/api/priority");
    const body = await response.json();
    setPriorityList(body);
    console.log(body);
  }

  async function getUser(localStorageId: string) {
    const response = await fetch(`/api/user/${localStorageId}`);
    const body = await response.json();
    console.log("user body", body);
    return body;
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
    fetchTasks();
  }

  async function addPriority(priority: priorityType) {
    const response = await fetch("/api/priority", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: priority.order,
        color: priority.color,
        name: priority.name,
      }),
    });
    fetchPriorities();
  }

  async function createNewUser(localStorageId: string) {
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        localStorageId: localStorageId,
      }),
    });
  }

  async function deleteTask(id: number) {
    await fetch(`/api/task/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  }

  async function deletePriority(id: number) {
    await fetch(`/api/priority/${id}`, {
      method: "DELETE",
    });
    await fetchPriorities();
    await fetchTasks();
  }

  async function uploadTaskDone(id: number, done: boolean) {
    await fetch(`/api/task/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ done }),
    });
    fetchTasks();
  }

  async function changePrioritiesOrder(fromOrder: number, toOrder: number) {
    await fetch(`/api/priority`, {
      method: "PATCH",
      body: JSON.stringify({ fromOrder, toOrder }),
    });
    fetchTasks();
  }

  async function editUser(user: User) {
    console.log(user.localStorageId);
    await fetch(`/api/user/${user.localStorageId}`, {
      method: "PUT",
      body: JSON.stringify({
        name: user.name,
        theme: user.theme,
        photo: user.photo,
      }),
    });
    console.log("editUser:", user);
  }

  async function editTask(task: Task) {
    await fetch(`/api/task/${task.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: task.name,
        description: task.description,
        priority: task.priority,
        startTime: task.startTime,
        endTime: task.endTime,
        date: task.date.split("T")[0],
        id: task.id,
      }),
    });
    fetchTasks();
  }

  async function editPriority(priority: priorityType) {
    await fetch(`/api/priority/${priority.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: priority.name,
        color: priority.color,
        order: priority.order,
      }),
    });
    await fetchPriorities();
    await fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
    fetchPriorities();
    const storageUserId = localStorage.getItem("userId");

    if (!storageUserId) {
      const newUserId = crypto.randomUUID();
      localStorage.setItem("userId", newUserId);
      createNewUser(newUserId);
    }
  }, []);

  return (
    <ToDoListContext.Provider
      value={{
        addTask,
        uploadTaskDone,
        deleteTask,
        deletePriority,
        editTask,
        editPriority,
        editUser,
        changePrioritiesOrder,
        addPriority,
        getUser,
        taskList,
        priorityList,
      }}
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
