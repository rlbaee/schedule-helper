"use client";

import { useState } from "react";
import HomePage from "./pages/Home/HomePage";
import SettingsPage from "./pages/Settings/SettingsPage";
import Navbar from "./pages/Navbar";

export default function Home() {
  const [screen, setScreen] = useState<"homePage" | "settingsPage">("homePage");
  return (
    <main>
      <div className="p-4">
        {screen === "homePage" && <HomePage />}
        {screen === "settingsPage" && <SettingsPage />}
      </div>

      <Navbar setScreenFunction={setScreen} />
    </main>
  );
}
