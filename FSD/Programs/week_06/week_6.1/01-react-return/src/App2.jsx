{
  /* Method 2 */
}
{
  /* 
  React.memo lets you skip re-rendering a component 
  when its props do not change between renders.

  This is useful for performance optimization when you have 
  components that always receive the same props 
  but are children of a parent that re-renders.
*/
}

import React, { useState, memo } from "react"; // (Using destructuring import)

function App2() {
  // State variable `title`, initialized with a string
  const [title, setTitle] = useState("My name is Rahul");
  const [count, setCount] = useState(0);

  // Function that updates the title with a random number
  function updateTitle() {
    setTitle("My name is " + Math.random());
    setCount((count) => count + 1);
  }

  return (
    <div>
      {/*
        Note on <div> vs <> (Fragment):
        - If we use <> (React Fragment), the children are still part of the same parent. 
          When the parent re-renders, React will check all its children.
        - Even with memo, React will still *check* props, 
          but it will skip re-rendering for unchanged ones.
        - Using <div> or <> doesn’t change memo behavior here, 
          but <div> adds an extra node to the DOM while <> does not.
      */}
      {/* Button to update the state */}
      <button onClick={updateTitle}>Click me to change the title</button>
      {/*
        Here’s the key difference from Method 1:

        - The parent (App2) re-renders every time `title` changes.
        - The first Header must re-render, because its `title` prop changes.
        - The remaining Headers always receive the same static prop
          ("My name is Yaswanth"). 

        Because we wrapped Header in React.memo, React will:
          - Compare the previous and new props
          - If props are unchanged → skip re-render
          - If props are changed → re-render that component

        So in this case:
          - First Header re-renders on every state change.
          - All the other static Headers are skipped (do not re-render).
      */}
      <Header title={title}></Header> {/* First Header → re-renders */}
      <Header title={count}></Header> {/* Skipped */}
      <Header title="My name is Yaswanth"></Header> {/* Skipped (memoized) */}
      <Header title="My name is Yaswanth"></Header> {/* Skipped */}
      <Header title="My name is Yaswanth"></Header> {/* Skipped */}
      <Header title="My name is Yaswanth"></Header> {/* Skipped */}
    </div>
  );
}

/* 
  React.memo wraps a component and makes it "pure":
  - It only re-renders if its props have changed (shallow comparison).
  - Useful for preventing unnecessary re-renders in child components.

  NOTE:
  - Without React.memo → every Header re-renders when App2 re-renders.
  - With React.memo → only Headers with changed props re-render.
*/
const Header = memo(function Header({ title }) {
  return <div>{title}</div>;
});

export default App2;
