// import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist as persistMiddleWare, StateStorage } from "zustand/middleware";

const storage = {
  getItem: async (name) => {
    console.log(name, "has been retrieved");
    return (await localStorage.getItem(name)) ?? null;
  },
  setItem: async (name, value) => {
    console.log(name, "with value", value, "has been saved");
    localStorage.setItem(name, value);
  },
};

export const persist = (name, state) => {
  return () =>
    persistMiddleWare(state, {
      name,
      getStorage: () => storage,
    });
};
