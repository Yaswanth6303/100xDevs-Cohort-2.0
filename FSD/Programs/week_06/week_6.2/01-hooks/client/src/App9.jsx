// -----------------------------------------------------------
// Importing required React hooks
// -----------------------------------------------------------
import { memo, useState } from "react";

// -----------------------------------------------------------
// App9 Component
// -----------------------------------------------------------
// This component demonstrates:
// 1. How React's `memo` can prevent unnecessary re-renders of child components.
// 2. Why passing functions as props causes re-renders (because of reference identity).
// 3. Why `useCallback` can be used to solve the "function reference problem".
function App9() {
  // ------------------------------
  // State Variable
  // ------------------------------
  // counter: increments when the button is clicked
  const [counter, setCounter] = useState(0);

  // ------------------------------
  // Function vs Primitive as Props
  // ------------------------------
  //
  // Case 1: Passing primitive values (numbers, strings)
  //   - Example: <Demo a={1} />
  //   - React compares old and new props.
  //   - If the value did not change, `memo` prevents re-render.
  //
  // Case 2: Passing functions
  //   - Example: <Demo a={a} />, where a is defined as a function.
  //   - Each re-render of App9 creates a **new function reference**,
  //     even if the function body is identical.
  //   - React sees the new function reference as a "different value"
  //     → it re-renders the child.
  //
  // SOLUTION:
  // - To fix this, we can use `useCallback` (not shown here).
  // - `useCallback` memoizes the function reference so it doesn’t change
  //   on every render.
  function a() {
    console.log("Hi there");
  }

  // ------------------------------
  // JSX Render
  // ------------------------------
  return (
    <div>
      {/* Button to increment counter.
        - Each click re-renders App9.
        - Child <Demo /> re-renders depend on whether their props changed. */}
      <button onClick={() => setCounter((counter) => counter + 1)}>
        Counter ({counter})
      </button>

      {/* Passing counter as a prop:
        - Since counter changes on every button click,
        these Demo components WILL re-render. */}
      <Demo a={counter} />
      <Demo a={counter} />

      {/* Passing fixed numbers and strings as props:
        - Since values do not change, these Demo components
        WILL NOT re-render on button clicks (because of React.memo). */}
      <Demo a={1} />
      <Demo a={2} />
      <Demo a={3} />
      <Demo a={"Hello"} />

      {/* Passing function as a prop:
        - React will re-render the Demo component everytime the button is clicked
        - This is because the function is a new reference every time the button is clicked
        - This is not a good practice because it will cause the component to re-render everytime the button is clicked
        - To fix this, we can use the useCallback hook to memoize the function
        - useCallback hook will return the same function reference everytime the button is clicked
        - This is a good practice because it will prevent the component from re-rendering everytime the button is clicked
        */}
      <Demo a={a} />
      <Demo a={a} />
    </div>
  );
}

// -----------------------------------------------------------
// Demo Component
// -----------------------------------------------------------
// - A simple child component that logs "Hello" to the console
//   whenever it re-renders.
// - Wrapped with React.memo:
//     -> Memo tells React to re-render Demo only if props change.
//     -> Prevents unnecessary re-renders when parent updates
//        but props stay the same.
//
// Example Behavior:
// -----------------
// - <Demo a={1} /> logs "Hello" only the first time.
// - <Demo a={counter} /> logs "Hello" on every counter change.
// - <Demo a={a} /> (if passing function a) would log "Hello"
//   on every counter change because the function reference changes.
const Demo = memo(function ({ a }) {
  console.log("Hello");
  return <div>Hello my name is Yaswanth {a}</div>;
});

// -----------------------------------------------------------
// Export
// -----------------------------------------------------------
export default App9;
