import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [globalId, setGlobalId] = useState(1);

  // Add new todo
  const addTodo = () => {
    if (!title || !description) {
      alert("Add both Title & Description");
      return;
    }

    const newTodo = {
      id: globalId,
      title: title,
      description: description,
    };

    setTodos([...todos, newTodo]);
    setGlobalId(globalId + 1);

    // Clear inputs
    setTitle("");
    setDescription("");
  };

  // Remove todo
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Update todo
  const updateTodo = (id, newTitle, newDesc) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, title: newTitle, description: newDesc }
          : todo
      )
    );
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      {/* Inputs */}
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2"
      />
      <br /> <br />
      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mr-2"
      />
      <br /> <br />
      <button
        onClick={addTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Todo
      </button>

      {/* Todo list */}
      <div className="mt-6">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="border p-4 mb-2 rounded flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold">{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() =>
                  updateTodo(
                    todo.id,
                    prompt("New Title", todo.title),
                    prompt("New Description", todo.description)
                  )
                }
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => removeTodo(todo.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
