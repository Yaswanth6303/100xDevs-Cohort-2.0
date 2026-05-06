import { useEffect, useState } from "react";
import axios from "axios";

function App5() {
  const { todos, loading } = useTodos();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </>
  );
}

function useTodos() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:3000/todos").then((res) => {
        setTodos(res.data.todos);
        setLoading(false);
      });
    }, 2000);
  }, []);

  return {
    todos: todos,
    loading: loading,
  };
}

function Todo({ title, description }) {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
}

export default App5;

// There is a library called SWR. When fetching data from the backend, it may take a few seconds, during which a
// blank page would normally be shown. To avoid this, we use SWR, which allows us to add a loading state so that users
// see a loading indicator instead of a blank page. You can see this implemented in App9.jsx. Here we have done writing
// simple text while fetching the data from backend.
