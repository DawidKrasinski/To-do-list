import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* page */}
      <div className="px-5 pt-16">
        {/* top */}
        <div className="h-14 flex justify-between items-center">
          <div className="bold w-64 text-2xl">
            You have got 5 tasks today to complete
            <Image
              src={"/img/Pencil.png"}
              alt=""
              width={"26"}
              height={"26"}
              className="inline-block ml-2 mb-1"
            />
          </div>
          <div className="w-11 h-11 bg-gray-500 rounded-full"></div>
        </div>
        <div className="relative">
          <input
            type="text"
            id="input"
            className="absolute foreground w-full h-12 mt-5 cursor-text"
          />
          <label htmlFor="input" className="absolute mt-8 opacity-65">
            <i className="fa-solid fa-magnifying-glass pr-1 font-regu pl-2 pr-3"></i>
            Search Task Here
          </label>
        </div>

        <div>{/* Progress */}</div>

        <div>{/* Today's Tasks*/}</div>
      </div>

      <div>{/* Tommorow Tasks */}</div>

      <div>{/* bottom menu */}</div>
    </>
  );
}
