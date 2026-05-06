{
  /* Method 1 
  Place the state in the lowest common ancestor of the components that actually need it, so that 
  unrelated components will not be re-rendered when the state changes.
  */
}

import { useState } from "react";

function App1() {
  return (
    <div>
      {/* 
        Instead of keeping the state in the parent (App),
        we moved the state into a separate child component (HeaderWithButton).

        This way:
        - Only HeaderWithButton and its children re-render when the state changes.
        - The other Header (static one) does NOT re-render unnecessarily.

        This is an optimization technique:
        > Keep state as "close as possible" to where it is needed.
        */}
      <HeaderWithButton></HeaderWithButton>

      {/* This Header always shows the same static text. 
        Since it doesn’t depend on state anymore, 
        it does not re-render when HeaderWithButton’s state updates. */}
      <Header title="My name is Yaswanth"></Header>
    </div>
  );
}

// Component that contains both the button and a Header that changes
function HeaderWithButton() {
  // Local state specific to this component
  // Only this component re-renders when state changes
  const [title, setTitle] = useState("My name is Rahul");

  // Function to update the state with a new random title
  function updateTitle() {
    setTitle("My name is " + Math.random());
  }

  return (
    <div>
      {/* Button triggers state change */}
      <button onClick={updateTitle}>Click me to change the title</button>

      {/* This Header depends on state, so it re-renders whenever `title` changes */}
      <Header title={title}></Header>
    </div>
  );
}

// Header component: receives props and displays them
function Header({ title }) {
  return <div>{title}</div>;
}

export default App1;
