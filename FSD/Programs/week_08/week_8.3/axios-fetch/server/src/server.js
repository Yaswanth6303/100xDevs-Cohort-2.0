import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const todos = [
  { id: 1, title: "Todo 1", description: "This is Todo 1", completed: false },
  { id: 2, title: "Todo 2", description: "This is Todo 2", completed: false },
  { id: 3, title: "Todo 3", description: "This is Todo 3", completed: false },
  { id: 4, title: "Todo 4", description: "This is Todo 4", completed: false },
  { id: 5, title: "Todo 5", description: "This is Todo 5", completed: false },
];

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Todo API",
  });
});

app.get("/todos", (req, res) => {
  const response = [];

  for (let i = 0; i < todos.length; i++) {
    if (Math.random() > 0.5) {
      response.push(todos[i]);
    }
  }

  res.status(200).json({
    success: true,
    data: response,
  });
});

app.post("/todos", (req, res) => {
  const { title, description, completed } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    description,
    completed,
  };
  todos.push(newTodo);
  res.status(201).json({
    success: true,
    data: newTodo,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
