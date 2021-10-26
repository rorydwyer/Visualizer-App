import { useState, useEffect } from "react";
import Node from "./Node";
import { getUnvisitedNeighbors } from "../algorithms/dijkstra";

const Grid = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const cols = 40;
  const rows = 25;
  let start = 210; // ID of start
  let end = 240; // ID of end

  // LifeCycle Hook
  useEffect(() => {
    // Create node list with id's acending
    setGrid(
      Array(cols * rows)
        .fill({ id: 0, visited: false, isWall: false })
        .map((node, i) => ({ ...node, id: i }))
    );
  }, []);

  // Handle Wall Key press
  const handleMouseDown = (node) => {
    grid[node].isWall = true;
    setGrid([...grid]);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (node) => {
    if (!mouseIsPressed) return;
    grid[node].isWall = true;
    setGrid([...grid]);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return (
    <div>
      <button
        className="border-2 border-blue-400 rounded p-3 m-3"
        onClick={() => {
          //   setGrid([...getUnvisitedNeighbors(grid, grid[start], cols)]);
          getUnvisitedNeighbors(grid, grid[start], cols, setGrid);
          //   console.log(grid);
        }}
      >
        Start
      </button>
      <div id="grid" className="flex flex-wrap max-w-screen-lg">
        {grid.map((n) => (
          <Node
            key={n.id}
            node={n}
            cols={cols}
            start={start}
            end={end}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseUp={handleMouseUp}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
