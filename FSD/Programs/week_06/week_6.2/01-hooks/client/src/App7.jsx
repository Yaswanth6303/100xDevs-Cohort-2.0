// -----------------------------------------------------------
// Importing required React hooks
// -----------------------------------------------------------
import { useEffect, useState } from "react";

// -----------------------------------------------------------
// App7 Component
// -----------------------------------------------------------
// This component improves on App6 by separating the calculation logic
// into a useEffect hook instead of recalculating sum directly in render.
//
// ISSUE STILL PRESENT:
// --------------------
// - When inputValue changes:
//     1. First re-render happens due to setInputValue.
//     2. Then useEffect runs and calls setFinalValue → causes another re-render.
//     => So, TWO re-renders happen for each input change.
// - When counter changes:
//     → Component re-renders, but sum is NOT recalculated (because useEffect
//       depends only on inputValue).
//
// KEY IDEA:
// ---------
// - By using useEffect, we avoid recalculating the sum when "counter" changes.
// - But we still get 2 re-renders for input updates.
// - With useMemo (instead of useEffect + setFinalValue), we could compute the
//   sum directly during render and memoize it so it updates *only* when inputValue changes.
//   That would result in a single re-render per input change.
function App7() {
  // ------------------------------
  // State Variables
  // ------------------------------

  // counter: tracks button clicks
  const [counter, setCounter] = useState(0);

  // inputValue: tracks user input (n)
  const [inputValue, setInputValue] = useState(1);

  // finalValue: stores the calculated sum from 1 to n
  // updated inside useEffect whenever inputValue changes
  const [finalValue, setFinalValue] = useState(1);

  // ------------------------------
  // Side Effect: Calculate Sum
  // ------------------------------
  // This effect runs whenever inputValue changes.
  //
  // 1. Calculate sum from 1 to inputValue
  // 2. Store result in finalValue
  //
  // IMPORTANT:
  // - On input change:
  //     -> First re-render happens (inputValue updates)
  //     -> Then useEffect runs and sets finalValue
  //     -> That triggers another re-render
  //     => Total = 2 renders for one input change
  //
  // - On counter change:
  //     -> No recalculation (because dependency is only [inputValue])
  useEffect(() => {
    let count = 0;
    for (let i = 1; i <= inputValue; i++) {
      count += i;
    }
    setFinalValue(count);
  }, [inputValue]);

  // ------------------------------
  // JSX Render
  // ------------------------------
  return (
    <div>
      <br />

      {/* Input field:
        - Lets user type a number n.
        - Updates inputValue state on change. */}
      <input
        type="number"
        placeholder={"Find the Sum from 1 to n"}
        onChange={function (event) {
          // Update inputValue when user types
          setInputValue(Number(event.target.value));
        }}
      />
      <br />

      {/* Display the sum stored in finalValue */}
      <p>Sum is {finalValue}</p>

      {/* Button to increase counter */}
      <button
        onClick={function () {
          setCounter(counter + 1);
        }}
      >
        Counter ({counter})
      </button>
    </div>
  );
}

// -----------------------------------------------------------
// Export
// -----------------------------------------------------------
// Exporting App7 as default so it can be used in other files
export default App7;
