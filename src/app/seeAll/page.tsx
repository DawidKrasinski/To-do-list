"use client";

import { TaskList } from "../components/task/TaskList";
import { Calendar } from "../components/calendar/calendar-component";
import { useState, useEffect } from "react";
import { Header } from "../components/header/header-component";

export default function SeeAll() {
  const [activeDate, setActiveDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    console.log(activeDate);
  }, [activeDate]);

  return (
    <div className="pt-12 px-4 flex flex-col gap-8">
      <Header text="See all tasks" />
      <Calendar setDate={setActiveDate} />
      <TaskList day={activeDate} seeAll={false} />
    </div>
  );
}
