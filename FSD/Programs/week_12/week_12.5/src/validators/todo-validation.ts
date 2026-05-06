import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const updateTodoSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});

export const deleteTodoSchema = z.object({
  id: z.number(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type DeleteTodoInput = z.infer<typeof deleteTodoSchema>;
