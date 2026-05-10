// Import the useState hook from React
// useState allows us to create a state variable inside a functional component
import { useState } from "react";
import "./App.css";

/*
  NOTE (Very important for understanding the "ugly" part):
  In this version (App1.jsx):
  - We pass both `count` and `setCount` down into the Count component.
  - But Count itself doesn’t really need `setCount` (it just displays `count`).
  - We are only passing `setCount` through Count so that the Buttons (nested inside Count)
    can receive it.

  This makes the Count component handle props that don’t belong to it.

  To make it cleaner, you probably use Context API
  or another method so that Buttons can directly access `setCount` without
  unnecessarily going through Count.
*/

function App1() {
  // Create a state variable `count` with initial value 0
  // `setCount` is the updater function that allows us to change the value of `count`
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Passing BOTH `count` and `setCount` to Count */}
      {/* Even though Count doesn’t use setCount, we must pass it so that
          Buttons inside Count can use it */}
      <Count count={count} setCount={setCount}></Count>
    </div>
  );
}

// Count component
// - It receives count (for display)
// - It also receives setCount (which it does not directly use)
// - But it forwards both props down to the Buttons component
function Count({ count, setCount }) {
  return (
    <div>
      {/* Display the current count */}
      {count}

      {/* Render Buttons inside Count, and pass down both props */}
      <Buttons count={count} setCount={setCount}></Buttons>
    </div>
  );
}

// Buttons component
// - This is the only component that actually needs both `count` and `setCount`
// - It contains two buttons: one for incrementing and one for decrementing
function Buttons({ count, setCount }) {
  return (
    <div>
      {/* Increase button: calls setCount with count + 1 */}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase Count
      </button>

      {/* Decrease button: calls setCount with count - 1 */}
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrease Count
      </button>
    </div>
  );
}

// Export App1 as the default export
// This makes App1 the main component for this file
export default App1;
