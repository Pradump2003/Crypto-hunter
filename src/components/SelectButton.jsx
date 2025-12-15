const SelectButton = ({ children, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`border border-yellow-400 px-5 py-2 rounded 
      ${selected ? "bg-yellow-400 text-black" : "text-white"}
      hover:bg-yellow-400 hover:text-black`}
    >
      {children}
    </button>
  );
};

export default SelectButton;
