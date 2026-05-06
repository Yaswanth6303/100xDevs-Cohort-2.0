import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([
    { title: "Todo 1", description: "Description 1", completed: false },
    { title: "Todo 2", description: "Description 2", completed: true },
    { title: "Todo 3", description: "Description 3", completed: false },
  ]);

  const handleOnClick = () => {
    setTodos([
      ...todos,
      { title: "Todo 4", description: "Description 4", completed: false },
    ]);
  };

  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.title}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
        />
      ))}

      <button onClick={handleOnClick}>Add Todo</button>
    </div>
  );
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

function Todo({ title, description, completed }: Todo) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{completed ? "Completed" : "Not Completed"}</p>
    </div>
  );
}

export default App;
