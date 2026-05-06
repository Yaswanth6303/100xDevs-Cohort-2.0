import { createContext, useState } from "react";

/*
  CountContext provides both `count` and `setCount`
  to any component in the tree without prop drilling.
*/

// 1. Create context
const CountContext = createContext();

// 2. Create provider component
export function CountProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

export default CountContext;
