import { useState } from "react";
import { useStore } from "../store/store";
const DataList = ({ oninput }) => {
  const [hover, setHover] = useState(false);

  const [category] = useStore((state) => [state.category]);

  const changeHoverTrue = () => {
    setHover(true);
  };
  const changeHoverFalse = () => {
    setHover(false);
  };
  return (
    <div
      className="relative w-full"
      onMouseOver={changeHoverTrue}
      onMouseLeave={changeHoverFalse}
    >
      <input
        type="text"
        name="autocomplete"
        className={`${
          hover && "border-text"
        } outline-none bg-color2 border-2 border-color2 text-md rounded-3xl w-full py-2.5 px-3.5  duration-200`}
        placeholder="Search Category"
        list="datalist"
        onInput={oninput}
      />

      <datalist id="datalist">
        {category &&
          category.map((cat) => <option value={cat.name} key={cat.id} />)}
      </datalist>
    </div>
  );
};

export default DataList;
