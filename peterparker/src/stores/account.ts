import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => {
    return { account: "" };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    setCurrentAccount(account: string) {
      this.account = account;
    },
  },
  getters: {
    currentAccount: (state) => state.account,
  },
});
