import type { Request, Response, NextFunction } from 'express';
import {
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
} from '../validators/todo-validation';
import { TodoService } from '../services/todo-service';

const todoService = new TodoService();

export class TodoController {
  async createTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = createTodoSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: 'Invalid request body',
          errors: parsed.error.errors,
        });
      }

      const result = await todoService.createTodo(parsed.data, req.user!.id);
      return res.status(201).json({
        message: 'Todo created successfully',
        todo: result,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await todoService.getTodos(req.user!.id);
      return res.status(200).json({
        message: 'Todos fetched successfully',
        todos: todos,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateTodoSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: 'Invalid request body',
          errors: parsed.error.errors,
        });
      }

      const result = await todoService.updateTodo(parsed.data, req.user!.id);
      if (!result) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      return res.status(200).json({
        message: 'Todo updated successfully',
        todo: result,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = deleteTodoSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: 'Invalid request body',
          errors: parsed.error.errors,
        });
      }

      const result = await todoService.deleteTodo(parsed.data, req.user!.id);
      if (!result) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      return res.status(200).json({
        result: result,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
