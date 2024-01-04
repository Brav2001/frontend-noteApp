import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const ConfirmModal = ({ hidden, text, onConfirm, onclose }) => {
  return (
    <div className={`${!hidden && "hidden"}`}>
      <div className="fixed top-0 z-50 left-0 w-full h-full bg-background opacity-95"></div>
      <div className="fixed top-0 right-0 bottom-0  z-50 left-0 flex flex-col items-center justify-center">
        <div className="bg-color3 max-w-sm p-4 rounded-2xl">
          <h5 className="text-xl font-bold  text-center">{text}</h5>
          <div className="w-full mt-8 flex justify-center ">
            <button
              type="submit"
              className="bg-color3 border-color3 border-2 font-medium rounded-3xl text-sm p-1.5 mr-2 mb-2   hover:border-text duration-200"
              onClick={onConfirm}
            >
              <FaCheck size={25} />
            </button>
            <button
              type="button"
              className="bg-color3 border-color3 border-2 font-medium rounded-3xl text-sm p-1.5 mr-2 mb-2   hover:border-text duration-200"
              onClick={onclose}
            >
              <FaTimes size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
