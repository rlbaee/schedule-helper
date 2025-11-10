"use client";

import { useEffect, useState } from "react";

interface Lesson {
  time: string;
  name: string;
  teachers: string[];
  rooms: string[];
  groups: string[];
}

export default function GroupSchedule({ groupCode }: { groupCode: string }) {
  const date = new Date().toLocaleDateString("ru-RU");
  const [data, setData] = useState<Record<string, Lesson[]> | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/timetableByGroupCode?groupCode=${groupCode}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch schedule");
      }

      const result = await response.json();
      setData(result);
    }

    fetchData();
  }, [groupCode]);

  if (!data) return <div>No schedule data</div>;

  const todaysLessons = data["06.11.2025"] || [];

  return (
    <div className="group bg-green-200 rounded-md flex-row gap-1 p-2 ">
      <h2 className="text-xl font-semibold">{groupCode}</h2>
      <div className="separator w-full h-0.5 bg-black"></div>
      <div className="lessons flex overflow-x-auto p-2 gap-2 ">
        {todaysLessons.length === 0 ? (
          <p>No lessons today</p>
        ) : (
          todaysLessons.map((lesson, index) => (
            <div
              key={index}
              className="lesson shrink-0 bg-white p-2 rounded-md max-w-[200px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <p>
                <strong>{lesson.time}</strong>
              </p>
              <p className="text-wrap">
                <strong>{lesson.name}</strong>
              </p>
              <p>{lesson.teachers.join(", ")}</p>
              <p>{lesson.rooms.join(", ")}</p>
              <p>{lesson.groups.join(", ")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
