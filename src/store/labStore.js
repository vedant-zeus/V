import { create } from "zustand";
import axios from "axios";

const API = "http://localhost:5000/api/experiments";

export const useLabStore = create((set, get) => ({
  experimentId: null,
  solvent: null,
  solutes: [],
  liquidLevel: 0,
  liquidColor: "#ffffff",
  temperature: 25,
  steps: [],
  reactionType: null,
  equation: null,
  precipitate: false,
  gas: false,

  /* ---------------- START ---------------- */
  startExperiment: async () => {
    try {
      const res = await axios.post(`${API}/start`);

      set({
        experimentId: res.data._id,
        solvent: null,
        solutes: [],
        liquidLevel: 0,
        liquidColor: "#ffffff",
        temperature: 25,
        steps: [],
        reactionType: null,
        equation: null,
        precipitate: false,
        gas: false,
      });

      console.log("Experiment Started:", res.data._id);
    } catch (err) {
      console.error(err);
    }
  },

  /* ---------------- ADD SOLVENT ---------------- */
  addSolvent: (solvent) => {
    const { temperature, steps } = get();

    set({
      solvent,
      liquidLevel: 1.5,
      liquidColor: solvent.color,
      steps: [
        ...steps,
        {
          action: "add_solvent",
          chemical: solvent.name,
          temperature,
          liquidColor: solvent.color,
        },
      ],
    });
  },

  /* ---------------- ADD SOLUTE ---------------- */
  addSolute: (solute) => {
  const {
    solutes,
    solvent,
    temperature,
    steps,
  } = get();

  const updatedSolutes = [...solutes, solute];

  let newTemp = temperature;
  let newColor = solute.reactionColor;
  let reactionType = null;
  let equation = null;
  let precipitate = false;
  let gas = false;

  const allChemicals = [
    solvent?.formula,
    ...updatedSolutes.map((s) => s.formula),
  ].filter(Boolean);

  const matched = reactionDatabase.find((reaction) =>
    reaction.reactants.every((chem) =>
      allChemicals.includes(chem)
    )
  );

  if (matched) {
    newTemp += matched.temperatureChange;
    newColor = matched.resultColor;
    reactionType = matched.type;
    equation = matched.equation;
    precipitate = matched.precipitate;
    gas = matched.gas;
  }

  set({
    solutes: updatedSolutes,
    temperature: newTemp,
    liquidColor: newColor,
    reactionType,
    equation,
    precipitate,
    gas,
  });
}
,

  /* ---------------- FINISH ---------------- */
  finishExperiment: async () => {
    const {
      experimentId,
      temperature,
      liquidColor,
      solutes,
      steps,
    } = get();

    if (!experimentId) return;

    try {
      // Upload all steps
      for (const step of steps) {
        await axios.post(`${API}/step/${experimentId}`, step);
      }

      await axios.post(`${API}/finish/${experimentId}`, {
        temperature,
        liquidColor,
        solutes: solutes.map((s) => s.name),
      });

      window.open(`${API}/report/${experimentId}`);

      console.log("Experiment Finished & Report Downloaded");
    } catch (err) {
      console.error(err);
    }
  },

  /* ---------------- RESET ---------------- */
  resetLab: () =>
    set({
      solvent: null,
      solutes: [],
      liquidLevel: 0,
      liquidColor: "#ffffff",
      temperature: 25,
      steps: [],
      reactionType: null,
      equation: null,
      precipitate: false,
      gas: false,
    }),
}));
