import Link from "next/link";

export function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 p-4">
      <Link
        href="/addTask"
        className="w-16 h-16 rounded-full bg-gradient-to-tl from-purple-400 to-pink-300 mb-4 cursor-pointer flex justify-center items-center mx-auto"
      >
        <i className="fa-solid fa-plus text-black text-2xl"></i>
      </Link>
    </nav>
  );
}
