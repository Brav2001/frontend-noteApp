import { create } from "zustand";
import { api, fetchData } from "../utils/api";

export const useStore = create((set) => ({
  logged: false,
  notes: false,
  category: false,
  search: "",
  Changelogged: (value) => set((state) => ({ logged: value })),
  ChangeNotes: (value) => set((state) => ({ notes: value })),
  ChangeCategory: async () => {
    const value = await getAllCategories();
    set((state) => ({ category: value }));
  },
  ChangeFilter: (value) => {
    console.log(value);
    set((state) => ({ search: value }));
  },
}));

const getAllCategories = async () => {
  const data = await fetchData("GET", api.category.getAll, "", true);
  return data;
};
