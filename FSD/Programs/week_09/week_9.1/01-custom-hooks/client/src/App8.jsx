import React, { useEffect, useState } from "react";
import axios from "axios";

const App8 = () => {
  const [interval, setIntervalValue] = useState(3); // actual interval in seconds
  const [inputValue, setInputValue] = useState(3); // controlled input value

  const { todos, loading } = useTodos(interval);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="p-4 flex flex-row gap-4">
        {/* Input for interval */}
        <input
          className="border-2 border-gray-300 rounded-md p-1"
          type="number"
          value={inputValue}
          min="1"
          placeholder="Enter interval in seconds"
          onChange={(e) => setInputValue(Number(e.target.value))}
        />
        <div>
          <button
            className="bg-blue-500 text-white rounded-md p-2"
            onClick={() => setIntervalValue(inputValue)}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Render Todos */}
      <div className="p-4">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
            description={todo.description}
          />
        ))}
      </div>
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

export default App8;
