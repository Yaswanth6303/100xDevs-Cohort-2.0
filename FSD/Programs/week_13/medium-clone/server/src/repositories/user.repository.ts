import type { PrismaClientType } from '../config/database';
import type { SignupInput } from '../validators/user.validator';

export class UserRepository {
  constructor(private prisma: PrismaClientType) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: SignupInput) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }
}
