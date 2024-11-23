"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TaskType } from "../taskType.js";
import { useToDoList } from "../toDoListProvider";

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

  function descriptionHandler(e: React.FormEvent<HTMLDivElement>) {
    const value = e.currentTarget.innerText;
    if (value.trim() == "") e.currentTarget.innerHTML = "";

    setTask((prevTask) => ({ ...prevTask, description: value }));
  }

  return (
    <>
      <div className="px-4 pt-16 flex flex-col gap-8">
        <header className="flex ">
          <Link
            href="/"
            className="w-8 h-8 border-2 text-muted-foreground rounded-full flex justify-center items-center"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <span className="text-2xl flex flex-1 justify-center">
            Mobile App Research
          </span>
        </header>

        {/* <div className="">calendar</div> */}

        <section className="flex flex-col gap-4">
          <h2 className="text-xl">Schedule</h2>
          <input
            autoComplete="off"
            name="name"
            onChange={handleChange}
            value={task.name}
            type="text"
            id="taskNameInput"
            className="bg-muted p-3 placeholder:text-muted-foreground/40 rounded-lg"
            placeholder="Name"
          />
          <div
            contentEditable={true}
            onInput={descriptionHandler}
            id="taskDescriptionInput"
            className="bg-muted rounded-lg p-3 min-h-24 relative empty:after:content-['Description'] after:absolute after:top-3 after:left-3 after:text-muted-foreground/40"
          ></div>
        </section>

        <div className="flex gap-4 ">
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-lg">Start Time</h3>
            <input type="time" className="bg-muted p-3 rounded-lg" />
          </div>
          <div className="flex  flex-1 flex-col gap-2">
            <h3 className="text-lg">End Time</h3>
            <input type="time" className="bg-muted p-3 rounded-lg" />
          </div>
        </div>
        <div className="text-lg flex flex-col gap-2">
          <h3 className="">Priority</h3>
          <div className="flex gap-2">
            <button className="flex-1 p-1 border-2 rounded-xl">High</button>
            <button className="flex-1 p-1 border-2 rounded-xl">Medium</button>
            <button className="flex-1 p-1 border-2 rounded-xl">Low</button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background pt-1">
        <button
          onClick={() => handleButtonClicked(task)}
          className="bg-gradient-to-r from-purple-400 to-pink-400   rounded-lg  p-3 w-full "
        >
          Create Task
        </button>
      </div>
    </>
  );
}
