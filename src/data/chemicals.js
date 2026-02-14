/* ---------------- SOLVENTS ---------------- */
export const solvents = [
  {
    id: "water",
    name: "Water (H₂O)",
    type: "solvent",
    color: "#3b82f6",
  },
];

/* ---------------- SOLUTES ---------------- */
export const solutes = [
  {
    id: "nacl",
    name: "Sodium Chloride (NaCl)",
    type: "solute",
    reactionColor: "#a855f7",
    tempChange: 2,
  },
  {
    id: "hcl",
    name: "Hydrochloric Acid (HCl)",
    type: "solute",
    reactionColor: "#ef4444",
    tempChange: 8,
  },
  {
    id: "naoh",
    name: "Sodium Hydroxide (NaOH)",
    type: "solute",
    reactionColor: "#22c55e",
    tempChange: 6,
  },
  {
    id: "agno3",
    name: "Silver Nitrate (AgNO₃)",
    type: "solute",
    reactionColor: "#f97316",
    tempChange: 5,
  },
];

/* ---------------- REACTION RULES ---------------- */
export const reactions = [
  {
    reactants: ["hcl", "naoh"],
    resultColor: "#facc15",
    temperatureChange: 15,
    type: "Neutralization",
  },
  {
    reactants: ["agno3", "nacl"],
    resultColor: "#e5e7eb",
    temperatureChange: 5,
    type: "Precipitation",
  },
];
