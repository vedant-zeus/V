import { apparatusList } from "../data/apparatus";
import { useLabStore } from "../store/labStore";

export default function ApparatusPanel() {
  const { selectedApparatus, setApparatus } = useLabStore();

  return (
    <div>
      <h3>Lab Apparatus</h3>

      {apparatusList.map((item) => (
        <button
          key={item.type}
          onClick={() => setApparatus(item.type)}
          style={{
            background:
              selectedApparatus === item.type
                ? "#2563eb"
                : "#1e293b",
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
