import { create } from "zustand";
import axios from "axios";

export const useLabStore = create((set, get) => ({
  /* ---------------- STATE ---------------- */
  experimentId: null,
  solvent: null,
  solutes: [],
  liquidLevel: 0,
  liquidColor: "#ffffff",
  reacting: false,
  temperature: 25,

  /* ---------------- START EXPERIMENT ---------------- */
  startExperiment: async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/experiments/start"
      );

      set({
        experimentId: res.data._id,
        solvent: null,
        solutes: [],
        liquidLevel: 0,
        liquidColor: "#ffffff",
        temperature: 25,
      });

      console.log("Experiment Started:", res.data._id);
    } catch (error) {
      console.error("Start Experiment Error:", error);
    }
  },

  /* ---------------- ADD SOLVENT ---------------- */
  addSolvent: async (solvent) => {
    const { experimentId, temperature } = get();

    set({
      solvent,
      liquidLevel: 1.5,
      liquidColor: solvent.color,
    });

    if (experimentId) {
      try {
        await axios.post(
          `http://localhost:5000/api/experiments/step/${experimentId}`,
          {
            action: "add_solvent",
            chemical: solvent.name,
            temperature,
            liquidColor: solvent.color,
          }
        );
      } catch (error) {
        console.error("Add Solvent Error:", error);
      }
    }
  },

  /* ---------------- ADD SOLUTE ---------------- */
  addSolute: async (solute) => {
    const { experimentId, temperature, solutes } = get();

    const newTemp = temperature + solute.tempChange;

    set({
      solutes: [...solutes, solute],
      liquidColor: solute.reactionColor,
      reacting: true,
      temperature: newTemp,
    });

    // Stop reaction glow after 3 sec
    setTimeout(() => {
      set({ reacting: false });
    }, 3000);

    if (experimentId) {
      try {
        await axios.post(
          `http://localhost:5000/api/experiments/step/${experimentId}`,
          {
            action: "add_solute",
            chemical: solute.name,
            temperature: newTemp,
            liquidColor: solute.reactionColor,
          }
        );
      } catch (error) {
        console.error("Add Solute Error:", error);
      }
    }
  },

  /* ---------------- FINISH EXPERIMENT ---------------- */
  finishExperiment: async () => {
    const { experimentId, temperature, liquidColor, solutes } = get();

    if (!experimentId) return;

    try {
      await axios.post(
        `http://localhost:5000/api/experiments/finish/${experimentId}`,
        {
          temperature,
          liquidColor,
          solutes: solutes.map((s) => s.name),
        }
      );

      console.log("Experiment Finished");
    } catch (error) {
      console.error("Finish Experiment Error:", error);
    }
  },

  /* ---------------- DOWNLOAD REPORT ---------------- */
  downloadReport: () => {
    const { experimentId } = get();
    if (!experimentId) return;

    window.open(
      `http://localhost:5000/api/experiments/report/${experimentId}`
    );
  },

  /* ---------------- RESET LAB ---------------- */
  resetLab: () =>
    set({
      solvent: null,
      solutes: [],
      liquidLevel: 0,
      liquidColor: "#ffffff",
      reacting: false,
      temperature: 25,
    }),
}));
