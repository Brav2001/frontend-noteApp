import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "../../components/NavBar";
import AllNotes from "./AllNotes/AllNotes";
import ArchivedNotes from "./ArchivedNotes/ArchivedNotes";
import { useStore } from "../../store/store";
import { useEffect } from "react";

const NoteApp = () => {
  const [ChangeCategory] = useStore((state) => [state.ChangeCategory]);

  useEffect(() => {
    ChangeCategory();
  }, []);
  return (
    <>
      <BrowserRouter>
        <NavBar>
          <Routes>
            <Route path="/" element={<AllNotes />} />
            <Route path="/archived" element={<ArchivedNotes />} />
          </Routes>
        </NavBar>
      </BrowserRouter>
    </>
  );
};

export default NoteApp;
