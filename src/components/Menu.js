import Button from "./Button";

const Menu = ({ onStart, onReset, onResetPath }) => {
  return (
    <div>
      <Button onClick={onStart} text="Start" />
      <Button onClick={onReset} text="Reset Grid" />
      <Button onClick={onResetPath} text="Reset Path" />
    </div>
  );
};

export default Menu;
