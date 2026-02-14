import { solvents, solutes } from "../data/chemicals";
import { useLabStore } from "../store/labStore";

export default function ChemicalPanel() {
  const { addSolvent, addSolute } = useLabStore();

  return (
    <div style={{ padding: "10px", background: "#222", color: "white" }}>
      <h3>Solvents</h3>
      {solvents.map((solvent) => (
        <button
          key={solvent.id}
          onClick={() => addSolvent(solvent)}
          style={{ margin: "5px" }}
        >
          {solvent.name}
        </button>
      ))}

      <h3>Solutes</h3>
      {solutes.map((solute) => (
        <button
          key={solute.id}
          onClick={() => addSolute(solute)}
          style={{ margin: "5px" }}
        >
          {solute.name}
        </button>
      ))}
    </div>
  );
}
