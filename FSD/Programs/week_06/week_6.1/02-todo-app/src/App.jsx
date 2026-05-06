import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// We keep `counter` outside of the App component.
// Why?
// If we kept it inside, every re-render of the App would reset counter back to 4.
// By keeping it outside, counter persists across re-renders.
let counter = 4;

function App() {
  // React state that holds the list of todos.
  // Initially, we have 3 todo objects.
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Play Games",
      description: "Play games with friends",
    },
    {
      id: 2,
      title: "Study",
      description: "Study for exams",
    },
    {
      id: 3,
      title: "Eat",
      description: "Eat food",
    },
  ]);

  // State for controlled form inputs.
  // These store what the user types.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /*
    Function to add new todos into the state.
    -----------------------------------------
    We use a <form> now instead of plain inputs + button.
    So we must prevent default behavior (page reload).
  */
  function addTodo(e) {
    e.preventDefault(); // prevents page refresh

    if (!title || !description) return;

    setTodos([
      ...todos, // spread existing todos
      {
        id: counter++, // using incrementing counter to ensure unique ids
        title: title,
        description: description,
      },
    ]);

    // Clear input fields after adding
    setTitle("");
    setDescription("");
  }

  /*
    Why do we use Bootstrap classes like `form-label` and `form-control`?
    ----------------------------------------------------------------------
    Bootstrap provides pre-built CSS classes to style forms properly.

    - `form-label` → styles labels
    - `form-control` → styles input fields
    - `btn btn-primary` → styles buttons
    - `container`, `card`, `shadow` → layout styling

    These save time and make UI consistent.
  */

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo List</h1>

      {/* Bootstrap Form */}
      <form onSubmit={addTodo} className="card p-4 shadow">
        <div className="mb-3">
          <label for="title" className="form-label">Title</label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="description" className="form-label">Description</label>
          <input
            id="description"
            type="text"
            className="form-control"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit button inside form */}
        <button type="submit" className="btn btn-primary">
          Add a Todo
        </button>
      </form>

      {/* Rendering list of todos */}
      <div className="mt-4">
        {todos.map((todo) => (
          <TodoComponent
            key={todo.id} // IMPORTANT: key must be unique for each list item
            title={todo.title}
            description={todo.description}
          />
        ))}
      </div>
    </div>
  );
}

/*
  ⚠️ React Warning:
  -----------------
  If you don’t provide a `key` when rendering lists, React will show:
  "Each child in a list should have a unique 'key' prop."
  
  - This does NOT break the app (only a warning), 
    but it’s important for React’s diffing algorithm.
  - Solution: Use a unique key (like `id`).
*/

function TodoComponent({ title, description }) {
  return (
    <div className="card p-3 mb-3 shadow-sm">
      <h5 className="text-danger">{title}</h5>
      <p>{description}</p>
    </div>
  );
}

export default App;
