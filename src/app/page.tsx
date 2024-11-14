import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* page */}
      <div className="w-dvw h-dvh px-5 pt-16">
        {/* top */}
        <header className="h-14 flex justify-between items-center">
          <h1 className="bold w-64 text-2xl">
            You have got 5 tasks today to complete
            <Image
              src={"/img/Pencil.png"}
              alt=""
              width={"26"}
              height={"26"}
              className="inline-block ml-2 mb-1"
            />
          </h1>
          <div className="w-11 h-11 bg-gray-500 rounded-full"></div>
        </header>
        <div className="relative">
          <input
            type="text"
            id="searchInput"
            className="absolute foreground w-full h-12 mt-5 cursor-text"
          />
          <label htmlFor="searchInput" className="absolute mt-8 opacity-65">
            <i className="fa-solid fa-magnifying-glass pl-2 pr-3"></i>
            Search Task Here
          </label>
        </div>

        <section>{/* Progress */}</section>

        <section>{/* Today's Tasks*/}</section>

        <section>{/* Tommorow Tasks */}</section>
      </div>

      <section className="w-full h-full flex justify-center items-end">
        <Link
          href="/addTask"
          className="w-16 h-16 rounded-full bg-gradient-to-tl from-purple-400 to-pink-300 fixed mb-6 cursor-pointer flex justify-center items-center"
        >
          <i className="fa-solid fa-plus text-black text-2xl"></i>
        </Link>
      </section>
    </>
  );
}
