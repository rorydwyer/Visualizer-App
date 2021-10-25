const Node = ({ node, cols, start, end }) => {
  const width = 1024 / cols + "px";

  return (
    <div
      id={node.id}
      className={`border border-black ${start === node.id ? "node-start" : end === node.id ? "node-end" : ""} ${node.visited === true ? "visited" : ""}`}
      style={{ width: width, height: width }}
    >
      {node.visited ? "x" : ""}
    </div>
  );
};

export default Node;
