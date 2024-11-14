export default function AddTask() {
  return (
    <div className="w-dvw h-dvh px-5 pt-16">
      <header></header>
      <section>
        <h2 className="text-xl">Schedule</h2>
        <div className="relative">
          <input
            type="text"
            id="taskNameInput"
            className="absolute foreground w-full h-14 mt-3 cursor-text"
          />
          <label
            htmlFor="taskNameInput"
            className="absolute mt-7 pl-3 opacity-65"
          >
            Name
          </label>
        </div>
        <div className="relative">
          <textarea
            id="taskDescriptionInput"
            className="absolute foreground w-full h-14 mt-3 cursor-text"
          ></textarea>
          <label
            htmlFor="taskDescriptionInput"
            className="absolute mt-7 pl-3 opacity-65"
          >
            Name
          </label>
        </div>
      </section>
      <section></section>
    </div>
  );
}
