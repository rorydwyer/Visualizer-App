import { useState, useEffect } from "react";
import Node from "./Node";
import { getUnvisitedNeighbors } from "../algorithms/dijkstra";

const Grid = () => {
  const [grid, setGrid] = useState([]);

  const cols = 50;
  const rows = 40;
  let start = 210; // ID of start
  let end = 240; // ID of end

  // LifeCycle Hook
  useEffect(() => {
    // Create node list with id's acending
    setGrid(
      Array(cols * rows)
        .fill({ id: 0, visited: false })
        .map((node, i) => ({ ...node, id: i }))
    );
  }, []);

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
          <Node key={n.id} node={n} cols={cols} start={start} end={end} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
