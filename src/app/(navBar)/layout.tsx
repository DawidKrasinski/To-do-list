import { NavBar } from "./components/navBar/navBar-component";

export default function NavBarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <NavBar activeIcon="Home" />
    </>
  );
}
