import React, { useEffect, useState } from "react";
import axios from "axios";

const App7 = () => {
  const [interval, setIntervalValue] = useState(3); // actual interval in seconds

  const { todos, loading } = useTodos(interval);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Input for interval (directly updates interval) */}
      <input
        type="number"
        value={interval}
        min="1"
        placeholder="Enter interval in seconds"
        onChange={(e) => setIntervalValue(Number(e.target.value))}
      />

      {/* Render Todos */}
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
};

function useTodos(interval) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios.get("http://localhost:3000/todos").then((response) => {
      setTodos(response.data.todos);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => {
      fetchData();
    }, interval * 1000);

    // If I don’t use clearInterval, the previous interval will not be cleared and will continue running, fetching data
    // from the backend. When the dependency changes, a new interval will also start, resulting in multiple intervals
    // running simultaneously and causing many unnecessary requests to the backend.
    return () => clearInterval(timer);
  }, [interval]);

  return { todos, loading };
}

function Todo({ title, description }) {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
}

export default App7;
