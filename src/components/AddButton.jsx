import { IoPower } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";

const AddButton = ({ onclick }) => {
  return (
    <button
      type="button"
      className="border-2 border-text bg-color3 hover:border-text  text-xl hover:text-3xl rounded-3xl text-md p-2.5 text-center inline-flex items-center me-2 duration-200"
      onClick={onclick}
    >
      <IoAddOutline />
    </button>
  );
};

export default AddButton;
