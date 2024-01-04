import { useNavigate } from "react-router-dom";

const TextButton = ({ label, route }) => {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate(route);
  };
  return (
    <button
      type="button"
      className="hover:underline text-xl px-5 py-2.5 me-2 mb-2 outline-none  duration-200"
      onClick={onNavigate}
    >
      {label}
    </button>
  );
};

export default TextButton;
