"use client";

import { TaskList } from "../components/task/TaskList";
import { Calendar } from "../components/calendar/calendar-component";
import { useState } from "react";
import { Header } from "../components/header/header-component";

export default function SeeAll() {
  const [activeDate, setActiveDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  return (
    <div className="pt-12 px-4 flex flex-col gap-8">
      <Header header="See all tasks" />
      <Calendar onChange={setActiveDate} date={activeDate}/>
      <TaskList day={activeDate} seeAll={false} />
    </div>
  );
}
