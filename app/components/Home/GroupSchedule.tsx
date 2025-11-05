/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";

class Lesson {
  time: string;
  name: string;
  teacher: string;
  rooms: string[];
  groups: string[];

  constructor(
    time: string,
    name: string,
    teacher: string,
    rooms: string[],
    groups: string[]
  ) {
    this.time = time;
    this.name = name;
    this.teacher = teacher;
    this.rooms = rooms;
    this.groups = groups;
  }
}

export default function GroupSchedule({ groupCode }: { groupCode: string }) {
  date = new Date();
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/timetableByGroupCode?groupCode=${groupCode}`
      );
      const data = await response.json();

      setData(data);
    }

    fetchData();
  }, [groupCode]);

  return <div className="group"></div>;
}
