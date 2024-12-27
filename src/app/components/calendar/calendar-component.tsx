import { Day } from "./day-calendar";
import { useState } from "react";

interface CalendarProps {
  onChange: (date: string) => void;
  date: string;
}

function simpleDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function Calendar({ onChange, date }: CalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function getWeek(dayOffset: number) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = (dayOfWeek + 6) % 7;

    const firstMonday = new Date(today);
    firstMonday.setDate(today.getDate() - difference + dayOffset * 7);

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
      const date = simpleDate(day);
      week.push({
        date: date,
        month: months[parseInt(date.split("-")[1]) - 1],
      });
    }

    return week;
  }

  function changeActiveDate(index: number) {
    const week = getWeek(weekOffset);
    onChange(week[index].date);
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between text-purple-400">
        <i
          onClick={() => setWeekOffset(weekOffset - 1)}
          className="fa-solid fa-chevron-left text-xl"
        ></i>
        <h2 className="text-lg">
          <span>{getWeek(weekOffset)[0].date.split("-")[2]} {getWeek(weekOffset)[0].month} -</span> 
          <span> {getWeek(weekOffset)[6].date.split("-")[2]} {getWeek(weekOffset)[6].month}</span>
        </h2>
        <i
          onClick={() => setWeekOffset(weekOffset + 1)}
          className="fa-solid fa-chevron-right text-xl"
        ></i>
      </div>
      <div className="flex">
        {daysOfWeek.map((day, index) => (
          <Day
            onClick={() => changeActiveDate(index)}
            key={day}
            day={day}
            isActive={date === getWeek(weekOffset)[index].date}
            date={getWeek(weekOffset)[index].date.split("-")[2]}
          />
        ))}
      </div>
    </section>
  );
}
