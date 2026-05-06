// Importing React's useState hook
// useState allows us to create and manage "state variables" inside functional components
import { useState } from "react";

function App() {
  // State: todos (array of todo objects) and setTodos (function to update todos)
  // Initially, todos contains 2 todo objects with title, description, and completed status
  const [todos, setTodos] = useState([
    {
      title: "Go to gym",
      description: "Go to gym from 7 to 9",
      completed: false,
    },
    {
      title: "Study DSA",
      description: "Study DSA from 9 to 10",
      completed: true,
    },
  ]);

  /*
     Dumb Way (wrong thinking): 
     - Some beginners think since todos is JSON, they need to convert it to string before displaying.
     - OR they try to directly dump it as {todos} in JSX.
     - But React cannot render objects directly, it needs elements or strings/numbers.
     - The correct way is to "map" over the array and return JSX elements for each todo.
    */

  // addTodo adds a new todo item using the "spread operator" (...)
  // - Spread operator copies all elements from the existing todos array
  // - Then we add a new object at the end
  // - Finally, we call setTodos to update the state, which triggers a re-render
  function addTodos() {
    setTodos([
      ...todos, // spread existing todos into a new array
      {
        title: "Go to Sleep",
        description: "Go to Sleep from 11 to 12",
        completed: false,
      },
    ]);
  }

  // addTodosBrute does the same thing but in a "manual way"
  // - Create a new empty array
  // - Loop through existing todos and push them into newTodos
  // - Add the new todo object
  // - Update state with setTodos
  // This is equivalent to using the spread operator, just longer
  // function addTodosBrute() {
  //     let newTodos = [];
  //     for (let i = 0; i < todos.length; i++) {
  //         newTodos.push(todos[i]);
  //     }
  //     newTodos.push({
  //         title: 'Go to Sleep',
  //         description: 'Go to Sleep from 9 to 10',
  //         completed: false,
  //     });
  //
  //     setTodos(newTodos);
  // }

  return (
    <div>
      {/* Button that calls myFunction when clicked 
                -> This will add a new todo item */}
      <button onClick={addTodos}>Add a Todo</button>

      {/* Hardcoded Todo example (static props) */}
      <Todo
        title="Eat Biriyani"
        description="Go to Hyderabad and Eat Hyderabadi Biriyani"
        completed={true}
      ></Todo>

      {/*
        Dynamic rendering of todos:
        - Use map() to loop through the todos array
        - For each todo object, return a <Todo /> component
        - Pass title and description as props
        - This ensures UI is in sync with state
        */}
      {todos.map(function (todo) {
        return <Todo title={todo.title} description={todo.description}></Todo>;
      })}

      {/*
        Passing the entire todos array as props to another component
        DarkNewTodo will render todos in a dark theme (black background)
        */}
      <DarkNewTodo todos={todos}></DarkNewTodo>
    </div>
  );
}

// Todo component (child component)
// Receives props (title, description) from parent and displays them
function Todo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <p>{props.completed ? "Task is Completed" : "Need to Complete"}</p>
    </div>
  );
}

// DarkNewTodo component
// Takes the todos array as props
// Loops through todos and displays them in a "dark mode" style
function DarkNewTodo(props) {
  return (
    <div>
      {props.todos.map(function (todo) {
        return (
          <div style={{ backgroundColor: "black", color: "white" }}>
            {/* Re-using Todo component */}
            <Todo
              title={todo.title}
              description={todo.description}
              completed={todo.completed}
            ></Todo>
          </div>
        );
      })}
    </div>
  );
}

// Export App component as default
// This makes it available for use in index.js (entry point)
export default App;
