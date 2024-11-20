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
        <div>
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
        </div>
      </section>

      <section className="mt-60">
        <div className="w-full flex justify-between h-18">
          <div className="w-full">
            <h3 className="text-lg pb-2">Start Time</h3>
            <input type="time" className="w-full h-full foreground" />
          </div>
          <div className="w-1/12"></div>
          <div className="w-full">
            <h3 className="text-lg pb-2">End Time</h3>
            <input type="time" className="w-full h-full foreground" />
          </div>
        </div>
        <div className="text-lg mt-16">
          <h3 className="pb-2">Priority</h3>
          <div className="flex">
            <button className="h-10 w-full border-2 rounded-xl">High</button>
            <div className="w-1/12"></div>
            <button className="h-10 w-full border-2 rounded-xl">Medium</button>
            <div className="w-1/12"></div>
            <button className="h-10 w-full border-2 rounded-xl">Low</button>
          </div>
        </div>
      </section>

      <section className="flex items-end h-32">
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
