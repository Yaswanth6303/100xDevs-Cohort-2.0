import prisma from '../config/database';

export class TodoRepository {
  async create(data: { title: string; description?: string; userId: number }) {
    return prisma.todo.create({
      data: { title: data.title, description: data.description || '', userId: data.userId },
    });
  }

  async findByUserId(userId: number) {
    return prisma.todo.findMany({ where: { userId } });
  }

  async findByIdAndUserId(id: number, userId: number) {
    return prisma.todo.findFirst({ where: { id, userId } });
  }

  async update(id: number, data: { title?: string; description?: string }) {
    return prisma.todo.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.todo.delete({ where: { id } });
  }
}
