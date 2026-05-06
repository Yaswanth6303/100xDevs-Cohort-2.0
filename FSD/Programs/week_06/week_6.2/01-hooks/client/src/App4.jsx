// Import React's useState hook for managing local component state
import { useState } from "react";
// Import axios for making HTTP requests to backend
import axios from "axios";
// Import useAsyncEffect (third-party hook) which allows async code directly in effects
// and prevents updating state when the component is unmounted
import useAsyncEffect from "use-async-effect";

// ------------------ Main Component ------------------
function App4() {
  return (
    <div>
      {/* Render the Todo component with initial id = 1 */}
      <Todo id={1} />
    </div>
  );
}

// ------------------ Child Component ------------------
function Todo({ id: initialId }) {
  // todo: stores the fetched todo object
  const [todo, setTodo] = useState({});
  // count: keeps track of how many times button was clicked
  const [count, setCount] = useState(0);
  // id: keeps track of the current todo id (starts from initialId = 1)
  const [id, setId] = useState(initialId);

  // useAsyncEffect runs whenever id or count changes
  // This fetches a new todo from backend each time
  useAsyncEffect(
    async (isMounted) => {
      // Call backend API with query parameter id
      const response = await axios.get("http://localhost:3000/todo?id=" + id);

      // If the component unmounted before response arrived, cancel the state update
      if (!isMounted()) return;

      // Otherwise, update todo state with fetched data
      setTodo(response.data.todo);
    },
    [id, count], // dependencies → re-run effect whenever id or count changes
  );

  // Handle button click: increments count + changes todo id randomly
  const handleClick = () => {
    // Increase count by 1
    setCount((c) => c + 1);

    // Pick a random id between 1 and 5, but ensure it's different from current id
    let newId = id;
    while (newId === id) {
      newId = Math.floor(Math.random() * 5) + 1;
    }

    // Update state with new id (this triggers re-fetch)
    setId(newId);
  };

  return (
    <div>
      {/* Display todo data */}
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>

      {/* Button shows current click count and current todo id.
        On click → increases count and sets a new random todo id */}
      <button onClick={handleClick}>
        Click me {count} (Current ID: {id})
      </button>
    </div>
  );
}

// Export App4 as default so it can be imported and rendered in index.jsx
export default App4;
