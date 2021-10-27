import { useState, useEffect, createRef, useRef } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "./algorithms/dijkstra";
import Grid from "./components/Grid";
import Menu from "./components/Menu";
import "./App.css";

function App() {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [changingStart, setChangingStart] = useState(false);
  const [changingEnd, setChangingEnd] = useState(false);
  const [animationRunning, setAnimationRunning] = useState(false);
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState(445);
  const [end, setEnd] = useState(474);

  const cols = 40;
  const rows = 25;
  const width = 1024 / cols + "px";

  // Use refs instead of state for performance
  const nodeRefs = useRef([]);
  nodeRefs.current = grid.map((el, i) => nodeRefs.current[i] ?? createRef());

  // LifeCycle Hook
  useEffect(() => {
    resetGrid();
  }, []);

  // RESET GRID
  const resetGrid = () => {
    if (animationRunning) return;

    nodeRefs.current.forEach((n) => n.current.classList.remove("node-shortest-path", "node-visited", "node-wall"));
    setGrid(
      Array(cols * rows)
        .fill({ id: 0, isVisited: false, isWall: false, distance: Infinity, previousNode: null, isStart: false, isEnd: false })
        .map((node, i) => ({ ...node, id: i, isStart: i === start, isEnd: i === end }))
    );
  };

  // RESET WALLS
  const resetPath = () => {
    if (animationRunning) return;

    nodeRefs.current.forEach((n) => n.current.classList.remove("node-shortest-path", "node-visited"));
    setGrid(grid.map((node) => ({ ...node, isVisited: false, distance: Infinity, previousNode: null })));
  };

  // HANDLE CLICKS and DRAGGING
  // Mouse Down
  const handleMouseDown = (id) => {
    if (animationRunning) return; // Prevent user from changing grid while animation is running
    setMouseIsPressed(true);

    // Check where the user clicked
    if (id === start) setChangingStart(true);
    else if (id === end) setChangingEnd(true);
    else toggleWall(id);
  };

  // Mouse Up
  const handleMouseUp = (id) => {
    setMouseIsPressed(false);

    // Set the new location of the start or end node
    if (changingStart) moveStart(id);
    else if (changingEnd) moveEnd();
  };

  // Mouse Move
  const handleMouseEnter = (id) => {
    if (!mouseIsPressed) return;

    // Drag the start or end node, or toggle a wall
    if (changingStart) nodeRefs.current[id].current.classList.add("node-start");
    else if (changingEnd) nodeRefs.current[id].current.classList.add("node-end");
    else toggleWall(id);
  };

  // Mouse Leave
  const handleMouseLeave = (id) => {
    if (changingStart) nodeRefs.current[id].current.classList.remove("node-start");
    else if (changingEnd) nodeRefs.current[id].current.classList.remove("node-end");
  };

  // HANDLE START/END CLICKS, WALL CLICKS
  const moveStart = (id) => {
    // Remove the old start node
    grid[start].isStart = false;
    nodeRefs.current[id].current.classList.remove("node-wall");

    // Add the new start node
    setStart(id);
    grid[start].isStart = true;
    grid[start].isWall = false;
    setGrid(grid);

    setChangingStart(false);
  };

  const moveEnd = () => {
    const newEnd = nodeRefs.current.findIndex((n) => n.current.classList.contains("node-end"));

    // Remove the old end node
    nodeRefs.current[newEnd].current.classList.remove("node-wall");
    grid[end].isEnd = false;

    // Add the new end node
    setEnd(newEnd);
    grid[end].isEnd = true;
    grid[end].isWall = false;
    setGrid(grid);

    setChangingEnd(false);
  };

  const toggleWall = (id) => {
    nodeRefs.current[id].current.classList.toggle("node-wall");
    grid[id].isWall = !grid[id].isWall;
    setGrid(grid);
  };

  // DIJKSTRA - Eventually change to use multiple algorithms
  const animateDijkstra = () => {
    const visitedNodesInOrder = dijkstra(grid, grid[start], grid[end], cols);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(grid[end]);
    setAnimationRunning(true);

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

              if (i === nodesInShortestPathOrder.length - 1) {
                setAnimationRunning(false);
              }
            }, 50 * i);
          }
        }
      }, 10 * i);
    }
  };

  return (
    <div className="App flex flex-col justify-center items-center p-4">
      <div className="flex items-baseline justify-between w-full max-w-5xl">
        <h1 className="text-2xl font-bold border-b border-red-400">
          <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" rel="noreferrer" target="_blank">
            Dijkstra's Algorithm
          </a>
        </h1>
        <Menu onStart={animateDijkstra} onReset={resetGrid} onResetPath={resetPath} />
      </div>
      <Grid
        grid={grid}
        nodeRefs={nodeRefs}
        start={start}
        end={end}
        width={width}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

export default App;
