import { Day } from "./day-calendar";
import { useState } from "react";

interface CalendarProps {
  handleDateChange: (date: string) => void;
}

export function Calendar({ handleDateChange }: CalendarProps) {
  const [dayOffset, setDayOffset] = useState(0);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [activeDate, setActiveDate] = useState({ day: "", month: "" });

  function getFirstMondayDate(dayOffset: number) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = (dayOfWeek + 6) % 7;
    const firstMonday = new Date(today);
    firstMonday.setDate(today.getDate() - difference + dayOffset);

    const firstMondayDate =
      firstMonday.getDate() < 10
        ? firstMonday.getDate().toString().padStart(2, "0")
        : firstMonday.getDate().toString();

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
    return { day: firstMondayDate, month: months[firstMonday.getMonth()] };
  }

  return (
    <>
      <div className="flex justify-between text-purple-400">
        <i
          onClick={() => setDayOffset(dayOffset - 7)}
          className="fa-solid fa-chevron-left text-xl"
        ></i>
        <h2 className="text-lg">{`${getFirstMondayDate(dayOffset).day} ${
          getFirstMondayDate(dayOffset).month
        } - ${getFirstMondayDate(dayOffset + 6).day} ${
          getFirstMondayDate(dayOffset + 6).month
        }`}</h2>
        <i
          onClick={() => setDayOffset(dayOffset + 7)}
          className="fa-solid fa-chevron-right text-xl"
        ></i>
      </div>
      <div className="flex">
        {daysOfWeek.map((day, index) => (
          <Day
            onClick={() => {
              const newDay = getFirstMondayDate(dayOffset + index).day;
              const newMonth = getFirstMondayDate(dayOffset + index).month;
              setActiveDate({
                day: newDay,
                month: newMonth,
              });
              handleDateChange(`${newDay} ${newMonth}`);
            }}
            key={day}
            day={day}
            isActive={
              activeDate.day === getFirstMondayDate(dayOffset + index).day &&
              activeDate.month === getFirstMondayDate(dayOffset + index).month
            }
            date={getFirstMondayDate(dayOffset + index).day}
          />
        ))}
      </div>
    </>
  );
}
