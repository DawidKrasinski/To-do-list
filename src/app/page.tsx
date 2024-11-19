"use client";
import Image from "next/image";
import Link from "next/link";
import { useToDoList } from "./toDoListProvider";
import { TaskComponent } from "./components/task-component";

export default function Home() {
  const { taskList } = useToDoList();
  console.log(taskList, "123");

  return (
    <>
      <div className="w-dvw h-dvh px-5 pt-16">
        <header className="h-14 flex justify-between items-center">
          <h1 className="bold w-64 text-2xl">
            You have got 5 tasks today to complete
            <Image
              src={"/img/Pencil.png"}
              alt=""
              width={"26"}
              height={"26"}
              className="inline-block ml-2 mb-1"
            />
          </h1>
          <div className="w-11 h-11 bg-gray-500 rounded-full"></div>
        </header>
        <div className="relative">
          <input
            type="text"
            id="searchInput"
            className="absolute foreground w-full h-12 mt-5 cursor-text"
          />
          <label htmlFor="searchInput" className="absolute mt-8 opacity-65">
            <i className="fa-solid fa-magnifying-glass pl-2 pr-3"></i>
            Search Task Here
          </label>
        </div>

        <section className="mt-24">
          <h2 className="text-xl pt-2">Progress</h2>
          <div className="mt-3 pl-4 w-full h-36 foreground">
            <h3 style={{ fontSize: "18px" }} className="pt-3">
              Daily Task
            </h3>
            <span className="block pt-1 opacity-80">2/3 Task Completed</span>
            <span className="text-sm font-thin opacity-40 block pt-1">
              You are almost done go ahead
            </span>
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-xl">{`Today's Tasks`}</h2>
          <div className="mt-3">
            {taskList.map((task) => (
              <TaskComponent key={task.id} task={task} />
            ))}
          </div>
        </section>

        <section>{/* Tommorow Tasks */}</section>
      </div>

      <section className="w-full h-full flex justify-center items-end">
        <Link
          href="/addTask"
          className="w-16 h-16 rounded-full bg-gradient-to-tl from-purple-400 to-pink-300 fixed mb-6 cursor-pointer flex justify-center items-center"
        >
          <i className="fa-solid fa-plus text-black text-2xl"></i>
        </Link>
      </section>
    </>
  );
}
