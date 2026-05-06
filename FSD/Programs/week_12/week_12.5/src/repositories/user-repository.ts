import prisma from '../config/database';

export class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: { email: string; password: string; firstName: string; lastName: string }) {
    return prisma.user.create({ data });
  }

  async update(id: number, data: Record<string, any>) {
    return prisma.user.update({ where: { id }, data });
  }
}
