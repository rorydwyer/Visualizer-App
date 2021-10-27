const Grid = ({ grid, nodeRefs, start, end, width, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave }) => {
  return (
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
          onMouseLeave={() => handleMouseLeave(n.id)}
          onMouseUp={() => handleMouseUp()}
        ></div>
      ))}
    </div>
  );
};

export default Grid;
