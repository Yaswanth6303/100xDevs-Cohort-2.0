import { useState } from "react";

/*
  App2 component:
  ----------------
  - This component fetches todos from the backend server (http://localhost:3000/todos).
  - It stores the todos in React state using the useState hook.
  - It then maps through the todos and renders them using the <Todo /> component.
*/
function App2() {
  // State to hold todos. Initially, it's an empty array.
  const [todos, setTodos] = useState([]);

  /*
  Important Note:
    ---------------
  - If we directly call fetch() inside the component body (without useEffect), 
      - it will cause an infinite loop of re-renders:
      - fetch() will run on every render,
      - setTodos() will update the state,
      - updating state triggers another render,
      - fetch() runs again... and so on.

  - To solve this, we use useEffect(): Visit in App3.jsx
      - useEffect() allows us to run side effects (like fetching data) only when we want.
      - By passing an empty dependency array `[]`, the fetch() call runs only once when the component mounts.
  */

  fetch("http://localhost:3000/todos").then(async function (res) {
    // Convert response into JSON format
    const json = await res.json();

    // Update state with todos received from backend
    setTodos(json.todos);
  });

  return (
    <div>
      {/*
        Rendering todos:
        ----------------
        - We map over the todos array and render a <Todo /> component for each item.
        - Always provide a unique `key` prop when rendering lists in React 
          so React can efficiently update and re-render only changed items.
        - In this case, we assume that `todo.id` exists in each todo object and is unique.
      */}
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
}

/*
  Todo component:
  ---------------
  - This is a simple presentation component.
  - It receives `title` and `description` as props and displays them.
*/
function Todo({ title, description }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default App2;

/*
  Additional Note on React.StrictMode:
  ------------------------------------
  - In development mode, React wraps components inside <React.StrictMode>.
  - StrictMode intentionally renders components twice (only in development, not in production):
      → First render: to check for potential side effects.
      → Second render: the actual render.
  - This is why, in development, it might look like fetch() is running twice 
    or that the component is re-rendering more than expected.

  - To prevent this during development, you can remove <React.StrictMode> in main.jsx.
  - But remember: in production build, StrictMode is automatically removed by React, 
    so you won't face the double render issue there.
*/
