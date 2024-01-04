import { useEffect, useState } from "react";
import AddButton from "../../../components/AddButton";
import Modal from "../../../components/Modal";
import FormAddNote from "../../../components/FormAddNote";
import { useStore } from "../../../store/store";
import { api, fetchData } from "../../../utils/api";
import ListOfCard from "../../../components/ListOfCard";
const AllNotes = () => {
  const [hide, setHide] = useState(false);
  const [notes, ChangeNotes] = useStore((state) => [
    state.notes,
    state.ChangeNotes,
  ]);

  const handleShowModal = () => {
    setHide(true);
  };

  const handleCloseModal = () => {
    setHide(false);
  };

  useEffect(() => {
    if (!notes) {
      ChangeNotes();
    }
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="w-full">
          <ListOfCard archived={false} />
        </div>
      </div>
      <div className="relative ">
        <div className="fixed bottom-0  mb-4 w-11/12 sm:w-2/5 lg:w-1/3 z-10">
          <div className="flex justify-end">
            <AddButton onclick={handleShowModal} />
          </div>
        </div>
      </div>
      <Modal hidden={hide} onclose={handleCloseModal}>
        <FormAddNote onclose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default AllNotes;
