import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ButtonBack = () => {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(-1);
  };
  return (
    <button
      type="button"
      className="hover:underline text-xl pr-5 py-2.5 mb-2 outline-none duration-200 flex flex-row items-center"
      onClick={onNavigate}
    >
      <IoChevronBackOutline size={40} />
      back
    </button>
  );
};

export default ButtonBack;
