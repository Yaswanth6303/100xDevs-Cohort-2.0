import { useEffect, useState } from "react";
import axios from "axios";

// ---------------------
// Custom Hook
// ---------------------
function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(function (response) {
        setTodos(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching todos:", error);
      });
  }, []);

  return todos;
}

// ---------------------
// Main App Component
// ---------------------
function App() {
  const todos = useTodos();

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <div id={todo.id}>
            <h1>{todo.title}</h1>
            <p>{todo.completed ? `Completed` : `Not Completed`}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
