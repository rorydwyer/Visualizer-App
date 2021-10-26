import { useState, useEffect, createRef, useRef } from "react";
import Menu from "./Menu";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const Grid = () => {
  //   const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [grid, setGrid] = useState([]);

  const cols = 40;
  const rows = 25;
  const width = 1024 / cols + "px";
  let start = 210; // ID of start
  let end = 860; // ID of end

  const nodeRefs = useRef([]);
  nodeRefs.current = grid.map((el, i) => nodeRefs.current[i] ?? createRef());

  // LifeCycle Hook
  useEffect(() => {
    resetGrid();
  }, []);

  // RESET GRID
  const resetGrid = () => {
    nodeRefs.current.forEach((n) => n.current.classList.remove("node-shortest-path", "node-visited", "node-wall"));

    setGrid(
      Array(cols * rows)
        .fill({ id: 0, isVisited: false, isWall: false, distance: Infinity, previousNode: null, isStart: false, isEnd: false })
        .map((node, i) => ({ ...node, id: i, isStart: i === start, isEnd: i === end }))
    );
  };

  // HANDLE WALLS CLICKS
  const handleMouseDown = (id) => {
    toggleWall(id);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (e, id) => {
    if (mouseIsPressed) {
      toggleWall(id);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const toggleWall = (id) => {
    nodeRefs.current[id].current.classList.toggle("node-wall");
    grid[id].isWall = !grid[id].isWall;
    setGrid(grid);
  };

  // DIJKSTRA
  const animateDijkstra = () => {
    const visitedNodesInOrder = dijkstra(grid, grid[start], grid[end], cols);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[end]);

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      // Animate the visited nodes
      setTimeout(() => {
        nodeRefs.current[visitedNodesInOrder[i].id].current.classList.add("node-visited");

        // Animate the shortest path
        if (i === visitedNodesInOrder.length - 1) {
          for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
              const node = nodesInShortestPathOrder[i];
              nodeRefs.current[node.id].current.classList.add("node-shortest-path");
            }, 50 * i);
          }
        }
      }, 10 * i);
    }
  };

  return (
    <div>
      <Menu onStart={animateDijkstra} onReset={resetGrid} />
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
            onMouseEnter={(e) => handleMouseEnter(e, n.id)}
            onMouseUp={() => handleMouseUp()}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
