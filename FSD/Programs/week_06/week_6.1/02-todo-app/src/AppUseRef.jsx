import { useState } from "react";
import { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// We keep `counter` outside of the App component.
// Why?
// If we kept it inside, every re-render of the App would reset counter back to 4.
// By keeping it outside, counter persists across re-renders.
let counter = 4;

function AppUseRef() {
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

  /*
    useRef is used for uncontrolled components.
    --------------------------------------------
    Instead of storing input values in state,
    we directly access DOM input values using refs.

    - It does NOT cause re-renders.
    - It directly references the DOM element.
  */
  const titleRef = useRef();
  const descriptionRef = useRef();

  // Function to add new todos into the state.
  function addTodo(e) {
    e.preventDefault(); // prevents page reload (important when using form)

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    // Prevent adding empty todos
    if (!title || !description) return;

    setTodos([
      ...todos, // spread existing todos
      {
        id: counter++, // using incrementing counter to ensure unique ids
        title: title,
        description: description,
      },
    ]);

    // Clear input fields manually
    titleRef.current.value = "";
    descriptionRef.current.value = "";
  }

  /*
    Why do we need an `id`?
    ---------------------------------
    React uses something called "Reconciliation" to figure out
    the difference between the old Virtual DOM and the new Virtual DOM.

    - If items have unique IDs (used as `key` in React),
      React can efficiently identify which item was added, removed, or changed.
    - Without unique IDs, React falls back to using array index,
      which can lead to bugs in some cases.

    So, IDs make React updates efficient and predictable.
  */

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo List</h1>

      {/* Using form allows Enter key submission */}
      <form onSubmit={addTodo} className="card p-4 shadow-sm mb-4">
        <div className="mb-3">
          <label for="title" className="form-label">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter Title"
            ref={titleRef}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label for="description" className="form-label">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Enter Description"
            ref={descriptionRef}
            className="form-control"
          />
        </div>

        {/* Button to add a new todo */}
        <button type="submit" className="btn btn-primary">
          Add a Todo
        </button>
      </form>

      {/* Rendering list of todos */}
      <div>
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
      <p className="mb-0">{description}</p>
    </div>
  );
}

export default AppUseRef;
