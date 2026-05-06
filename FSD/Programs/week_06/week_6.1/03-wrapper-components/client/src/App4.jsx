import { useEffect, useState } from "react";

/*
  App4 component:
  ----------------
  - Fetches todos from an API (`http://localhost:3000/todos`).
  - Uses `useEffect` to fetch data initially and then re-fetch it every 2 seconds.
  - Stores todos in React state and displays them using the <Todo /> component.
*/
function App4() {
  // State to hold todos (initially empty array)
  const [todos, setTodos] = useState([]);

  /*
    useEffect:
    ----------
    - This runs only once when the component mounts (because of [] dependency array).
    - Inside useEffect:
      1. We define an async function `fetchTodos` that:
        - Fetches todos from the API,
        - Converts the response to JSON,
        - Updates state using setTodos.
      2. We call fetchTodos() immediately for the first fetch.
      3. We set up an interval to call fetchTodos every 2 seconds.
      4. We clean up the interval when the component unmounts.
  */
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("http://localhost:3000/todos");
      const json = await res.json();
      setTodos(json.todos);
    };

    fetchTodos(); // Initial fetch when component mounts

    // Re-fetch todos every 2 seconds
    const intervalId = setInterval(fetchTodos, 2000);

    // Cleanup function:
    // This runs ONLY when the component unmounts
    // (because dependency array is empty [])
    // It prevents memory leaks and background API calls
    // Even though this effect runs only once (because dependency array is []),
    // we MUST clear the interval when the component unmounts.
    // Example: If this page is one of two pages and we navigate away,
    // React unmounts this component. Without clearInterval,
    // the interval would continue running in the background,
    // causing unnecessary API calls and potential memory leaks.
    return () => clearInterval(intervalId); // Empty dependency array → effect runs only once on mount
  }, []);
  // [] dependency array means:
  // → Run this effect only once when the component mounts.
  // If we leave out the array, the effect will run on EVERY render (bad for fetch).
  // If we include `todos` as dependency, it will run every time todos state changes,
  // which could again cause continuous fetching (depending on logic).

  return (
    <div>
      {/*
        Rendering todos:
        ----------------
        - Here we are mapping todos and using the INDEX as the React key.
        - This is NOT a good practice if the list order can change, because:
          Example:
          ----------
          Original:
          index 0 → todo1 (play)
          index 1 → todo2 (jump)
          index 2 → todo3 (eat)

        If we reorder and move todo3 to the top:
          - index 0 → todo3 (eat)
          - index 1 → todo1 (play)
          - index 2 → todo2 (jump)

        React will think:
        - "The item at index 0 changed from play → eat"
          instead of realizing that todo3 moved positions.
        
        This happens because React uses the `key` to decide which component
        is which between renders. If we use index, React may incorrectly
        re-use DOM nodes, causing UI bugs.

        - Correct approach:
        - Use a unique identifier like `todo.id` (see App3 example).
        - That way, React always knows exactly which todo changed.
        */}
      {todos.map(({ title, description }, index) => (
        <Todo key={index} title={title} description={description} />
      ))}
    </div>
  );
}

/*
  Todo component:
  ---------------
  - A simple UI component to display the title and description of a todo.
*/
function Todo({ title, description }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default App4;
