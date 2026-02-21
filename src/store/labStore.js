import { create } from "zustand";
import axios from "axios";
import { classifyReaction } from "../data/reactionEngine";


/* ---------------- API CONFIG ---------------- */

// Use environment variable for API URL, default to local backend
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:10000/api/experiments";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

/* ---------------- STORE ---------------- */

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

  selectedApparatus: "beaker",

  /* ---------------- APPARATUS ---------------- */

  setApparatus: (type) => {
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
      const res = await api.post("/start");

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

      console.log("✅ Experiment Started:", res.data._id);
    } catch (err) {
      console.error("❌ Start Experiment Error:", err.response?.data || err.message);
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
    const { solutes, solvent, temperature, steps, liquidColor } = get();

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

    const lastChemical =
      solutes.length > 0
        ? solutes[solutes.length - 1]
        : solvent;

    const reaction = classifyReaction(lastChemical, solute);

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

    if (!experimentId) {
      alert("Start experiment first!");
      return;
    }

    try {
      /* 🔥 Upload all steps in BATCH (Order Guaranteed) */
      if (steps.length > 0) {
        await api.post(`/batch-steps/${experimentId}`, { steps });
      }

      /* 🔥 Finish experiment */
      await api.post(`/finish/${experimentId}`, {
        temperature,
        liquidColor,
        solutes: solutes.map((s) => s.name),
        reactionType,
        equation,
        precipitate,
        gas,
      });

      /* 🔥 Download PDF */
      window.open(`${API_BASE}/report/${experimentId}`, "_blank");

      console.log("✅ Experiment Finished & Report Generated");
    } catch (err) {
      console.error("❌ Finish Error:", err.response?.data || err.message);
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
