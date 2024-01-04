const TextArea = ({
  id,
  type,
  label,
  value,
  change,
  maxLength,
  minLength,
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block my-4 text-2xl ">
        {label}
      </label>
      <textarea
        id={id}
        className="outline-none bg-color2 border-2 border-color2 text-lg rounded-3xl w-full py-2.5 px-3.5 hover:border-text h-44 duration-200"
        value={value}
        onChange={change}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        required
      />
    </div>
  );
};

export default TextArea;
