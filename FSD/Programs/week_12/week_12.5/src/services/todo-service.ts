import { TodoRepository } from '../repositories/todo-repository';
import type {
  CreateTodoInput,
  UpdateTodoInput,
  DeleteTodoInput,
} from '../validators/todo-validation';

const todoRepo = new TodoRepository();

export class TodoService {
  async createTodo(data: CreateTodoInput, userId: number) {
    const todo = await todoRepo.create({
      title: data.title,
      description: data.description,
      userId: userId,
    });
    return todo;
  }

  async getTodos(userId: number) {
    return todoRepo.findByUserId(userId);
  }

  async updateTodo(data: UpdateTodoInput, userId: number) {
    const existing = await todoRepo.findByIdAndUserId(data.id, userId);
    if (!existing) return null;

    const todo = await todoRepo.update(data.id, {
      title: data.title,
      description: data.description,
    });
    return todo;
  }

  async deleteTodo(data: DeleteTodoInput, userId: number) {
    const existing = await todoRepo.findByIdAndUserId(data.id, userId);
    if (!existing) return null;

    await todoRepo.delete(data.id);
    return { message: 'Todo deleted successfully' };
  }
}
