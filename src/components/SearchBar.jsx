import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useStore } from "../store/store";

const SearchBar = ({}) => {
  const [hover, setHover] = useState(false);
  const [val, setval] = useState("");
  const [ChangeFilter] = useStore((state) => [state.ChangeFilter]);

  const changeHoverTrue = () => {
    setHover(true);
  };
  const changeHoverFalse = () => {
    setHover(false);
  };
  const handleChangeVal = (e) => {
    setval(e.target.value);
  };
  useEffect(() => {
    ChangeFilter(val);
  }, [val]);
  return (
    <div
      className="relative w-full"
      onMouseOver={changeHoverTrue}
      onMouseLeave={changeHoverFalse}
    >
      <input
        type="search"
        id="search"
        className={`${
          hover && "border-text"
        } outline-none bg-color2 border-2 border-color2 text-md rounded-3xl w-full py-2.5 px-3.5  duration-200`}
        value={val}
        onChange={handleChangeVal}
        placeholder="Search Category"
      />
      <button
        className={`${
          hover && "border-text"
        } absolute top-0 end-0 p-2.5 text-sm font-medium h-full  bg-color2 rounded-e-3xl border-y-2 border-r-2 border-color2 cursor-default duration-200`}
      >
        <span className="sr-only">Search</span>
        <IoSearch size={25} />
      </button>
    </div>
  );
};

export default SearchBar;
