"use client";
import { useState } from "react";
import { TaskType } from "../taskType.js";
import { useToDoList } from "../toDoListProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddTask() {
  const [task, setTask] = useState<TaskType>({ name: "", description: "" });
  const { addTask } = useToDoList();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  function handleButtonClicked(task: TaskType) {
    addTask(task);
    router.push("/");
  }

  return (
    <div className="w-dvw h-dvh px-5 pt-16">
      <header className="relative w-full h-14 flex">
        <Link
          href="/"
          className="absolute w-8 h-8 border-2 text-white rounded-full flex justify-center items-center"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <span className="relative w-fit text-2xl mx-auto">
          Mobile App Research
        </span>
      </header>

      <div className="">{/* calendar */}</div>

      <section>
        <h2 className="text-xl">Schedule</h2>
        <div className="relative">
          <input
            autoComplete="off"
            name="name"
            onChange={handleChange}
            value={task.name}
            type="text"
            id="taskNameInput"
            className="absolute foreground w-full h-14 mt-3 cursor-text"
          />
          <label
            htmlFor="taskNameInput"
            className="absolute mt-7 pl-3 opacity-65"
          >
            Name
          </label>
          <div className="static">
            <textarea
              name="description"
              onChange={handleChange}
              value={task.description}
              id="taskDescriptionInput"
              className="absolute foreground w-full h-32 mt-20 cursor-text"
            ></textarea>
            <label
              htmlFor="taskDescriptionInput"
              className="absolute mt-24 pl-3 opacity-65"
            >
              Description
            </label>
          </div>
        </div>
      </section>
      <section className="flex items-end h-full">
        <button
          onClick={() => handleButtonClicked(task)}
          className="bg-gradient-to-r from-purple-400 to-pink-400 w-full h-12 mb-12 rounded-lg"
        >
          Create Task
        </button>
      </section>
    </div>
  );
}
