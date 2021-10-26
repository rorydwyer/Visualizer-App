const Button = ({ onClick, text }) => {
  return (
    <button className="border-2 border-blue-400 rounded p-3 m-3" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
