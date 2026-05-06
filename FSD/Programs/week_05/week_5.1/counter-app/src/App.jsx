// jsx is a file it is the combination of both js and xml.

// Importing useState hook from React
// useState allows us to create "state variables" inside functional components
import { useState } from "react";
import "./App.css";

// Wrong way (just for explanation):
// If we try to define state like a normal JS object, React won't "react" to changes:
// let state = { count: 0 }
// Changing state.count = state.count + 1 will NOT update the UI
// Because React does not track normal JS variables.
// Correct way: Use useState() hook, React will take care of updating + re-rendering UI.

function App() {
  // useState(0) → initializes a state variable "count" with value 0
  // count → current value of state
  // setCount → function to update state
  // React automatically re-renders the component whenever setCount is called
  const [count, setCount] = useState(0);

  // Function to increment count
  // - Whenever button is clicked, setCount(count + 1) runs
  // - React updates "count"
  // - Component App() is re-run, showing new count in UI
  function onClickHandler() {
    setCount(count + 1);
  }

  return (
    <div>
      {/* 
        onClick={onClickHandler} → runs myFunction when button is clicked
        Counter {count} → We use curly braces {} to embed JS variables/expressions inside JSX
        Example: {count}, {2+3}, {myFunction()}, etc.
    */}
      <button onClick={onClickHandler}>Counter {count}</button>
    </div>
  );
}

export default App;

// Extra Notes:
// - React components return JSX (HTML-like syntax).
// - To embed any JavaScript (variables, functions, expressions) inside JSX, use curly braces {}.
// - Example: <h1>{count * 2}</h1> → dynamically shows double the count.
// - setCount does not just change a variable, it "tells React to re-render" with updated state.
