import { useStore } from "../store/store.js";

export const removeAccess = () => {
  localStorage.removeItem("noteAppToken");
  useStore.getState().Changelogged(false);
  return;
};
