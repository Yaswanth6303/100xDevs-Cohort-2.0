import express from 'express';
import {
    createTodo,
    getAllTodos,
    markTodoCompleted,
    deleteTodo,
    editTodo,
} from '../controllers/todoController.js';
import {
    createTodoSchema,
    editTodoSchema,
    markCompletedSchema,
    deleteTodoSchema,
} from '../types/todoTypes.js';
import validateRequest from '../middleware/validation.js';

const router = express.Router();

// Create a new todo
router.post('/', validateRequest(createTodoSchema), createTodo);

// Get all todos
router.get('/', getAllTodos);

// Edit todo
router.put('/edit', validateRequest(editTodoSchema), editTodo);

// Mark todo as completed
router.put('/completed', validateRequest(markCompletedSchema), markTodoCompleted);

// Delete todo
router.delete('/', validateRequest(deleteTodoSchema), deleteTodo);

export default router;
