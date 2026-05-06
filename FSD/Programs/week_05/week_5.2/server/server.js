import express from "express";
import cors from "cors";
import { z } from "zod";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/practice-todo")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const todoDBSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoDBSchema);

const createTodoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const updateTodoSchema = z.object({
  _id: z.string(),
  completed: z.boolean(),
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({});
    return res.json({ todos });
  } catch (err) {
    return res.status(500).json({ message: "Server Error" });
  }
});

app.post("/todo", async (req, res) => {
  const validation = createTodoSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid Input",
    });
  }

  const newTodo = new Todo(validation.data);
  await newTodo.save();

  return res.status(201).json({
    message: "Todo created successfully",
    todo: newTodo,
  });
});

app.put("/completed", async (req, res) => {
  const validation = updateTodoSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid Input",
    });
  }

  const updateTodo = await Todo.findByIdAndUpdate(
    validation.data._id,
    { completed: validation.data.completed },
    { new: true },
  );

  if (!updateTodo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  return res.json({
    message: "Updated Todo",
    todo: updateTodo,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
