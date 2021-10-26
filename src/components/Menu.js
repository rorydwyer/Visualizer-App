import Button from "./Button";

const Menu = ({ onStart, onReset }) => {
  return (
    <div>
      <Button onClick={onStart} text="Start" />
      <Button onClick={onReset} text="Reset" />
    </div>
  );
};

export default Menu;
