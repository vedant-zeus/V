import { create } from "zustand";
import axios from "axios";
import { classifyReaction } from "../data/reactionEngine";

const API = "http://localhost:5000/api/experiments";

export const useLabStore = create((set, get) => ({
  /* ---------------- CORE STATE ---------------- */
  experimentId: null,

  solvent: null,
  solutes: [],

  liquidLevel: 0,
  liquidColor: "#ffffff",
  temperature: 25,

  reactionType: null,
  equation: null,
  precipitate: false,
  gas: false,

  steps: [],

  /* ---------------- NEW: APPARATUS SYSTEM ---------------- */
  selectedApparatus: "beaker",

  setApparatus: (type) => {
    // When switching apparatus, reset liquid visuals
    set({
      selectedApparatus: type,
      liquidLevel: 0,
      liquidColor: "#ffffff",
      solvent: null,
      solutes: [],
      reactionType: null,
      equation: null,
      precipitate: false,
      gas: false,
    });
  },

  /* ---------------- START EXPERIMENT ---------------- */
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
          formula: solvent.formula,
          category: solvent.category || "solvent",
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
      liquidColor,
    } = get();

    if (!solvent) {
      alert("Add solvent first!");
      return;
    }

    const updatedSolutes = [...solutes, solute];

    let newTemp = temperature;
    let newColor = liquidColor;
    let reactionType = null;
    let equation = null;
    let precipitate = false;
    let gas = false;

    // Determine last chemical added
    const lastChemical =
      solutes.length > 0
        ? solutes[solutes.length - 1]
        : solvent;

    const reaction = classifyReaction(
      lastChemical,
      solute
    );

    if (reaction) {
      reactionType = reaction.type;
      equation = reaction.equation;
      precipitate = reaction.precipitate;
      gas = reaction.gas;
      newTemp += reaction.temperatureChange;
      newColor = reaction.color;
    }

    set({
      solutes: updatedSolutes,
      temperature: newTemp,
      liquidColor: newColor,
      reactionType,
      equation,
      precipitate,
      gas,
      steps: [
        ...steps,
        {
          action: "add_solute",
          chemical: solute.name,
          formula: solute.formula,
          category: solute.category,
          temperature: newTemp,
          liquidColor: newColor,
          reactionType: reactionType || "No Reaction",
          equation: equation || "No Reaction",
          precipitate,
          gas,
        },
      ],
    });
  },

  /* ---------------- FINISH EXPERIMENT ---------------- */
  finishExperiment: async () => {
    const {
      experimentId,
      temperature,
      liquidColor,
      solutes,
      steps,
      reactionType,
      equation,
      precipitate,
      gas,
    } = get();

    if (!experimentId) return;

    try {
      // Upload steps
      for (const step of steps) {
        await axios.post(`${API}/step/${experimentId}`, step);
      }

      await axios.post(`${API}/finish/${experimentId}`, {
        temperature,
        liquidColor,
        solutes: solutes.map((s) => s.name),
        reactionType,
        equation,
        precipitate,
        gas,
      });

      window.open(`${API}/report/${experimentId}`);

      console.log("Experiment Finished & Report Downloaded");
    } catch (err) {
      console.error(err);
    }
  },

  /* ---------------- RESET LAB ---------------- */
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
