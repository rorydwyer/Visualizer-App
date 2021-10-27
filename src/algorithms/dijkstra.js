// Dijkstra's algorithm
//
// returns nodes in the order they were visited and
// the total distance of the path from startNode to endNode

export function dijkstra(grid, startNode, finishNode, width) {
  startNode.distance = 0;
  const visitedNodesInOrder = [];
  const unvisitedNodes = [...grid];

  // While there are still nodes to visit.
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift(); // remove from the beginning of the array
    if (closestNode.isWall) continue; // If node is a wall, skip it

    // If the closest node is at a distance of infinity, we are trapped
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode.id === finishNode.id) return visitedNodesInOrder; // If we find the finish
    updateUnvisitedNeighbors(closestNode, grid, width);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid, width) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, width);

  for (const n of unvisitedNeighbors) {
    n.distance = node.distance + 1;
    n.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid, width) {
  const neighbors = [];
  const IS_LEFT_EDGE = node.id % width === 0;
  const IS_RIGHT_EDGE = node.id % width === width - 1;

  // top
  if (node.id > width) neighbors.push(grid[node.id - width]);
  // right
  if (node.id < grid.length && !IS_RIGHT_EDGE) neighbors.push(grid[node.id + 1]);
  // Bottom
  if (node.id < grid.length - width) neighbors.push(grid[node.id + width]);
  // Left
  if (node.id > 0 && !IS_LEFT_EDGE) neighbors.push(grid[node.id - 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// Backtracks from the finishNode to find the shortest path
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
