"use client";

import { useState, useEffect } from "react";
import GroupSchedule from "./GroupSchedule";

export default function HomePage() {
  const date = new Date().toLocaleDateString("ru-RU");
  const [favouriteGroups, setFavouriteGroups] = useState<string[]>([]);

  useEffect(() => {
    const savedGroups = localStorage.getItem("favouriteGroups");
    if (savedGroups) {
      setFavouriteGroups(JSON.parse(savedGroups));
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-6">{date}</h1>
      <div className="groups space-y-4">
        {favouriteGroups.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No favourite groups yet</p>
            <p className="text-sm">
              Add groups in Settings to see schedules here
            </p>
          </div>
        ) : (
          favouriteGroups.map((groupCode) => (
            <GroupSchedule key={groupCode} groupCode={groupCode} />
          ))
        )}
      </div>
    </div>
  );
}
