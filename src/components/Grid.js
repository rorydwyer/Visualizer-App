import { useState, useEffect, createRef, useRef } from "react";
// import Node from "./Node";
import { getUnvisitedNeighbors } from "../algorithms/dijkstra";

const Grid = () => {
  //   const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const cols = 40;
  const rows = 25;
  const width = 1024 / cols + "px";
  let start = 210; // ID of start
  let end = 240; // ID of end

  const grid = Array(cols * rows)
    .fill({ id: 0, visited: false, isWall: false })
    .map((node, i) => ({ ...node, id: i }));

  const nodeRefs = useRef([]);
  nodeRefs.current = grid.map((el, i) => nodeRefs.current[i] ?? createRef());

  // LifeCycle Hook
  useEffect(() => {}, []);

  // Handle Wall Key press
  const handleMouseDown = (id) => {
    nodeRefs.current[id].current.classList.toggle("node-wall");
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (id) => {
    if (!mouseIsPressed) return;
    nodeRefs.current[id].current.classList.toggle("node-wall");
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <div>
      <button
        className="border-2 border-blue-400 rounded p-3 m-3"
        onClick={() => {
          //   getUnvisitedNeighbors(grid, grid[start], cols, setGrid);
          console.log(this.refs.node4);
        }}
      >
        Start
      </button>
      <div id="grid" className="flex flex-wrap max-w-screen-lg">
        {grid.map((n) => (
          <div
            key={n.id}
            ref={nodeRefs.current[n.id]}
            className={`border border-black ${
              start === n.id ? "node-start" : end === n.id ? "node-end" : n.isWall ? "node-wall" : n.visited === true ? "node-visited" : ""
            }`}
            style={{ width: width, height: width }}
            onMouseDown={() => handleMouseDown(n.id)}
            onMouseEnter={() => handleMouseEnter(n.id)}
            onMouseUp={() => handleMouseUp()}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
