import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App1 = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const respone = await axios.get("http://localhost:3000/todos");
    console.log(respone.data);
    setTodos(respone.data.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const respone = await axios.post(
      "http://localhost:3000/todos",
      {
        title: "New Todo",
        description: "New Todo Description",
        completed: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setTodos([...todos, respone.data.data]);
  };

  return (
    <>
      <div className="text-3xl font-bold underline flex justify-center items-center p-5">
        Axios
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
          onClick={addTodo}
          className="text-black p-2 rounded-md border-1"
        >
          Add Todo
        </button>
      </div>
    </>
  );
};

export default App1;
