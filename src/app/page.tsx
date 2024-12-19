"use client";
import Image from "next/image";
import { NavBar } from "./components/navBar-component";
import { PrintTaskList } from "./components/printTaskList";
import { Progress } from "./components/progress";
import { useToDoList } from "./toDoListProvider";

export default function Home() {
  const { taskList } = useToDoList();
  const today = new Date().toISOString().split("T")[0];
  const tasksToday = taskList.filter(
    (task) => task.date.split("T")[0] === today
  ).length;

  const tasksDone = taskList.filter(
    (task) => task.date.split("T")[0] === today && task.done
  ).length;

  const uncompletedTasks = tasksToday - tasksDone;

  return (
    <>
      <div className="flex flex-col gap-8 px-4 pt-16 pb-20">
        <header className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-16">
            <h1 className="text-2xl">
              You have got {uncompletedTasks} tasks today to complete
              <Image
                src={"/img/Pencil.png"}
                alt=""
                width={"26"}
                height={"26"}
                className="inline-block ml-2 mb-1 w-auto h-auto"
              />
            </h1>
            <div className="min-w-11 min-h-11 bg-gray-500 rounded-full"></div>
          </div>
          <div className="flex flex-col">
            {/* !!! */}
            <input
              type="text"
              id="searchInput"
              placeholder="Search Task Here"
              className="bg-muted p-3 rounded-lg"
            />
            {/* <i className="fa-solid fa-magnifying-glass pl-2 pr-3"></i> */}
          </div>
        </header>

        <Progress />
        <PrintTaskList day="Today" />
        <PrintTaskList day="Tomorrow" />
        <NavBar activeIcon="Home" />
      </div>
    </>
  );
}
