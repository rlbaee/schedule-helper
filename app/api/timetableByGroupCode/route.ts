/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server";

interface Group {
  groupCode: string;
  groupUuid: string;
}

interface Teacher {
  firstname: string;
  lastname: string;
}

interface Room {
  roomCode: string;
  buildingCode: string;
}

interface StudentGroup {
  code: string;
}

interface TimetableEvent {
  nameEt: string;
  nameEn: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  teachers: Teacher[];
  rooms: Room[];
  studentGroups: StudentGroup[];
}

interface SimplifiedLesson {
  name: string;
  time: string;
  teachers: string[];
  rooms: string[];
  groups: string[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const groupCode = searchParams.get("groupCode");

  if (!groupCode) {
    return new Response("Group code is missing", { status: 400 });
  }

  try {
    // 1. Get group UUID
    const groupUuidsResponse = await fetch(
      "https://tahveltp.edu.ee/hois_back/schoolBoard/8/group/timetables"
    );
    const groupUuidsData: Group[] = await groupUuidsResponse.json();

    const foundGroup = groupUuidsData.find(
      (group) => group.groupCode.toLowerCase() === groupCode.toLowerCase()
    );

    if (!foundGroup) {
      return new Response("Group not found", { status: 404 });
    }

    // 2. Fetch timetable data
    const timetableUrl = `https://tahveltp.edu.ee/hois_back/schoolBoard/8/timetableByGroup?studentGroupUuid=${foundGroup.groupUuid}`;
    const timetableResponse = await fetch(timetableUrl);
    const timetableData = await timetableResponse.json();

    // 3. Transform the data (your PHP logic translated)
    const lessonsByDate: { [date: string]: SimplifiedLesson[] } = {};

    // Loop through each lesson
    for (const lesson of timetableData.timetableEvents || []) {
      // Extract teachers
      const teacherNames =
        lesson.teachers?.map((teacher: Teacher) =>
          `${teacher.firstname} ${teacher.lastname}`.trim()
        ) || [];

      // Extract rooms
      const roomNames =
        lesson.rooms?.map((room: Room) =>
          `${room.roomCode} ${room.buildingCode}`.trim()
        ) || [];

      // Format date (DD.MM.YYYY)
      let formattedDate = "";
      if (lesson.date) {
        const date = new Date(lesson.date);
        formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}.${date.getFullYear()}`;
      }

      // Extract groups
      const groups =
        lesson.studentGroups?.map((group: StudentGroup) => group.code) || [];

      // Add lesson under its date
      if (!lessonsByDate[formattedDate]) {
        lessonsByDate[formattedDate] = [];
      }

      lessonsByDate[formattedDate].push({
        name: lesson.nameEt || lesson.nameEn || "",
        time: `${lesson.timeStart} - ${lesson.timeEnd}`,
        teachers: teacherNames,
        rooms: roomNames,
        groups: groups,
      });
    }

    // 4. Sort dates ascending
    const sortedDates = Object.keys(lessonsByDate).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split(".").map(Number);
      const [dayB, monthB, yearB] = b.split(".").map(Number);
      return (
        new Date(yearA, monthA - 1, dayA).getTime() -
        new Date(yearB, monthB - 1, dayB).getTime()
      );
    });

    // Create sorted object
    const sortedLessonsByDate: { [date: string]: SimplifiedLesson[] } = {};
    for (const date of sortedDates) {
      // Sort lessons within each date by start time
      sortedLessonsByDate[date] = lessonsByDate[date].sort((a, b) => {
        const timeA = a.time.split(" - ")[0]; // Get start time
        const timeB = b.time.split(" - ")[0];
        return timeA.localeCompare(timeB);
      });
    }

    // 5. Return transformed data
    return Response.json(sortedLessonsByDate);
  } catch (error) {
    return new Response("Error fetching data", { status: 500 });
  }
}
