import { CalendarDotsIcon, GearSixIcon } from "@phosphor-icons/react";

export default function Navbar({
  setScreenFunction,
}: {
  setScreenFunction: (screen: "homePage" | "settingsPage") => void;
}) {
  return (
    <nav className="fixed w-full bottom-0 flex justify-around bg-gray-200 p-4">
      <button onClick={() => setScreenFunction("homePage")}>
        <CalendarDotsIcon size={40} color="#0a0a0a" weight="fill" />
      </button>
      <button onClick={() => setScreenFunction("settingsPage")}>
        <GearSixIcon size={40} color="#0a0a0a" weight="fill" />
      </button>
    </nav>
  );
}
