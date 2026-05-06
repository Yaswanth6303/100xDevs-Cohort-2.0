import { useState, useEffect } from "react";
import axios from "axios";

// Root component which simply renders one Todo component with id=1
function App2() {
  return (
    <div>
      {/* Passing id=1 to the Todo component */}
      <Todo id={1} />
    </div>
  );
}

// Todo component is responsible for fetching and displaying a single todo
function Todo({ id }) {
  // State to store the fetched todo object (initially empty array, but ideally could be null or {}).
  const [todo, setTodo] = useState([]);

  // State to keep track of how many times the button was clicked.
  // This is only for demonstrating re-renders and re-fetching data.
  const [count, setCount] = useState(0);

  // Function that fetches todo data from backend using axios
  async function fetchData() {
    // Make GET request to backend with query parameter "id"
    // Example: http://localhost:3000/todo?id=1
    const response = await axios.get("http://localhost:3000/todo?id=" + id);

    // Save the fetched todo data into state
    setTodo(response.data.todo);
  }

  /**
   * ⚠️ Important Concept:
   *
   * - This useEffect runs whenever either `id` or `count` changes.
   * - When `count` changes, component re-renders, and fetchData() is called again.
   * - Suppose the first fetch takes a long time, and before it finishes, `count` changes again.
   *      → Then a new fetchData() call is made (second request).
   *      → If the second request resolves faster, it updates the state first.
   *      → Later when the first (slow) request resolves, it overwrites the state with outdated data.
   *
   * This creates a **race condition** where older requests can "come late"
   * and override newer results. This is a very common bug in asynchronous React code.
   *
   * One solution is to cancel the previous request or use an "isMounted / abort" check.
   * Another solution is using a custom hook like `useAsyncEffect` to ensure cleanup.
   */
  useEffect(() => {
    fetchData();
  }, [id, count]); // Effect runs when id OR count changes

  return (
    <div>
      {/* Display fetched todo details */}
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>

      {/* Button increases count.
        Each click triggers a re-render and refetch (because useEffect depends on count). */}
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        Click me {count}
      </button>
    </div>
  );
}

export default App2;
