export function classifyReaction(chemA, chemB) {
  if (!chemA || !chemB) return null;

  // 1️⃣ Neutralization
  if (
    (chemA.type === "acid" && chemB.type === "base") ||
    (chemA.type === "base" && chemB.type === "acid")
  ) {
    return {
      type: "Neutralization",
      equation:
        "HCl (aq) + NaOH (aq) → NaCl (aq) + H₂O (l)",
      products: ["NaCl", "H2O"],
      precipitate: false,
      gas: false,
      temperatureChange: 10,
      color: "#facc15",
    };
  }

  // 2️⃣ Precipitation
  if (
    chemA.formula === "AgNO3" &&
    chemB.formula === "NaCl"
  ) {
    return {
      type: "Precipitation",
      equation:
        "AgNO₃ (aq) + NaCl (aq) → AgCl (s)↓ + NaNO₃ (aq)",
      products: ["AgCl", "NaNO3"],
      precipitate: true,
      gas: false,
      temperatureChange: 3,
      color: "#f1f5f9",
    };
  }

  // 3️⃣ Acid + Carbonate (Gas evolution)
  if (
    chemA.type === "acid" &&
    chemB.formula.includes("CO3")
  ) {
    return {
      type: "Gas Evolution",
      equation:
        "Na₂CO₃ (aq) + 2HCl (aq) → 2NaCl (aq) + H₂O (l) + CO₂ (g)↑",
      products: ["NaCl", "H2O", "CO2"],
      precipitate: false,
      gas: true,
      temperatureChange: 5,
      color: "#3b82f6",
    };
  }

  return null;
}
