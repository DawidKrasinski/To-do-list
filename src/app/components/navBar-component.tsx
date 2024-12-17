import Link from "next/link";

export function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-navBar rounded-t-2xl py-1 px-4">
      <div className="flex gap-8">
        <div className="flex-1 flex justify-center items-center">
          <Link href="#">
            <i className="fa-solid fa-calendar-days text-muted text-2xl"></i>
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link href="#">
            <i className="fa-solid fa-house text-muted text-2xl"></i>
          </Link>
        </div>

        <div className="flex-1 flex">
          <Link
            href="/addTask"
            className="w-12 h-12 rounded-full bg-gradient-to-tl from-purple-400 to-pink-300 cursor-pointer flex justify-center items-center -translate-y-6"
          >
            <i className="fa-solid fa-plus text-black text-2xl"></i>
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link href="#">
            <i className="fa-solid fa-clipboard-list text-muted text-2xl"></i>
          </Link>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <Link href="#">
            <i className="fa-solid fa-user-group text-muted text-2xl"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
}
