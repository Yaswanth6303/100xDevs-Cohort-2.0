// -----------------------------------------------------------
// Importing required React hooks
// -----------------------------------------------------------
import { useState } from "react";

// -----------------------------------------------------------
// App6 Component
// -----------------------------------------------------------
// This component demonstrates how re-renders happen in React
// and why expensive calculations (like summing numbers from 1 to n)
// should be optimized using React's useMemo hook.
//
// PROBLEM STATEMENT:
// ------------------
// - Every time the user types in the input OR clicks the button,
//   the entire component re-renders.
// - On each re-render, the "sum from 1 to n" is recalculated
//   from scratch, even if 'inputValue' hasn't changed.
// - This creates unnecessary computations.
//
// KEY IDEAS:
// -----------
// 1. React re-renders a component whenever its state changes.
//    Here, both `counter` and `inputValue` are states.
// 2. Without memoization, the sum calculation runs on *every* re-render.
// 3. With `useMemo` (not implemented here but mentioned in comments),
//    we can cache the result of the expensive calculation and
//    recompute it only when 'inputValue' changes.
function App6() {
  // ------------------------------
  // State Variables
  // ------------------------------

  // 'counter' state:
  // - Tracks the number of times the button has been clicked.
  // - Updating this causes a re-render of the whole component.
  const [counter, setCounter] = useState(0);

  // 'inputValue' state:
  // - Tracks the number entered by the user in the input box.
  // - Used to calculate the sum from 1 to 'inputValue'.
  const [inputValue, setInputValue] = useState(1);

  // ------------------------------
  // Calculation (Unoptimized)
  // ------------------------------
  // Here we are calculating the sum of numbers from 1 to 'inputValue'.
  // ISSUE:
  // - This calculation runs on *every re-render* of the component,
  //   even if 'inputValue' did not change (e.g., when counter changes).
  // - For large 'inputValue', this can become very inefficient.
  //
  // Example:
  // If inputValue = 5
  // count = 1 + 2 + 3 + 4 + 5 = 15
  let count = 0;
  for (let i = 1; i <= inputValue; i++) {
    count += i;
  }

  // ------------------------------
  // JSX Render
  // ------------------------------
  // The UI includes:
  // 1. An input box to type a number (inputValue).
  // 2. A paragraph displaying the sum (count).
  // 3. A button to increment 'counter'.
  //
  // NOTE:
  // - Typing in the input updates 'inputValue', which triggers
  //   a re-render and re-computation of sum.
  // - Clicking the button increments 'counter' and also causes
  //   a re-render, which unnecessarily re-computes the sum again.
  return (
    <div>
      <br />

      {/* Input field for entering the number 'n'.
        On change, update inputValue state.
        Example: if user enters 10, inputValue becomes 10. */}
      <input
        type="text"
        placeholder={"Find the Sum from 1 to n"}
        onChange={(event) => {
          // Update inputValue state with the new input
          // event.target.value is a string → here we keep it directly,
          // but ideally should convert to number using parseInt.
          setInputValue(Number(event.target.value));
        }}
      />
      <br />

      {/* Displaying the calculated sum */}
      <p>Sum is {count}</p>

      {/* Button to increase the counter */}
      <button
        onClick={function () {
          // Increment counter by 1
          setCounter((c) => c + 1);
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
// Exporting App6 as default so it can be imported and used in other files.
export default App6;
