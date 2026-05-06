// -----------------------------------------------------------
// Importing required React hooks
// -----------------------------------------------------------
import { memo, useCallback, useState } from "react";

// -----------------------------------------------------------
// App10 Component
// -----------------------------------------------------------
// This component demonstrates how `useCallback` prevents re-renders
// when functions are passed as props.
//
// PROBLEM IN App9:
// ----------------
// - When passing a function as a prop (<Demo a={a} />),
//   React sees a "new function reference" on every re-render,
//   even if the function body is the same.
// - As a result, React.memo does not prevent re-renders,
//   because props are seen as "changed".
//
// SOLUTION IN App10 (with useCallback):
// -------------------------------------
// - `useCallback` memoizes the function reference.
// - As long as the dependency array doesn’t change,
//   React will reuse the same function reference.
// - Now React.memo can correctly see that the prop "a"
//   hasn’t changed, so Demo won’t re-render unnecessarily.
function App10() {
  // ------------------------------
  // State Variable
  // ------------------------------
  // counter: increments when button is clicked
  const [counter, setCounter] = useState(0);

  // ------------------------------
  // useCallback: Memoized Function
  // ------------------------------
  // - The function logs "Namaste" when invoked.
  // - Wrapped with useCallback so its reference stays the same
  //   across renders (as long as dependency array [] does not change).
  // - This prevents child components from re-rendering unnecessarily.
  const a = useCallback(() => {
    console.log("Namaste");
  }, []); // Empty dependency array → function reference never changes

  // ------------------------------
  // JSX Render
  // ------------------------------
  return (
    <div>
      {/* Button to increment counter
        - Each click re-renders App10.
        - BUT, since "a" is memoized with useCallback,
        <Demo /> will not re-render on counter changes. */}
      <button onClick={() => setCounter((counter) => counter + 1)}>
        Counter ({counter})
      </button>

      <Demo a={counter} />
      <Demo a={counter} />

      <Demo a={1} />
      <Demo a={2} />
      <Demo a={3} />
      <Demo a={"Hello"} />

      {/* Passing the memoized function "a" as a prop.
        Thanks to useCallback + React.memo,
        Demo won’t re-render unless "a" actually changes. */}
      <Demo a={a} />
      <Demo a={a} />
    </div>
  );
}

// -----------------------------------------------------------
// Demo Component
// -----------------------------------------------------------
// - A child component that logs "Hello" when it re-renders.
// - Wrapped with React.memo, so it only re-renders when props change.
// - Since "a" (function prop) is now memoized with useCallback,
//   Demo won’t re-render on parent updates caused by counter changes.
const Demo = memo(function ({ a }) {
  console.log("Hello");
  return <div>Hello my name is Yaswanth {a.toString()}</div>;
  // Note: since "a" is a function, rendering {a} directly
  // would display "function a() {...}". Using toString() is optional,
  // usually you would CALL the function instead (a()).
});

export default App10;
