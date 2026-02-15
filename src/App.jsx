import "./App.css";
import LabScene from "./components/LabScene";
import Controls from "./ui/Controls";
import ChemicalPanel from "./ui/ChemicalPanel";
import { useLabStore } from "./store/labStore";

function App() {
  const {
    experimentId,
    temperature,
    steps,
  } = useLabStore();

  const isRunning = Boolean(experimentId);

  return (
    <div className="app-container">

      {/* -------- Sidebar -------- */}
      <div className="sidebar">

        <div className="sidebar-header">
          <h2>🧪 Virtual Chem Lab</h2>

          <p className="session-status">
            {isRunning
              ? "🟢 Experiment Running"
              : "🔴 Not Started"}
          </p>
        </div>

        {/* Controls (Start / Finish / Reset) */}
        <Controls />

        <div className="divider" />

        {/* Chemicals */}
        <ChemicalPanel />

        <div className="divider" />

        {/* Live Experiment Info */}
        <div className="live-panel">
          <h3>Experiment Info</h3>

          <p>
            🌡 Temperature: <strong>{temperature}°C</strong>
          </p>

          <p>
            📋 Steps Performed: <strong>{steps.length}</strong>
          </p>

          <p>
            🧾 Experiment ID:{" "}
            <strong>
              {experimentId ? experimentId.slice(0, 8) : "—"}
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
