import React, { useState, useEffect } from "react";

const App2 = () => {
  const dimensions = useDimensions();
  return (
    <div className="p-4">
      <div className="text-2xl font-bold">Window Dimensions</div>
      <div>
        {dimensions.width} {dimensions.height}
      </div>
    </div>
  );
};

function useDimensions() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, [dimensions]);

  return dimensions;
}

export default App2;
