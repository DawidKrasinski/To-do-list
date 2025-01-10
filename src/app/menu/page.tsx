"use client";

import Image from "next/image";
import { Header } from "../components/header/header-component";
import { useRef, useState } from "react";

export default function Menu() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [activeTheme, setActiveTheme] = useState("");

  function handleThemeChange(theme: string) {
    setActiveTheme(theme);
  }

  function handleImageClick() {
    inputRef.current?.click();
  }

  function Theme({ isActive, name }: { isActive: boolean; name: string }) {
    return (
      <div
        onClick={() => handleThemeChange(name)}
        className={`${
          { light: "light", custom: "custom" }[name]
        } flex justify-center items-center flex-1 flex-col gap-4`}
      >
        <div
          className={`${
            isActive ? "border-purple-400" : "border-gray-500"
          } border-2 rounded-xl`}
        >
          <div className="w-16 h-16 border-4 border-transparent rounded-xl flex overflow-hidden">
            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 bg-background"></div>
              <div className="flex flex-1 bg-muted-foreground"></div>
            </div>
            <div className="flex flex-1 bg-muted"></div>
          </div>
        </div>
        <div className={`${isActive ? "text-purple-400" : ""}`}>{name}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 pt-16 px-4">
      <div className="flex flex-col gap-8">
        <Header header="Settings" />
        <div onClick={handleImageClick} className="flex justify-center">
          <Image
            src={"/img/Pencil.png"}
            height={100}
            width={100}
            alt={""}
            className="rounded-full"
          />
        </div>

        <input type="file" ref={inputRef} className="hidden" />
        <input
          value={"name"}
          type="text"
          className="bg-muted p-3 rounded-lg"
        ></input>
      </div>
      <div className="flex gap-8">
        <Theme name="light" isActive={activeTheme === "light"} />
        <Theme name="dark" isActive={activeTheme === "dark"} />
        <Theme name="custom" isActive={activeTheme === "custom"} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <button className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full">
          Save Changes
        </button>
      </div>
    </div>
  );
}
