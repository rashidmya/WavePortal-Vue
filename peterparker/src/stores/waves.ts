import { defineStore } from "pinia";

export const useWavesStore = defineStore("waves", {
  state: () => {
    return {
      waves: [],
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setWaves(waves: any) {
      let wavesCleaned: any = [];

      waves.forEach((wave: any) => {
        wavesCleaned.push({
          address: wave.waver,
          timestamp: new Date(wave.timestamp * 1000),
          message: wave.message,
        });
      });

      this.waves = wavesCleaned;
    },
  },
  getters: {
    allWaves: (state) => state.waves,
  },
});
