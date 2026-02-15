import "./App.css";
import LabScene from "./components/LabScene";
import Controls from "./ui/Controls";
import ChemicalPanel from "./ui/ChemicalPanel";
import ApparatusPanel from "./ui/ApparatusPanel";
import { useLabStore } from "./store/labStore";

function App() {
  const {
    experimentId,
    temperature,
    steps,
    reactionType,
    equation,
    precipitate,
    gas,
  } = useLabStore();

  const isRunning = Boolean(experimentId);

  return (
    <div className="app-container">

      {/* -------- LEFT SIDEBAR -------- */}
      <div className="sidebar-left">

        <div className="sidebar-header">
          <h2>🧪 Virtual Chem Lab</h2>

          <p className="session-status">
            {isRunning
              ? "🟢 Experiment Running"
              : "🔴 Not Started"}
          </p>
        </div>

        <Controls />

        <div className="divider" />

        <ChemicalPanel />

        <div className="divider" />

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

          <div className="divider" />

          <h3>Reaction Status</h3>

          <p>
            ⚗ Type:{" "}
            <strong>
              {reactionType ? reactionType : "No Reaction"}
            </strong>
          </p>

          <p>
            🧪 Equation:
            <br />
            <strong>
              {equation ? equation : "—"}
            </strong>
          </p>

          {precipitate && (
            <p style={{ color: "#f1f5f9" }}>
              ⚪ Precipitate Formed
            </p>
          )}

          {gas && (
            <p style={{ color: "#3b82f6" }}>
              🫧 Gas Evolved
            </p>
          )}
        </div>

      </div>

      {/* -------- CENTER SCENE -------- */}
      <div className="scene-container">
        <LabScene />
      </div>

      {/* -------- RIGHT SIDEBAR -------- */}
      <div className="sidebar-right">
        <ApparatusPanel />
      </div>

    </div>
  );
}

export default App;
