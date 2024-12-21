import { Day } from "./day-calendar";
import { useState } from "react";
import { Task } from "@/app/taskType";

interface CalendarProps {
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  task?: Task;
}

export function Calendar({ setTask, task }: CalendarProps) {
  const [dayOffset, setDayOffset] = useState(0);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [activeDate, setActiveDate] = useState(
    task ? task.date.split("T")[0] : new Date().toISOString().split("T")[0]
  );
  console.log(task, activeDate);

  const handleDateChange = (date: string) => {
    setTask((prevTask) => ({ ...prevTask, date }));
  };

  function getWeek(dayOffset: number) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = (dayOfWeek + 6) % 7;

    const firstMonday = new Date(today);
    firstMonday.setDate(today.getDate() - difference + dayOffset);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstMonday);
      day.setDate(firstMonday.getDate() + i);
      const date = day.toISOString().slice(0, 10);
      week.push({
        date: date,
        month: months[parseInt(date.split("-")[1]) - 1],
      });
    }

    return week;
  }

  function changeActiveDate(index: number) {
    const week = getWeek(dayOffset);
    setActiveDate(week[index].date);
    handleDateChange(week[index].date);
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between text-purple-400">
        <i
          onClick={() => setDayOffset(dayOffset - 7)}
          className="fa-solid fa-chevron-left text-xl"
        ></i>
        <h2 className="text-lg">
          {`${getWeek(dayOffset)[0].date.split("-")[2]} ${
            getWeek(dayOffset)[0].month
          } - ${getWeek(dayOffset)[6].date.split("-")[2]} ${
            getWeek(dayOffset)[6].month
          }`}
        </h2>
        <i
          onClick={() => setDayOffset(dayOffset + 7)}
          className="fa-solid fa-chevron-right text-xl"
        ></i>
      </div>
      <div className="flex">
        {daysOfWeek.map((day, index) => (
          <Day
            onClick={() => changeActiveDate(index)}
            key={day}
            day={day}
            isActive={activeDate === getWeek(dayOffset)[index].date}
            date={getWeek(dayOffset)[index].date.split("-")[2]}
          />
        ))}
      </div>
    </section>
  );
}
