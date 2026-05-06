// -----------------------------------------------------------
// Importing required libraries
// -----------------------------------------------------------
import { useEffect, useState } from "react"; // React hooks for state management and lifecycle methods
import axios from "axios"; // Axios library for making HTTP requests

// -----------------------------------------------------------
// App1 Component (Parent Component)
// -----------------------------------------------------------
// - This is the main/root component of this file.
// - It renders the <Todo /> component and passes "id={1}" as a prop.
// - Essentially, App1 is just a wrapper here that delegates work to <Todo />.
function App1() {
  return (
    <div>
      {/* Passing a hardcoded 'id' (value = 1) as a prop to the Todo component */}
      <Todo id={1}></Todo>
    </div>
  );
}

// -----------------------------------------------------------
// Todo Component (Child Component)
// -----------------------------------------------------------
// - This component is responsible for fetching and displaying a single "todo" item.
// - It receives "id" as a prop from the parent component (App1).
// - It makes an API call using axios to fetch the todo data for that specific "id".
// - The fetched data is stored in the component's local state and then displayed.
function Todo({ id }) {
  // ------------------------------
  // Local State
  // ------------------------------
  // 'todo' holds the fetched todo object from the backend.
  // Initially set as an empty array [] (but since we expect an object, {} would be more appropriate).
  const [todo, setTodo] = useState([]);

  // ------------------------------
  // Side Effect: Fetch Data
  // ------------------------------
  // useEffect hook runs after the component is rendered.
  // Here, we are fetching the todo from the backend when the component mounts
  // OR whenever the "id" prop changes.
  //
  // Dependency Array: [id]
  // - This means whenever the "id" value changes, the effect re-runs and fetches new data.
  useEffect(() => {
    // Making a GET request to the backend server.
    // Endpoint: http://localhost:3000/todo?id=<id>
    // Example: if id = 1, it will call -> http://localhost:3000/todo?id=1
    axios
      .get("http://localhost:3000/todo?id=" + id)
      .then(function (response) {
        // On successful response, update local state 'todo'
        // response.data.todo should be an object like { title: "...", description: "..." }
        setTodo(response.data.todo);
      })
      .catch(function (error) {
        // In case of any error (like network issue / server issue), log it
        console.error("Error fetching todo:", error);
      });
  }, [id]); // dependency ensures re-fetch when 'id' changes

  // ------------------------------
  // JSX Render
  // ------------------------------
  // - Displaying the todo's title and description
  // - If the todo is not yet fetched, it may initially render as blank/undefined.
  return (
    <div>
      {/* Display todo title */}
      <h1>{todo.title}</h1>

      {/* Display todo description */}
      <p>{todo.description}</p>
    </div>
  );
}

// -----------------------------------------------------------
// Export
// -----------------------------------------------------------
// Exporting App1 as the default export so it can be imported and rendered in index.js
export default App1;
