import React from "react";
import { useState, useEffect } from "react";

// Using Fetch API
const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    fetch("http://localhost:3000/todos").then((res) => {
      res.json().then((data) => {
        setTodos(data.data);
      });
    });
  };

  const fetchTodosAsync = async () => {
    const respone = await fetch("http://localhost:3000/todos");
    const data = await respone.json();
    setTodos(data.data);
  };

  useEffect(() => {
    fetchTodosAsync();
  }, []);

  const addTodo = () => {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: "New Todo",
        description: "New Todo Description",
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        setTodos([...todos, data.data]);
      });
    });
  };

  const addTodoAsync = async () => {
    const respone = await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: "New Todo",
        description: "New Todo Description",
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await respone.json();
    setTodos([...todos, data.data]);
  };

  return (
    <>
      <div className="text-3xl font-bold underline flex justify-center items-center p-5">
        Fetch API
      </div>
      <div className="flex flex-col gap-4 p-8">
        {todos.map((todo) => (
          <div key={todo.id}>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <div>{todo.completed ? "Completed" : "Not Completed"}</div>
          </div>
        ))}
      </div>
      <div className="pl-8">
        <button
          onClick={addTodoAsync}
          className="text-black p-2 rounded-md border-1"
        >
          Add Todo
        </button>
      </div>
    </>
  );
};

export default App;
