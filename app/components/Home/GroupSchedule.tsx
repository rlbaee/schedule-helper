"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GroupSchedule({ groupCode }: { groupCode: string }) {
  const { data, error, isLoading } = useSWR(
    `/api/timetableByGroupCode?groupCode=${groupCode}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="group">
      {/* Render your schedule data here */}
      {JSON.stringify(data)}
    </div>
  );
}
