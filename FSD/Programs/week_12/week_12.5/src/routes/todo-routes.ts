import { Router } from 'express';
import { TodoController } from '../controllers/todo-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const todoRouter = Router();
const todoController = new TodoController();

todoRouter.post('/', authMiddleware, todoController.createTodo);
todoRouter.get('/', authMiddleware, todoController.getTodos);
todoRouter.put('/', authMiddleware, todoController.updateTodo);
todoRouter.delete('/', authMiddleware, todoController.deleteTodo);

export default todoRouter;
