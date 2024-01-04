const Toggle = ({ label, val, onchange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        onChange={onchange}
        className="sr-only peer"
        checked={val}
      />
      <div className=" w-11 h-6 bg-background peer-focus:outline-none  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-background peer-checked:after:bg-background after:content-[''] after:absolute after:top-[4px] after:start-[2px] after:bg-text after:border-text after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-text duration"></div>
      <span className=" mx-2 text-xl font-medium ">{label}</span>
    </label>
  );
};

export default Toggle;
