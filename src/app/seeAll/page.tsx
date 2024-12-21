"use client";

import { TaskList } from "../components/TaskList";
import { Calendar } from "../components/calendar/calendar-component";
import { useState } from "react";

export default function SeeAll() {
  const [activeDate, setActiveDate] = useState();

  return (
    <div className="pt-12 px-4">
      <Calendar setTask={} />
      <TaskList day="2024-12-23" seeAll={false} />
    </div>
  );
}
