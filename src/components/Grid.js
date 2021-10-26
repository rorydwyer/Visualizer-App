import { useState, useEffect, createRef, useRef } from "react";
// import Node from "./Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const Grid = () => {
  //   const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [grid, setGrid] = useState([]);

  const cols = 40;
  const rows = 25;
  const width = 1024 / cols + "px";
  let start = 210; // ID of start
  let end = 240; // ID of end

  const nodeRefs = useRef([]);
  nodeRefs.current = grid.map((el, i) => nodeRefs.current[i] ?? createRef());

  // LifeCycle Hook
  useEffect(() => {
    setGrid(
      Array(cols * rows)
        .fill({ id: 0, isVisited: false, isWall: false, distance: Infinity, previousNode: null, isStart: false, isEnd: false })
        .map((node, i) => ({ ...node, id: i, isStart: i === start, isEnd: i === end }))
    );
  }, []);

  // HANDLE WALLS CLICKS
  const handleMouseDown = (id) => {
    toggleWall(id);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (id) => {
    if (!mouseIsPressed) return;
    toggleWall(id);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const toggleWall = (id) => {
    nodeRefs.current[id].current.classList.toggle("node-wall");
    grid[id].isWall = !grid[id].isWall;
    setGrid(grid);
  };

  // HANDLE DIJKSTRA
  const animateDijkstra = () => {
    console.log(grid);
    const visitedNodesInOrder = dijkstra(grid, grid[start], grid[end], cols);
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        console.log(visitedNodesInOrder[i].id, nodeRefs.current[visitedNodesInOrder[i].id].current);
        nodeRefs.current[visitedNodesInOrder[i].id].current.classList.add("node-visited");
        // node.classList.add("node-visited");
      }, 10 * i);
    }
  };

  return (
    <div>
      <button
        className="border-2 border-blue-400 rounded p-3 m-3"
        onClick={() => {
          animateDijkstra();
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
            } id-${n.id}`}
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
