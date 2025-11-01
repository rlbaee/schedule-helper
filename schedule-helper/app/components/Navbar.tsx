export default function Navbar({
  setScreenFunction,
}: {
  setScreenFunction: (screen: "homePage" | "settingsPage") => void;
}) {
  return (
    <nav>
      <button onClick={() => setScreenFunction("homePage")}>Home</button>
      <button onClick={() => setScreenFunction("settingsPage")}>
        Settings
      </button>
    </nav>
  );
}
