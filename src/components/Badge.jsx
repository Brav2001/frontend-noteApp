import { IoClose } from "react-icons/io5";
const Badge = ({ edit = false, label, remove }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-1 m-1 text-sm font-medium  bg-color2 rounded ">
      {label}
      {edit && (
        <button
          type="button"
          className="inline-flex  items-center p-1 ms-2 text-md text-background bg-transparent rounded-full hover:bg-text duration-200"
          onClick={remove}
        >
          <IoClose />
        </button>
      )}
    </span>
  );
};

export default Badge;
