import { CountProvider } from "./contexts/CountContext";
import { useCount } from "./hooks/useCount";

/*
  All components are kept here inside App.jsx for simplicity.
  They directly consume count and setCount from the context.
*/

function App2() {
  return (
    // Wrap everything inside CountProvider
    <CountProvider>
      <div>
        <Count />
      </div>
    </CountProvider>
  );
}

// Count component: container for renderer + buttons
function Count() {
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
}

// CountRenderer component: displays the count
function CountRenderer() {
  const { count } = useCount();
  return <div>{count}</div>;
}

// Buttons component: modifies the count
function Buttons() {
  const { count, setCount } = useCount();

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default App2;
