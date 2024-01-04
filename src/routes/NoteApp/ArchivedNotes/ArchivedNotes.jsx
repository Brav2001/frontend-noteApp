import { useEffect } from "react";
import ListOfCard from "../../../components/ListOfCard";
import { useStore } from "../../../store/store";
const ArchivedNotes = () => {
  const [notes, ChangeNotes] = useStore((state) => [
    state.notes,
    state.ChangeNotes,
  ]);
  useEffect(() => {
    if (!notes) {
      ChangeNotes();
    }
  }, []);
  return (
    <>
      <div className="w-full">
        <div>
          <ListOfCard archived={true} />
        </div>
      </div>
    </>
  );
};

export default ArchivedNotes;
