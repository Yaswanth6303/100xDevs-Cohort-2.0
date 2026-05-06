// Importing required modules
import { useEffect, useState } from "react"; // React hooks for state management and side effects
import "./App.css"; // Importing CSS file for styling
import axios from "axios"; // Importing axios for making HTTP requests to backend

// Main component (App1) that manages which Todo to display
function App5() {
  // State variable 'selectedId' holds the ID of the currently selected todo
  // Initially, it is set to 1 (so Todo with id=1 is shown by default)
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div>
      {/* Each button, when clicked, updates the 'selectedId' state.
        React re-renders the component whenever 'selectedId' changes. */}
      <button
        onClick={function () {
          setSelectedId(1); // When clicked, show todo with id=1
        }}
      >
        1
      </button>
      <button
        onClick={function () {
          setSelectedId(2); // When clicked, show todo with id=2
        }}
      >
        2
      </button>
      <button
        onClick={function () {
          setSelectedId(3); // When clicked, show todo with id=3
        }}
      >
        3
      </button>
      <button
        onClick={function () {
          setSelectedId(4); // When clicked, show todo with id=4
        }}
      >
        4
      </button>

      {/* Passing the currently selectedId as a prop to the Todo component.
        This ensures the Todo component knows which todo item to fetch. */}
      {<Todo id={selectedId}></Todo>}
    </div>
  );
}

// Child component (Todo) responsible for fetching and displaying a todo by ID
function Todo({ id }) {
  // State variable 'todo' will hold the todo data (title, description, etc.)
  // Initially set to an empty array (or object), updated when data is fetched
  const [todo, setTodo] = useState([]);

  // useEffect hook runs side effects (like API calls).
  // It runs whenever the dependency array changes (in this case: when 'id' changes).
  useEffect(() => {
    // Make GET request to backend using axios.
    // The backend endpoint expects an 'id' query parameter.
    axios.get("http://localhost:3000/todo?id=" + id).then(function (response) {
      // Update the 'todo' state with the response from backend
      setTodo(response.data.todo);
    });
  }, [id]);
  /* 
    Explanation of dependency array:
    - If we keep [id] as a dependency, the effect will run every time 'id' changes.
      This means whenever a button is clicked and a new ID is set, 
      the request will be made to fetch the corresponding todo.
    - If we leave the dependency array empty ([]), the effect will run only once 
      (when the component is first mounted). 
      That means it will always show only the first fetched todo, 
      even if we click on different buttons (because API request won't be called again).
    */

  // Render the todo data (title and description) fetched from the backend
  return (
    <div>
      {/* Display todo title and description.
        React will re-render this whenever 'todo' state changes. */}
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
    </div>
  );
}

export default App5;
