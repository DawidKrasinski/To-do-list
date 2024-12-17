"use client";
import Image from "next/image";
import { NavBar } from "./components/navBar-component";
import { PrintTaskList } from "./components/printTaskList";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-8 px-4 pt-16">
        <header className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-16">
            <h1 className="text-2xl">
              You have got 5 tasks today to complete
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

        <section className="flex flex-col gap-2">
          <h2 className="text-xl">Progress</h2>
          <div className="p-4 flex flex-col gap-1 bg-muted rounded-lg">
            <h3 className="text-lg-xl">Daily Task</h3>
            <div className="opacity-80">2/3 Task Completed</div>
            <div className="text-sm opacity-40">
              You are almost done go ahead
            </div>
          </div>
        </section>

        <PrintTaskList day="Today" />
        <PrintTaskList day="Tomorrow" />
        <NavBar />
      </div>
    </>
  );
}
