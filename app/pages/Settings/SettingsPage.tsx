"use client";

import { PlusCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [favouriteGroups, setFavouriteGroups] = useState<string[]>([]);
  const [newGroup, setNewGroup] = useState("");

  // Load from localStorage on component mount
  useEffect(() => {
    const savedGroups = localStorage.getItem("favouriteGroups");
    if (savedGroups) {
      setFavouriteGroups(JSON.parse(savedGroups));
    }
  }, []);

  const addGroup = () => {
    if (newGroup.trim()) {
      const updatedGroups = [...favouriteGroups, newGroup.trim()];
      setFavouriteGroups(updatedGroups);
      localStorage.setItem("favouriteGroups", JSON.stringify(updatedGroups));
      setNewGroup(""); // Clear input
    }
  };

  const deleteGroup = (groupToDelete: string) => {
    const updatedGroups = favouriteGroups.filter(
      (group) => group !== groupToDelete
    );
    setFavouriteGroups(updatedGroups);
    localStorage.setItem("favouriteGroups", JSON.stringify(updatedGroups));
  };

  return (
    <div className="p-4">
      <div className="add-group flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="e.g JPTV23"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-blue-500"
          onKeyPress={(e) => e.key === "Enter" && addGroup()}
        />
        <button onClick={addGroup}>
          <PlusCircleIcon
            size={40}
            color="#0000ff"
            weight="fill"
            className="hover:opacity-80 transition-opacity"
          />
        </button>
      </div>

      <div className="favourites">
        {favouriteGroups.length === 0 ? (
          <p className="text-gray-500">No favourite groups yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {favouriteGroups.map((group, index) => (
              <div
                key={index}
                className="bg-gray-200 px-3 py-2 rounded-full flex items-center gap-2"
              >
                <span className="font-medium">{group}</span>
                <button
                  onClick={() => deleteGroup(group)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label={`Delete ${group}`}
                >
                  <XCircleIcon size={20} weight="fill" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
