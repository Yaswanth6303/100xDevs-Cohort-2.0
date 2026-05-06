import React, { useState, useRef } from "react";

// Assignment2 Component
// Goal: Track and display how many times a component has been re-rendered
// without using global variables or causing extra re-renders unnecessarily.

export function Assignment2() {
  // -------------------------------
  // 1) Normal state variable to demonstrate re-render
  // -------------------------------
  // "count" is only used here to force re-renders when the button is clicked.
  // Updating count will trigger React to re-render the component.
  const [count, setCount] = useState(0);

  // -------------------------------
  // 2) Possible (but flawed) solution
  // -------------------------------
  // We could use another state variable to track the number of re-renders,
  // like below. But this is NOT good because:
  // - Updating this state itself causes another re-render.
  // - That means we end up in a loop of re-renders just for counting.
  //
  // const [numberOfTimesReRendered, setNumberOfTimesRerendered] = useState(0);

  // -------------------------------
  // 3) Correct solution using useRef
  // -------------------------------
  // useRef creates a persistent object with a `.current` property
  // - It does NOT cause re-renders when updated
  // - It "remembers" its value between renders
  // Perfect for storing values like "number of times rendered"
  const numberOfTimesReRendered = useRef(0);

  // -------------------------------
  // Event handler: Force a re-render
  // -------------------------------
  // When button is clicked:
  // - We update "count"
  // - That triggers React to re-render the component
  // - During that re-render, we increment our ref counter
  const handleReRender = () => {
    setCount(count + 1); // update state → causes a re-render
    // ❌ DON’T do this:
    // setNumberOfTimesRerendered(numberOfTimesRerendered + 1);
    // Because using state here would cause extra re-renders.
  };

  // -------------------------------
  // Increment the ref counter
  // -------------------------------
  // Every time the component renders, this line executes.
  // Since "numberOfTimesReRendered" is a ref:
  // - Its value persists across renders
  // - Updating it will NOT trigger another render
  numberOfTimesReRendered.current = numberOfTimesReRendered.current + 1;

  // -------------------------------
  // JSX return
  // -------------------------------
  // We display how many times this component has rendered,
  // and a button to force re-render.
  return (
    <div>
      <p>
        This component has rendered {numberOfTimesReRendered.current} times.
      </p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  );
}
