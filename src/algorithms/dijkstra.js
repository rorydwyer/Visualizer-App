// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode, width) {
  startNode.distance = 0;
  const visitedNodesInOrder = [];
  const unvisitedNodes = grid; //

  // While there are still nodes to visit.
  // NOTE, MAYBE REMOVE DOUBLE EXCLAMATION POINT
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift(); // remove from the beginning of the array.
    if (closestNode.isWall) continue; // If node is a wall, skip it.

    // If the closest node is at a distance of infinity, we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid, width); //
  }

  return visitedNodesInOrder;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid, width) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, width); //

  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1; // ADD ++ MAYBE
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid, width) {
  const neighbors = [];
  //   const { col, row } = node;
  //   if (row > 0) neighbors.push(grid[row - 1][col]); //top
  //   if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); //bottom
  //   if (col > 0) neighbors.push(grid[row][col - 1]); //left
  //   if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  const IS_LEFT_EDGE = node.id % width === 0;
  const IS_RIGHT_EDGE = node.id % width === width - 1;

  // top
  if (node.id > width) neighbors.push(grid[node.id - width]);
  // right
  if (node.id < grid.length && !IS_RIGHT_EDGE) neighbors.push(grid[node.id + 1]);
  // Bottom
  // CHECK IF NEED -1
  if (node.id < grid.length - width - 1) neighbors.push(grid[node.id + width]);
  // Left
  if (node.id > 0 && !IS_LEFT_EDGE) neighbors.push(grid[node.id - 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// function getAllNodes(grid) {
//   const nodes = [];
//   for (const row of grid) {
//     for (const node of row) {
//       nodes.push(node);
//     }
//   }
//   return nodes;
// }

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

//
//
//
// Check neighboring squares once square is clicked
function checkNeighbors(grid, node, width, setGrid) {
  const IS_LEFT_EDGE = node.id % width === 0;
  const IS_RIGHT_EDGE = node.id % width === width - 1;

  setTimeout(() => {
    // top
    if (node.id > width && !grid[node.id - width].visited) {
      const newId = grid[node.id - width].id;
      const neighbor = grid[newId];
      //   updateUnvisitedNeighbor(grid, neighbor, width, setGrid);
    }

    // right
    if (node.id < grid.length && !IS_RIGHT_EDGE && !grid[node.id + 1].visited) {
      const newId = grid[node.id + 1].id;
      const neighbor = grid[newId];
      //   updateUnvisitedNeighbor(grid, neighbor, width, setGrid);
    }

    // bottom
    if (node.id < grid.length - width - 1 && !grid[node.id + width].visited) {
      const newId = grid[node.id + width].id;
      const neighbor = grid[newId];
      //   updateUnvisitedNeighbor(grid, neighbor, width, setGrid);
    }

    // left
    if (node.id > 0 && !IS_LEFT_EDGE && !grid[node.id - 1].visited) {
      const newId = grid[node.id - 1].id;
      const neighbor = grid[newId];
      //   updateUnvisitedNeighbor(grid, neighbor, width, setGrid);
    }
  }, 10);
}

// function updateUnvisitedNeighbor(grid, node, width, setGrid) {
//   // Apply styles
//   node.visited = true;
//   grid[node.id] = node;

//   // Recursion
//   getUnvisitedNeighbors(grid, node, width, setGrid);
// }
