import React, { useState, useEffect } from "react";

const App1 = () => {
  const mousePointer = useMousePointer();
  return (
    <div className="p-4">
      <div className="text-2xl font-bold">
        Cursor Position
      </div>
      <div>
        {mousePointer.x} {mousePointer.y}
      </div>
    </div>
  );
};

function useMousePointer() {
  const [mousePointer, setMousePointer] = useState({ x: 0, y: 0 });
  useEffect(() => {
    window.addEventListener("mousemove", (e) =>
      setMousePointer({ x: e.clientX, y: e.clientY })
    );
    return () => {
      window.removeEventListener("mousemove", (e) =>
        setMousePointer({ x: e.clientX, y: e.clientY })
      );
    };
  }, []);

  return mousePointer;
}

export default App1;
