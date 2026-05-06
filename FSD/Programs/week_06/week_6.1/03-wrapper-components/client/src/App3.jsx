import { useEffect, useState } from "react";
import axios from "axios";

function App3() {
  // State to store the list of todos
  const [todos, setTodos] = useState([]);

  /*
    useEffect in React:
    -------------------
    - useEffect is a lifecycle hook that lets you run side effects 
      (like data fetching, timers, subscriptions) in functional components.
    - By default, useEffect runs after the component first renders.

    In this case, we want to fetch todos from the API when the component mounts.
  */
  useEffect(() => {
    // setInterval → repeatedly runs every 5 seconds
    const intervalId = setInterval(() => {
      // Fetch data from server
      axios.get("http://localhost:3000/todos").then(async function (res) {
        setTodos(res.data.todos); // update state with new todos
      });
    }, 5000);

    // Cleanup: optional, but good practice
    // clearInterval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  /*
    Dependency Array []:
    --------------------
    - [] → run only once (when the component first mounts).
    - no array → run on every render.
    - [todos] → run whenever `todos` changes.

    Here, we want the fetch to start only once on mount, 
    so we pass an empty array [].
  */

  return (
    <div>
      {/*
        Rendering todos:
        ----------------
        - Using map() to loop over the todos array.
        - Each <Todo> must have a unique `key` (React requires it to 
          efficiently update/reconcile lists).
        - Here, we use `todo.id` as the key.
      */}
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
}

// Child component that displays a single todo
function Todo({ title, description }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default App3;

/*
  ⚠️ React StrictMode Note:
  -------------------------
  - In development, React.StrictMode (in main.jsx) 
    intentionally runs certain functions twice 
    (like useEffect) to detect side-effects or bugs.
  - This can make it look like your component re-renders twice.
  - This only happens in development mode.
  - In production build, StrictMode is automatically removed, 
    so it won’t double-invoke effects.
*/
