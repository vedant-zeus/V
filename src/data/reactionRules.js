export function canReact(chemA, chemB) {
  if (!chemA || !chemB) return false;

  // Acid + Base → Neutralization
  if (
    (chemA.type === "acid" && chemB.type === "base") ||
    (chemA.type === "base" && chemB.type === "acid")
  ) {
    return "neutralization";
  }

  // Salt + Salt (precipitation possible)
  if (
    chemA.type === "salt" &&
    chemB.type === "salt"
  ) {
    return "precipitation";
  }

  // Acid + Carbonate → Gas evolution
  if (
    chemA.type === "acid" &&
    chemB.formula.includes("CO3")
  ) {
    return "gas";
  }

  return false;
}
