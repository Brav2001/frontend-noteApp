const ButtonForms = ({ label, disabled = false }) => {
  return (
    <button
      type="submit"
      className={`bg-color3 border-2 border-color3 rounded-3xl text-2xl px-5 py-2.5 me-2 mb-2 outline-none mb-4 mt-6 w-1/2 duration-200 ${
        disabled && "cursor-not-allowed"
      }
        ${!disabled && "hover:border-text"}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ButtonForms;
