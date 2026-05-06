import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/todos");
      setTodos(response.data.todos);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const updateTodoStatus = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, completed: true } : todo,
      ),
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Todo App</h1>

      <CreateTodo onAdd={addTodo} />

      {loading && <p>Loading todos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Todo todos={todos} onMarkCompleted={updateTodoStatus} />
    </div>
  );
}

function CreateTodo({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClickHandler = async () => {
    if (!formData.title || !formData.description) {
      setError("Please enter both title and description");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("http://localhost:3000/todo", {
        title: formData.title,
        description: formData.description,
      });

      onAdd(response.data.todo);

      // Reset form
      setFormData({
        title: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to create todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="title"
        placeholder="Enter Title"
        value={formData.title}
        onChange={handleChange}
      />
      <br />
      <br />

      <input
        type="text"
        name="description"
        placeholder="Enter Description"
        value={formData.description}
        onChange={handleChange}
      />
      <br />
      <br />

      <button onClick={onClickHandler} disabled={loading}>
        {loading ? "Adding..." : "Add Todo"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

function Todo({ todos, onMarkCompleted }) {
  const [loadingId, setLoadingId] = useState(null);

  const markAsCompleted = async (id) => {
    try {
      setLoadingId(id);

      await axios.put("http://localhost:3000/completed", { _id: id });

      onMarkCompleted(id);
    } catch (err) {
      console.error(err);
      alert("Failed to update todo");
    } finally {
      setLoadingId(null);
    }
  };

  if (!todos.length) {
    return <p>No todos found.</p>;
  }

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
              <button
                onClick={() => markAsCompleted(todo._id)}
                disabled={loadingId === todo._id}
              >
                {loadingId === todo._id ? "Updating..." : "Mark as Done"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
