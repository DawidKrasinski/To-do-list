"use client";
import Image from "next/image";
import { TaskList } from "../components/task/TaskList";
import { Progress } from "../components/progress/progress";
import { useToDoList } from "../toDoListProvider";
import { useState } from "react";
import { UserPhoto } from "./components/user/userPhoto";

export default function Home() {
  const { taskList } = useToDoList();
  const date = new Date();
  const today = date.toISOString().split("T")[0];
  date.setDate(date.getDate() + 1);
  const tomorrow = date.toISOString().split("T")[0];
  const tasksToday = taskList.filter(
    (task) => task.date.split("T")[0] === today
  ).length;

  const tasksDone = taskList.filter(
    (task) => task.date.split("T")[0] === today && task.done
  ).length;

  const uncompletedTasks = tasksToday - tasksDone;

  const [searchInputValue, setSearchInputValue] = useState("")

  function onSeatchInputChange (e: React.ChangeEvent<HTMLInputElement>){
    setSearchInputValue(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col gap-8 px-4 pt-16 pb-20">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-16">
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
            <UserPhoto/>
          </div>
          <div className="flex flex-col">
            {/* !!! */}
            <input
              type="text"
              id="searchInput"
              placeholder="Search Task Here"
              autoComplete="off"
              className="bg-muted p-3 rounded-lg"
              onChange={(e) => onSeatchInputChange(e)}
            />
            {/* <i className="fa-solid fa-magnifying-glass pl-2 pr-3"></i> */}
          </div>
        </header>
        
        <div>{
          searchInputValue ? (<TaskList searchInputValue={searchInputValue} seeAll={false}/>)
           : (
            <div className="flex flex-col gap-8">
              <Progress />
              <TaskList day={today} seeAll={true} />
              <TaskList day={tomorrow} seeAll={true} />
           </div> 
          )
          }</div>
        
      </div>
    </>
  );
}
