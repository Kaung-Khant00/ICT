// useStore.js
import { create } from "zustand";

const useStore = create((set, get) => ({
  theme: localStorage.getItem("THEME") | "light",

  changeTheme: (newTheme) => {
    set({ theme: newTheme });
    localStorage.setItem("THEME", newTheme);
  },
}));

export default useStore;
