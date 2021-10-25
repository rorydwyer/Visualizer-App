// function dijktra(grid, width, start, end) {}

// Check neighboring squares once square is clicked
export function getUnvisitedNeighbors(grid, node, width, setGrid) {
  const IS_LEFT_EDGE = node.id % width === 0;
  const IS_RIGHT_EDGE = node.id % width === width - 1;

  setTimeout(() => {
    // top
    if (node.id > width && !grid[node.id - width].visited) {
      const newId = grid[node.id - width].id;
      const neighbor = grid[newId];
      updateUnvisitedNeighbor(grid, neighbor, width, setGrid);
    }

    // right
    if (node.id < grid.length && !IS_RIGHT_EDGE && !grid[node.id + 1].visited) {
      const newId = grid[node.id + 1].id;
      const neighbor = grid[newId];
      updateUnvisitedNeighbor(grid, neighbor, width, setGrid);
    }

    // bottom
    if (node.id < grid.length - width - 1 && !grid[node.id + width].visited) {
      const newId = grid[node.id + width].id;
      const neighbor = grid[newId];
      updateUnvisitedNeighbor(grid, neighbor, width, setGrid);
    }

    // left
    if (node.id > 0 && !IS_LEFT_EDGE && !grid[node.id - 1].visited) {
      const newId = grid[node.id - 1].id;
      const neighbor = grid[newId];
      updateUnvisitedNeighbor(grid, neighbor, width, setGrid);
    }
  }, 10);
}

function updateUnvisitedNeighbor(grid, node, width, setGrid) {
  // Apply styles
  node.visited = true;
  grid[node.id] = node;
  setGrid([...grid]);

  // Recursion
  getUnvisitedNeighbors(grid, node, width, setGrid);
}
