import React from "react";

interface DayProps {
  day: string;
  date: string;
  isActive: boolean;
  onClick: () => void;
}

export const Day: React.FC<DayProps> = ({ day, date, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-2 p-1 flex-1 text-sm text-muted-foreground/60 box-content border-2 ${
        isActive ? "border-purple-400 rounded-lg" : "border-transparent"
      }`}
    >
      <div
        className={`flex justify-center ${isActive ? "text-purple-400" : ""}`}
      >
        {day}
      </div>
      <div
        className={`flex justify-center ${isActive ? "text-purple-400" : ""}`}
      >
        {date}
      </div>
    </div>
  );
};
