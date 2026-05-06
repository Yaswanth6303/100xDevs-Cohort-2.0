import { UserRepository } from '../repositories/user-repository';
import { hashPassword, comparePassword } from '../utils/bcrypt';
import { generateToken } from '../utils/jwt';
import type { RegisterInput, LoginInput, UpdateUserInput } from '../validators/user-validation';

const userRepo = new UserRepository();

export class UserService {
  async register(data: RegisterInput) {
    const existingUser = await userRepo.findByEmail(data.email);
    if (existingUser) return null;

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepo.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    const token = generateToken({ id: user.id, email: user.email });
    return { user: user, token: token };
  }

  async login(data: LoginInput) {
    const user = await userRepo.findByEmail(data.email);
    if (!user) return null;

    const isValid = await comparePassword(data.password, user.password);
    if (!isValid) return null;

    const token = generateToken({ id: user.id, email: user.email });
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      token: token,
    };
  }

  async updateUser(data: UpdateUserInput) {
    const existing = await userRepo.findById(data.id);
    if (!existing) return null;

    const updatedData: any = { ...data };
    if (data.password) {
      updatedData.password = await hashPassword(data.password);
    }

    const updatedUser = await userRepo.update(data.id, updatedData);

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    };
  }

  async profile(id: number) {
    const user = await userRepo.findById(id);
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    };
  }
}
