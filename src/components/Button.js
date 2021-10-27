const Button = ({ onClick, text }) => {
  return (
    <button className="border border-red-400 rounded p-2 m-2" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
