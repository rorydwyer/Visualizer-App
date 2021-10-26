const Node = ({ node, cols, start, end, onMouseDown, onMouseEnter, onMouseUp }) => {
  const width = 1024 / cols + "px";

  return (
    <div
      id={node.id}
      style={{ width: width, height: width }}
      className={`border border-black ${
        start === node.id ? "node-start" : end === node.id ? "node-end" : node.isWall ? "node-wall" : node.visited === true ? "node-visited" : ""
      }`}
      onMouseDown={() => onMouseDown(node.id)}
      onMouseEnter={() => onMouseEnter(node.id)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
