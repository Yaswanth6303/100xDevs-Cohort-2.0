// Import React and hooks
import { createContext, useContext, useState } from "react";

/*
  IMPROVISATION: Using Context API instead of prop drilling

  Problem with the old version:
  - We had to pass `count` and `setCount` through Count component
    even though Count itself did not use them directly.
  - This is called "prop drilling" (passing props through intermediate components).

  Solution with Context API:
  - Create a context that holds `count` and `setCount`.
  - Wrap the part of the component tree that needs access with a Provider.
  - Inside any child component (CountRenderer, Buttons), directly use the context.
*/

// 1. Create a context object (initially empty)
const CountContext = createContext();

function App1() {
  // 2. Create state variable `count` and updater `setCount`
  const [count, setCount] = useState(0);

  return (
    // 3. Wrap children with the Provider and pass down `count` and `setCount`
    <CountContext.Provider value={{ count, setCount }}>
      <div>
        {/* Notice: We no longer pass props here */}
        <Count />
      </div>
    </CountContext.Provider>
  );
}

// Count component
// - Acts as a container for rendering CountRenderer and Buttons
// - Does not need to accept or forward any props now
function Count() {
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

// CountRenderer component
// - Uses useContext to directly read `count` from CountContext
function CountRenderer() {
  // 4. Consume the context (extract count)
  const { count } = useContext(CountContext);
  return <div>{count}</div>;
}

// Buttons component
// - Uses useContext to directly read and update count
function Buttons() {
  // 5. Consume the context (extract count and setCount)
  const { count, setCount } = useContext(CountContext);

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

// Export App as the main component
export default App1;
