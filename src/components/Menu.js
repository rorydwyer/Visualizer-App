import Button from "./Button";

const Menu = ({ onStart, onReset, onResetPath }) => {
  return (
    <div>
      <Button onClick={onStart} text="Start" />
      <Button onClick={onResetPath} text="Reset Path" />
      <Button onClick={onReset} text="Reset Grid" />
    </div>
  );
};

export default Menu;
