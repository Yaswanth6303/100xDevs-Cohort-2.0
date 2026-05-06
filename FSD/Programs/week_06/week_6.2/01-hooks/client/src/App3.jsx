// Import React hooks and libraries
import { useState } from "react";
import axios from "axios";
// use-async-effect is a small library that works like useEffect,
// but allows async functions directly + safe cleanup handling.
import useAsyncEffect from "use-async-effect";

// ------------------ Main Component ------------------
function App3() {
  return (
    <div>
      {/* Render the Todo component with id=1.
        This simulates fetching a single todo item by its ID */}
      <Todo id={1} />
    </div>
  );
}

// ------------------ Child Component ------------------
function Todo({ id }) {
  // todo state holds the todo data fetched from backend
  const [todo, setTodo] = useState({});
  // count state is used just for re-fetching or re-rendering the todo
  const [count, setCount] = useState(0);

  // ✅ useAsyncEffect lets us run async code (like axios calls)
  // without having to manually define an inner async function.
  // It automatically provides "isMounted" for cleanup to avoid
  // updating state after the component has unmounted.
  useAsyncEffect(
    async (isMounted) => {
      // Fetch todo item from backend API using axios
      const response = await axios.get("http://localhost:3000/todo?id=" + id);

      // If component unmounted before response came back, cancel update
      if (!isMounted()) return;

      // Update local state with the fetched todo object
      setTodo(response.data.todo);

      // Effect runs whenever id or count changes
    },
    [id, count],
  );

  return (
    <div>
      {/* Display the fetched todo details */}
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>

      {/* Button increases count each time it’s clicked.
        Since count is in the dependency array of useAsyncEffect,
        clicking the button forces the todo to be re-fetched. */}
      <button onClick={() => setCount((c) => c + 1)}>Click me {count}</button>
    </div>
  );
}

// Export App3 as the default component
export default App3;
