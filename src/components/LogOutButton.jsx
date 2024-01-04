import { IoPower } from "react-icons/io5";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const [Changelogged, ChangeNotes] = useStore((state) => [
    state.Changelogged,
    state.ChangeNotes,
  ]);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("noteAppToken");
    navigate("/");
    Changelogged(false);
    ChangeNotes(false);
  };
  return (
    <button
      type="button"
      className="border-2 border-color3 bg-color3 hover:border-text  font-medium rounded-3xl text-md p-2.5 text-center inline-flex items-center me-2 duration-200"
      onClick={handleLogOut}
    >
      <IoPower size={25} />
    </button>
  );
};

export default LogOutButton;
