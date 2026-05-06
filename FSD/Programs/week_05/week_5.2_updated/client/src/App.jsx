// App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Header from "./components/Header";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/todos";

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      const result = response.data;
      if (result.success) {
        setTodos(result.data);
        setError(null);
      } else {
        setError("Failed to fetch todos");
      }
    } catch (err) {
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Header />
        {/* Pass setTodos so TodoForm can update the list */}
        <TodoForm setTodos={setTodos} />
        {/* Pass todos + setTodos + loading/error */}
        <TodoList
          todos={todos}
          setTodos={setTodos}
          loading={loading}
          error={error}
          fetchTodos={fetchTodos}
        />
      </div>
    </div>
  );
}

export default App;
