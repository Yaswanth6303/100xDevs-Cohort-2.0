import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const todos = [
  { id: 1, title: "Todo 1", description: "This is todo 1", completed: false },
  { id: 2, title: "Todo 2", description: "This is todo 2", completed: false },
  { id: 3, title: "Todo 3", description: "This is todo 3", completed: false },
  { id: 4, title: "Todo 4", description: "This is todo 4", completed: false },
  { id: 5, title: "Todo 5", description: "This is todo 5", completed: false },
];

// GET /todos → return random subset of todos
app.get("/todos", (req, res) => {
  const randomTodos = todos.filter(() => Math.random() > 0.5);

  res.status(200).json({ todos: randomTodos });
});

// GET /todo?id=1 → return single todo
app.get("/todo", (req, res) => {
  const id = Number(req.query.id);

  if (!id) {
    return res.status(400).json({ error: "Invalid or missing id" });
  }

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json({ todo });
});

app.get("/random-todos", (req, res) => {
  const randomTodos = todos.filter(() => Math.random() > 0.5);
  res.status(200).json({ todos: randomTodos });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
