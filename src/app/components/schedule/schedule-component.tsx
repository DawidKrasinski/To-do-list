import { Task } from "@/app/taskType";

interface ScheduleProps {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}

export function Schedule({ setTask, task }: ScheduleProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLDivElement>,
    field: keyof Task
  ) => {
    const value =
      e.currentTarget instanceof HTMLInputElement
        ? e.currentTarget.value
        : e.currentTarget.innerText;
    setTask((prevTask) => ({ ...prevTask, [field]: value }));
  };

  return (
    <>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl">Schedule</h2>
        <input
          autoComplete="off"
          name="name"
          onChange={(e) => handleInputChange(e, "name")}
          value={task.name}
          type="text"
          className="bg-muted p-3 placeholder:text-muted-foreground/40 rounded-lg"
          placeholder="Name"
        />
        <div
          contentEditable={true}
          onInput={(e) => handleInputChange(e, "description")}
          className="bg-muted rounded-lg p-3 min-h-24 relative empty:after:content-['Description'] after:absolute after:top-3 after:left-3 after:text-muted-foreground/40"
        >
          {task.description}
        </div>
      </section>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-lg">Start Time</h3>
          <input
            type="time"
            onChange={(e) => handleInputChange(e, "startTime")}
            value={task.startTime}
            className="bg-muted p-3 rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-lg">End Time</h3>
          <input
            type="time"
            onChange={(e) => handleInputChange(e, "endTime")}
            value={task.endTime}
            className="bg-muted p-3 rounded-lg"
          />
        </div>
      </div>
    </>
  );
}
