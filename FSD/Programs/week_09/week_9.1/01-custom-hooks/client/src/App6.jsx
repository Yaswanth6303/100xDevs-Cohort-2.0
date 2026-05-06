// Fetch todo data for every 5 seconds

import React, { useEffect, useState } from "react";
import axios from "axios";

const App6 = () => {
  const { todos, loading } = useTodos(3);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
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
    const oldInterval = setInterval(() => {
      fetchData();
    }, interval * 1000);

    return () => {
      clearInterval(oldInterval);
    };
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

export default App6;
