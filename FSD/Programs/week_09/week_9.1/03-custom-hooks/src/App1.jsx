import React, { useState } from "react";
import useDebounce from "./hooks/useDebounce";

const App1 = () => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  return (
    <div className="p-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search"
        className="border-2 border-gray-300 rounded-md p-1"
      />
      <div className="text-lg font-bold">
        Debounced value is:{" "}
        <span className="text-lg font-normal">{debouncedValue}</span>
      </div>
    </div>
  );
};

export default App1;
