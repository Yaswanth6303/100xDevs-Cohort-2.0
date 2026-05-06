// Import React hooks
import { useContext } from "react";
import CounterContext, { CounterProvider } from "./contexts/CounterContext";

/**
 * What This Code Demonstrates:
 *
 * 1. **Prop Drilling Problem**:
 *    - Instead of passing `count` and `setCount` as props through multiple components,
 *      we use Context API to provide them globally.
 *
 * 2. **Context API Improvement Over First Version**:
 *    - In the first version, `count` alone was passed in context,
 *      so both CountRenderer and Buttons depended on the same context value.
 *    - That caused both components to re-render whenever `count` changed.
 *
 *    - In this version, we store `{ count, setCount }` as the context value.
 *    - Components now **pick only what they need** from context:
 *         - CountRenderer → only uses `count`
 *         - Buttons → only uses `setCount`
 *    - So, changes in one (e.g., `count`) won’t force unnecessary re-renders in the other.
 *
 * 3. **Still a Limitation**:
 *    - Even though Buttons does not use `count`, technically React re-renders Buttons
 *      because the **whole context value object (`{count, setCount}`)** changes on each update.
 *    - A trick to reduce this: split context into two (`CountContext` for `count`
 *      and `SetCountContext` for `setCount`), so updates are truly isolated.
 *    - But for small apps, this version is clean and efficient enough.
 */

// -------------------- APP COMPONENT --------------------
function App1() {
  return (
    <div>
      <CounterProvider>
        <Count></Count>
      </CounterProvider>
    </div>
  );
}

// -------------------- COUNT COMPONENT --------------------
function Count() {
  // Logs whenever this component re-renders
  console.log("Count component re-render");

  return (
    <div>
      {/* Sub-component that consumes only `count` */}
      <CountRenderer></CountRenderer>

      {/* Sub-component that consumes only `setCount` */}
      <Buttons></Buttons>
    </div>
  );
}

// -------------------- COUNTRENDERER COMPONENT --------------------
function CountRenderer() {
  // Destructure only `count` from context
  const { count } = useContext(CounterContext);

  return (
    <div>
      {/* Render current count */}
      <b>{count}</b>
    </div>
  );
}

// -------------------- BUTTONS COMPONENT --------------------
function Buttons() {
  // Destructure only `setCount` from context
  const { setCount } = useContext(CounterContext);

  // Logs whenever this component re-renders
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
export default App1;
