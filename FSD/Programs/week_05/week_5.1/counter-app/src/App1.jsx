import { useState } from "react";
import "./App.css";

// Wrong way (example):
// If we define a normal variable or object like below,
// React will NOT track its changes automatically
/*let state = {
  count : 0
}*/

// Correct way: useState() creates a special "state variable"
// React will automatically track and re-render the UI when it changes

function App1() {
  // Parent Component

  // Create state in parent
  // count → current value of the state
  // setCount → function to update the state
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Passing state and state-updater function to the child component as props */}
      <Button count={count} setCount={setCount}></Button>

      {/* Another child, commented for now. If enabled, it would run every time parent re-renders */}
      {/* <DummyButton></DummyButton> */}
    </div>
  );
}

function CustomButton(props) {
  // Child Component
  // Event handler for button click
  // When called, it updates the parent’s state using setCount
  function onClickHandler() {
    props.setCount(props.count + 1);
  }

  // Rendering a button that shows current count
  // Curly braces {} are used to embed JS expressions inside JSX
  return <button onClick={onClickHandler}>Counter {props.count}</button>;
}

// Cleaner version using destructuring (instead of props.something everywhere)
function Button({ count, setCount }) {
  // Child Component
  function onClickHandler() {
    setCount(count + 1);
  }

  return <button onClick={onClickHandler}>Counter {count}</button>;
}

// DummyButton: another child component
// Note: If parent re-renders, this component also re-renders
// (even if it doesn’t use props)
function DummyButton() {
  console.log("Dummy Button");
  console.log("Hello");
  // No JSX returned → nothing displayed on screen
}

export default App1;

// Key Notes:
// 1. State (useState):
//    - Declared in parent with useState
//    - Only way to update is by calling setCount (never modify directly).
//
// 2. Props:
//    - Mechanism to pass data/functions from parent → child
//    - Here, parent gives "count" and "setCount" to CustomButton.
//
// 3. Child Updating Parent State:
//    - Child cannot directly modify parent’s state
//    - But child can call parent’s setter function (setCount), which updates the state in parent.
//
// 4. Re-rendering:
//    - Whenever setCount is called, App1 re-renders
//    - Since CustomButton is inside App1, it also re-renders with updated props.
//
// 5. Curly Braces in JSX:
//    - Use {} to embed JS expressions in JSX
//    - Example: {count}, {2+3}, {props.count}, etc.
//
// 6. Reusability:
//    - With this approach, you can reuse <CustomButton /> multiple times
//    - Each button can share or even have its own count depending on how you design the state.
