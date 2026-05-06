import React, { useEffect, useState } from "react";
import axios from "axios";

// Without custom hook
const App3 = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((response) => {
      setTodos(response.data.todos);
    });
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
};

function Todo({ title, description }) {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
}

export default App3;
