import GroupSchedule from "./GroupSchedule";

export default function HomePage() {
  return (
    <div>
      <h1>02.11.2025</h1>
      <div className="groups">
        <GroupSchedule groupCode="JPTV23" />
      </div>
    </div>
  );
}
