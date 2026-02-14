import { useLabStore } from "../store/labStore";

export default function Controls() {
  const {
    startExperiment,
    finishExperiment,
    downloadReport,
    resetLab,
    temperature,
  } = useLabStore();

  return (
    <>
      <button onClick={startExperiment}>
        Start Experiment
      </button>

      <button onClick={finishExperiment}>
        Finish Experiment
      </button>

      <button onClick={downloadReport}>
        Download PDF Report
      </button>

      <button onClick={resetLab}>
        Reset Lab
      </button>

      <div className="temperature-display">
        🌡 Temperature: {temperature}°C
      </div>
    </>
  );
}
