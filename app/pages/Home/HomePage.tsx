import GroupSchedule from "./GroupSchedule";

export default function HomePage() {
  const date = new Date().toLocaleDateString("ru-RU");

  return (
    <div>
      <h1 className="text-3xl font-semibold">{date}</h1>
      <div className="groups">
        <GroupSchedule groupCode="JPTV23" />
      </div>
    </div>
  );
}
