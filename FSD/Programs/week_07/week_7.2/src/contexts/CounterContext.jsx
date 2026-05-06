import { createContext, useState } from "react";

/*
  CountContext provides both `count` and `setCount`
  to any component in the tree without prop drilling.
*/

// 1. Create context
const CounterContext = createContext();

// 2. Create provider component
export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
}

export default CounterContext;
