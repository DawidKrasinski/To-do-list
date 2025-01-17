"use client";

import { Header } from "../components/header/header-component";
import { useEffect, useRef, useState } from "react";
import { useToDoList } from "../toDoListProvider";
import { User } from "../types/userType";
import { UserPhoto } from "../(navBar)/components/user/userPhoto";
import { useRouter } from "next/navigation";

export default function Menu() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { editUser, getUser } = useToDoList();
  const [user, setUser] = useState<User>({
    name: "",
    theme: "dark",
    photo: "",
    id: 0,
    localStorageId: "",
  });
  const customColors = {
    text: "#ffffff",
    muted: "#000000",
    navBar: "#555555",
    background: "#666666",
  };

  useEffect(() => {
    const fetchUser = async () => {
      const localStorageId = localStorage.getItem("userId");
      if (!localStorageId) return;
      const user = await getUser(localStorageId);
      setUser(user);
    };
    fetchUser();
  }, []);

  function handleThemeChange(theme: "light" | "dark" | "custom") {
    setUser((user) => ({ ...user, theme }));
  }

  function handleNameChange(name: string) {
    setUser((user) => ({ ...user, name }));
  }

  function handlePhotoChange(photo: string) {
    setUser((user) => ({ ...user, photo }));
  }

  function handleImageClick() {
    inputRef.current?.click();
  }

  function Theme({
    isActive,
    name,
  }: {
    isActive: boolean;
    name: "dark" | "light" | "custom";
  }) {
    return (
      <div
        onClick={() => handleThemeChange(name)}
        className={`${
          { light: "light", custom: "custom", dark: "dark" }[name]
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
              <div className="flex flex-1 bg-navBar"></div>
            </div>
            <div className="flex flex-1 bg-muted"></div>
          </div>
        </div>
        <div className={`${isActive ? "text-purple-400" : ""}`}>{name}</div>
      </div>
    );
  }

  function CustomTheme({
    isCustom,
    customColors,
  }: {
    isCustom: boolean;
    customColors?: {
      text: string;
      background: string;
      navBar: string;
      muted: string;
    };
  }) {
    function ColorInput({
      text,
      customColor,
    }: {
      text: string;
      customColor: string;
    }) {
      return (
        <div className="flex justify-between items-center">
          <div className="text-lg">{text}</div>
          <input
            type="color"
            value={customColor}
            className="bg-muted p-4 rounded-lg"
          />
        </div>
      );
    }

    console.log(isCustom, customColors);
    return isCustom && customColors ? (
      <div className="flex flex-col gap-8">
        <ColorInput text="background:" customColor={customColors.background} />
        <ColorInput text="text:" customColor={customColors.text} />
        <ColorInput text="navigation bar:" customColor={customColors.navBar} />
        <ColorInput text="field:" customColor={customColors.muted} />
      </div>
    ) : (
      ""
    );
  }

  return (
    <div className="flex flex-col gap-16 pt-16 px-4">
      <div className="flex flex-col gap-8">
        <Header header="Settings" />
        <div onClick={handleImageClick} className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <UserPhoto />
          </div>

          <input
            onChange={(e) => handlePhotoChange(e.target.value)}
            type="file"
            ref={inputRef}
            className="hidden"
          />
        </div>

        <input
          onChange={(e) => handleNameChange(e.target.value)}
          value={user.name}
          type="text"
          placeholder="Name"
          className="bg-muted p-3 rounded-lg"
        ></input>
      </div>
      <div className="flex gap-8">
        <Theme name="light" isActive={user.theme === "light"} />
        <Theme name="dark" isActive={user.theme === "dark"} />
        <Theme name="custom" isActive={user.theme === "custom"} />
      </div>
      <CustomTheme
        isCustom={user.theme === "custom"}
        customColors={customColors}
      />
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <button
          onClick={() => {
            editUser(user);
            router.push("/");
          }}
          className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
