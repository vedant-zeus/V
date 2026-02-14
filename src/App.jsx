import "./App.css";
import LabScene from "./components/LabScene";
import Controls from "./ui/Controls";
import ChemicalPanel from "./ui/ChemicalPanel";
import { useLabStore } from "./store/labStore";

function App() {
  const { temperature, reactionType, experimentId } = useLabStore();

  return (
    <div className="app-container">

      {/* -------- Sidebar -------- */}
      <div className="sidebar">

        <div className="sidebar-header">
          <h2>🧪 Virtual Chem Lab</h2>
          <p className="session-status">
            {experimentId ? "🟢 Experiment Running" : "🔴 Not Started"}
          </p>
        </div>

        <Controls />

        <div className="divider" />

        <ChemicalPanel />

        <div className="divider" />

        {/* Live Data Panel */}
        <div className="live-panel">
          <h3>Live Status</h3>
          <p>🌡 Temperature: <strong>{temperature}°C</strong></p>
          <p>
            ⚗ Reaction:{" "}
            <strong>
              {reactionType ? reactionType : "None"}
            </strong>
          </p>
        </div>

      </div>

      {/* -------- 3D Scene -------- */}
      <div className="scene-container">
        <LabScene />
      </div>

    </div>
  );
}

export default App;
