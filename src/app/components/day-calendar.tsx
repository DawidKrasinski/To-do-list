import { useState } from "react";

export function Day(props: { day: string; date: string }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      onClick={() => setIsActive(!isActive)}
      className={`flex flex-col gap-2 p-1 flex-1 text-sm text-muted-foreground/60 box-content border-2 ${
        isActive ? " border-purple-400 rounded-lg" : "border-transparent"
      }`}
    >
      <div className="flex justify-center">{props.day}</div>
      <div className="flex justify-center">{props.date}</div>
    </div>
  );
}
