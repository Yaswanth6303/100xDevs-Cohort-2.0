// Importing required modules and libraries
import { useEffect, useState } from "react"; // React hooks for state management and side-effects
import "./App.css"; // Importing external CSS file for styling
import axios from "axios"; // Importing axios for making HTTP requests

// Main App component (Root component of the application)
function App() {
  // State variable "todos" will hold the list of todo items fetched from the backend
  // setTodos is the updater function to modify "todos"
  const [todos, setTodos] = useState([]);

  // useEffect is a React hook that allows us to perform side-effects in a component
  // Here, it will be used to fetch data from the backend API when the component mounts
  useEffect(() => {
    // Making a GET request to the backend (running on localhost:3000/todos)
    axios.get("http://localhost:3000/todos").then(function (response) {
      // The backend is expected to return an object with a "todos" field
      // Example response: { todos: [{id: 1, title: "Todo 1", description: "Desc 1"}, ...] }
      setTodos(response.data.todos); // Updating the state with the fetched todos
    });
    // Empty dependency array [] means this effect will run only once after initial render
  }, []);

  // Rendering part of the App
  return (
    <div>
      {/* Looping through each todo in the "todos" array using map function */}
      {todos.map((todo) => (
        // Passing each todo's title and description as props to the child component "Todo"
        // "key" is required by React when rendering lists to uniquely identify each element
        <Todo
          key={todo.id}
          title={todo.title}
          description={todo.description}
        ></Todo>
      ))}
    </div>
  );
}

// Functional component "Todo" that receives props (title and description)
// and displays them in a structured way
function Todo({ title, description }) {
  return (
    <div>
      {/* Displaying todo title in h1 tag */}
      <h1>{title}</h1>
      {/* Displaying todo description in p tag */}
      <p>{description}</p>
    </div>
  );
}

// Exporting the App component as default so that it can be used in index.js
export default App;
