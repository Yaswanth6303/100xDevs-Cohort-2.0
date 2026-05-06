import { useContext, useState } from "react";
import { CountContext } from "./contexts/CountContext";

/**
 * Key Points to Understand Before Reading Code:
 *
 * 1. **Prop Drilling Problem**:
 *    - Normally, if you want to pass a variable like `count` from a parent component
 *      down to deeply nested children, you have to pass it via props through
 *      every intermediate component.
 *    - This makes the syntax "ugly" and the code harder to maintain.
 *    - This issue is called *prop drilling*.
 *
 * 2. **Why Context API?**:
 *    - React’s Context API helps us avoid prop drilling.
 *    - We can create a "global" context and make variables accessible directly
 *      where needed, without passing props manually through every level.
 *
 * 3. **Re-render Problem with Context**:
 *    - When a context value changes, *all components consuming that context*
 *      re-render automatically.
 *    - But here’s the issue: even if a component does NOT use the context value,
 *      if it is wrapped inside the Provider, it still re-renders when the context changes.
 *    - This is why we see unnecessary re-renders in this code.
 *
 * 4. **Solution Beyond Context**:
 *    - To fix unnecessary re-renders, we need state management libraries like **Recoil, Zustand, or Jotai**,
 *      which allow *fine-grained re-render control*.
 */

// -------------------- APP COMPONENT --------------------
function App() {
  // Local state: count value and updater function
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* 
        Wrapping child components inside CountContext.Provider
        - Makes `count` available to any child via useContext
        - Avoids passing count explicitly as a prop
      */}
      <CountContext.Provider value={count}>
        <Count setCount={setCount}></Count>
      </CountContext.Provider>
    </div>
  );
}

// -------------------- COUNT COMPONENT --------------------
function Count({ setCount }) {
  /**
   * Problem:
   * - This component does not use `count` from context.
   * - However, it still re-renders every time `count` changes.
   * - That’s because `count` is inside the `CountContext.Provider`.
   *
   * Expected Behavior:
   * - Only the components that actually consume `count` (via useContext) should re-render.
   * - But React Context does not work this way out of the box.
   */

  console.log("Count component re-rendered");

  return (
    <div>
      {/* CountRenderer consumes context */}
      <CountRenderer></CountRenderer>

      {/* Buttons do not consume context for rendering UI,
          but they still re-render unnecessarily */}
      <Buttons setCount={setCount}></Buttons>
    </div>
  );
}

// -------------------- COUNTRENDERER COMPONENT --------------------
function CountRenderer() {
  // Consuming count value directly from context
  const count = useContext(CountContext);

  return (
    <div>
      {/* Displays the current value of count */}
      <b>{count}</b>
    </div>
  );
}

// -------------------- BUTTONS COMPONENT --------------------
function Buttons({ setCount }) {
  /**
   * Observation:
   * - Even though Buttons only uses `setCount` (which comes as a prop),
   *   it is still re-rendered because the context value changes.
   * - This happens because Buttons also calls `useContext`.
   * - Any change in context value triggers a re-render for all context consumers.
   */

  const count = useContext(CountContext);
  console.log("Buttons component re-rendered");

  return (
    <div>
      {/* Increase count by 1 */}
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Increase
      </button>

      {/* Decrease count by 1 */}
      <button
        onClick={() => {
          setCount((count) => count - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

// -------------------- EXPORT --------------------
export default App;

/**
 * Summary:
 * - We use Context API here to avoid prop drilling.
 * - Problem: Context forces all consuming components to re-render
 *   whenever the value changes (even if they don’t use it).
 * - This leads to performance issues in bigger apps.
 * - Better solution: State management libraries like Recoil/Zustand
 *   allow components to re-render only when the specific piece of state
 *   they use is updated.
 */
