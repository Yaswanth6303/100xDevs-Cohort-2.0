// -----------------------------------------------------------
// Importing required React hooks
// -----------------------------------------------------------
import { useState, useMemo } from "react";

// -----------------------------------------------------------
// App8 Component
// -----------------------------------------------------------
// This component demonstrates how to use `useMemo` to optimize
// expensive calculations (like summing numbers from 1 to n).
//
// PROBLEM IN App7:
// ----------------
// - In App7, when inputValue changed:
//     1. First re-render happened because setInputValue updated state.
//     2. Then useEffect ran and setFinalValue → triggered another re-render.
//     => Total = 2 renders for one input change.
//
// SOLUTION WITH useMemo (App8):
// -----------------------------
// - Here, we directly calculate the sum inside useMemo.
// - useMemo caches ("memoizes") the result and only recalculates it
//   when inputValue changes.
// - This way, for each input change, we only get **1 render**.
// - Also, if *only counter changes*, the calculation does NOT run again.
//
// DEMO TIP:
// - If you uncomment the console.log inside useMemo, you’ll see
//   it only runs when inputValue changes, not when counter updates.
function App8() {
  // ------------------------------
  // State Variables
  // ------------------------------

  // counter: updated when button is clicked
  const [counter, setCounter] = useState(0);

  // inputValue: updated when user types in input
  const [inputValue, setInputValue] = useState(1);

  // ------------------------------
  // useMemo: Memoized Calculation
  // ------------------------------
  // - Calculates sum from 1 to inputValue.
  // - Will ONLY re-run when inputValue changes.
  // - Does NOT run again when counter changes (unlike plain calculation).
  //
  // Example:
  // If inputValue = 5
  // finalCount = 1 + 2 + 3 + 4 + 5 = 15
  let count = useMemo(() => {
    // Uncomment to observe memoization:
    // console.log("useMemo is called");

    let finalCount = 0;
    for (let i = 1; i <= inputValue; i++) {
      finalCount += i;
    }
    return finalCount;
  }, [inputValue]); // Dependency array: recalculate ONLY when inputValue changes

  // ------------------------------
  // JSX Render
  // ------------------------------
  return (
    <div>
      <br />

      {/* Input field:
        - Lets user type a number n.
        - Updates inputValue state on change.
        - Triggers recalculation ONLY once via useMemo. */}
      <input
        type="text"
        placeholder={"Find the Sum from 1 to n"}
        onChange={function (event) {
          setInputValue(Number(event.target.value));
        }}
      />
      <br />

      {/* Display the memoized sum */}
      <p>Sum is {count}</p>

      {/* Button to increase counter.
                - Triggers a re-render, but DOES NOT recalculate the sum. */}
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
// Exporting App8 as default so it can be imported in other files.
export default App8;

// Important Note:
// useMemo calculates and returns a value during rendering.
// The returned value can be used directly in JSX.
// It does NOT cause an extra re-render.

// useEffect runs after rendering.
// If you calculate something inside useEffect and store it in state,
// calling setState will trigger an additional re-render.
