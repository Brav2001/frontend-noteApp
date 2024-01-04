import { useState } from "react";
import { IoReader } from "react-icons/io5";
import Modal from "./Modal";
import FormEditNote from "./FormEditNote";

const Card = ({ note }) => {
  const [hide, setHide] = useState(false);
  const handleShowModal = () => {
    setHide(true);
  };

  const handleCloseModal = () => {
    setHide(false);
  };
  return (
    <>
      <div
        className="w-full rounded-3xl bg-color2 my-4 p-4 border-2 border-color2 hover:border-text duration-200 cursor-pointer flex flex-row items-center"
        onClick={handleShowModal}
      >
        <div className="aspect-square w-2/12 p-1 rounded-3xl bg-color3 mr-2 flex justify-center items-center">
          <IoReader size={60} />
        </div>
        <div className="text-xl font-md">{note.title}</div>
      </div>
      <Modal hidden={hide} onclose={handleCloseModal}>
        <FormEditNote note={note} onclose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Card;
