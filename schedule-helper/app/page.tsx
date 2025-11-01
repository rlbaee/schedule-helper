"use client";

import { useState } from "react";
import HomePage from "./components/HomePage";
import SettingsPage from "./components/SettingsPage";

export default function Home() {
  const [screen, setScreen] = useState<"homePage" | "settingsPage">("homePage");
  return (
    <main>
      {screen === "homePage" && <HomePage />}
      {screen === "settingsPage" && <SettingsPage />}
    </main>
  );
}
