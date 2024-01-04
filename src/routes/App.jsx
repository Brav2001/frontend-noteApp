import { useEffect, useState } from "react";
import { useStore } from "../store/store";

import NoteApp from "./NoteApp/NoteApp";
import Auth from "./Auth/Auth";

const App = () => {
  const [logged, Changelogged] = useStore((state) => [
    state.logged,
    state.Changelogged,
  ]);
  useEffect(() => {
    const login = localStorage.getItem("noteAppToken");
    login ? Changelogged(true) : Changelogged(false);
  }, []);
  return (
    <div className="w-full h-screen bg-background text-text flex justify-center pb-4">
      {logged ? <NoteApp /> : <Auth />}
    </div>
  );
};

export default App;
