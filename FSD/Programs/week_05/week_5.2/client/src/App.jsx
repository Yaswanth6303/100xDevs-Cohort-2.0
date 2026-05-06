import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos");
      setTodos(response.data.todos);
    } catch (err) {
      console.error(err);
    }
  };

  // Add a new todo to state
  const addTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  // Update a todo's completed status in state
  const updateTodoStatus = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === id ? { ...todo, completed: true } : todo,
      ),
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <CreateTodo onAdd={addTodo} />
      <Todo todos={todos} onMarkCompleted={updateTodoStatus} />
    </div>
  );
}

function CreateTodo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onClickHandler = async () => {
    if (!title || !description) {
      alert("Please enter a title and description");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/todo", {
        title,
        description,
      });

      // Add new todo to parent state
      onAdd(response.data.todo);

      // Clear input fields
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <br />
      <button onClick={onClickHandler}>Add Todo</button>
    </div>
  );
}

function Todo({ todos, onMarkCompleted }) {
  const markAsCompleted = async (id) => {
    try {
      // Send request to backend
      await axios.put("http://localhost:3000/completed", { _id: id });

      // Update local state
      onMarkCompleted(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <div>
            <strong>{todo.title}</strong>
          </div>
          <div>{todo.description}</div>
          <div style={{ marginTop: "10px" }}>
            {todo.completed ? (
              <span style={{ color: "green" }}>Todo is completed</span>
            ) : (
              <button onClick={() => markAsCompleted(todo._id)}>
                Mark as Done
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

// App1.jsx is the improved version of App.jsx