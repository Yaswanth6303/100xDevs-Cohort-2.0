// Importing useState hook from React
// useState is used to create state variables in functional components
import { useState } from "react";

function App() {
  // Declaring a state variable `count` and its updater function `setCount`
  // Initial value of count is set to 0
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Rendering the Count component and passing down the current value of `count` */}
      {/* Count is only responsible for displaying the number */}
      <Count count={count}></Count>

      {/*
        Now, we want to also render buttons that can increase or decrease the count.
        - These buttons internally need access to `setCount` so they can update the value of count.
        - But `Count` component does not need to know about setCount because it’s only showing the number.
        
        The problem you are describing:
        If you try to "push" (move) the buttons inside the Count component,
        then Count must also accept `setCount` as a prop even though it doesn’t logically use it for itself.
        That feels a bit ugly, because Count’s real purpose is just to DISPLAY the count.
        
        For now, you’re directly passing both `count` and `setCount` to Buttons,
        which is clean enough but separates display (Count) and actions (Buttons).
      */}
      <Buttons count={count} setCount={setCount}></Buttons>
    </div>
  );
}

// Count component: receives only the `count` prop and displays it
// It does not care about how count is updated
function Count({ count }) {
  return <div>{count}</div>;
}

// Buttons component: receives both `count` and `setCount`
// It is responsible for changing the state (increment/decrement)
// onClick handlers call `setCount` with new values
function Buttons({ count, setCount }) {
  return (
    <div>
      {/* Button to increase count */}
      <button
        onClick={() => {
          // Update count by adding 1
          setCount(count + 1);
        }}
      >
        Increase Count
      </button>

      {/* Button to decrease count */}
      <button
        onClick={() => {
          // Update count by subtracting 1
          setCount(count - 1);
        }}
      >
        Decrease Count
      </button>
    </div>
  );
}

export default App;
