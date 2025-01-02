import Link from "next/link";

interface NavBarProps {
  activeIcon: "Home" | "Calendar" | "Priorities" | "Groups";
}

export function NavBar({ activeIcon }: NavBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-navBar rounded-t-2xl py-1 px-4">
      <div className="flex gap-8">
        <div className="flex-1 flex justify-center items-center">
          <Link href="#">
            <i
              className={`fa-solid fa-calendar-days text-2xl text-purple-400 ${
                activeIcon === "Calendar" ? "" : "opacity-35"
              }`}
            ></i>
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link href="/">
            <i
              className={`fa-solid fa-house text-2xl text-purple-400 ${
                activeIcon === "Home" ? "" : "opacity-35"
              }`}
            ></i>
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link
            href="/addTask"
            className="w-12 h-12 rounded-full bg-purple-400 cursor-pointer flex justify-center items-center -translate-y-6"
          >
            <i className="fa-solid fa-plus text-black text-2xl"></i>
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link href="/priorities">
            <i
              className={`fa-solid fa-clipboard-list text-2xl text-purple-400 ${
                activeIcon === "Priorities" ? "" : "opacity-35"
              }`}
            ></i>
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link href="#">
            <i
              className={`fa-solid fa-user-group text-2xl text-purple-400 ${
                activeIcon === "Groups" ? "" : "opacity-35"
              }`}
            ></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}
